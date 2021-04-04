import './dragdropStyles.css';
import { IoAppsSharp, IoAddOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropSection, DragDropBoardButtons } from './';
import { DragDropNewItem } from './';
import { Spinner } from '../shared';
// custom hook
import { useDragDropSections } from '../../hooks';
// actions
import { fetchBoardsController, createSectionController } from '../../controllers';

export function DragDropContainer() {
	const dispatch = useDispatch();
	// select global states
	const { isLoading, error, boards, sections, currentBoard } = useSelector((state) => state.board);

	// map the sections
	const mappedSections = useDragDropSections(currentBoard && sections, currentBoard);

	const onSaveNewSection = (newSection) =>
		dispatch(createSectionController({ board: currentBoard.id, name: newSection }));

	useEffect(() => {
		dispatch(fetchBoardsController());
	}, [dispatch]);

	return (
		<div
			className='dragdrop-container'
			// TODO: ability to change background image by the user
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1614199238405-741b10b6e5af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
			}}>
			{isLoading && <Spinner />}
			{error && <h3>Error: {error}</h3>}
			<header>
				<div className='left'>
					<div className='board-menu padding-inline'>
						<IoAppsSharp className='lg' />
					</div>
					{boards && <DragDropBoardButtons boards={boards} currentBoard={currentBoard} />}
				</div>
				<div className='right'>
					<div className='board-menu'>
						<IoAddOutline className='xlg' />
					</div>
					<div className='board-menu padding-inline'>
						<IoNotificationsOutline className='lg' />
					</div>
				</div>
			</header>
			{isLoading && <div className='backdrop'></div>}
			{!isLoading && !error && mappedSections && (
				<div className='sections'>
					{sections.length > 0 &&
						mappedSections.map(({ section, handlers }) => (
							<DragDropSection key={section.id} section={section} handlers={handlers} />
						))}

					{sections.length > 0 && (
						<DragDropNewItem
							variant='input'
							placeHolder='Enter section title...'
							composerButtonLabel={`Add ${mappedSections.length > 0 ? 'another' : 'new'} section`}
							buttonLabel='Add section'
							onSaveCallback={onSaveNewSection}
						/>
					)}
				</div>
			)}
		</div>
	);
}
