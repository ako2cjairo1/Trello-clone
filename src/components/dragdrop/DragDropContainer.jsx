import './dragdropStyles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropSection, DragDropBoardButtons } from './';
import { DragDropNewItem } from './';
import { Spinner } from '../shared';
// custom hook
import { useDragDropSections } from '../../hooks';
// actions
import { fetchBoardsController, getCurrentBoardController } from '../../controllers';

export function DragDropContainer() {
	// select global states
	const { isLoading, error, boards, sections, currentBoard } = useSelector((state) => state.board);
	// map the boards, section and cards
	const mappedSections = useDragDropSections(currentBoard && sections && sections);

	const dispatch = useDispatch();
	useEffect(() => {
		console.log('Fetching...');
		dispatch(fetchBoardsController());
	}, [dispatch]);

	useEffect(() => {
		// select the first Board in list if nothing have set currently.
		if (!currentBoard && boards[0]) {
			dispatch(getCurrentBoardController(boards[0]));
		}
	}, [boards, dispatch, currentBoard]);

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
					<span className='board-menu padding-inline'>𓃑</span>
					{boards && <DragDropBoardButtons boards={boards} />}
				</div>
				<div className='right'>
					<span className='board-menu lg'>+</span>
					<span className='board-menu padding-inline'>🔔</span>
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
							composerButtonLabel={`Add ${sections && sections ? 'another' : 'new'} section`}
							buttonLabel='Add section'
						/>
					)}
				</div>
			)}
		</div>
	);
}
