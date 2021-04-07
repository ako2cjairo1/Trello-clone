import './dragdropStyles.css';
import { IoAddOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropSection, DragDropBoardButtons, DragDropNewItem } from './';
import { Spinner, Modal } from '../shared';
// custom hook
import { useDragDropSections } from '../../hooks';
// actions
import {
	fetchBoardsController,
	createSectionController,
	createBoardController,
} from '../../controllers';

export function DragDropContainer() {
	const dispatch = useDispatch();
	//local states
	const [boardTitle, setBoardTitle] = useState('');
	const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
	// select global states
	const { isLoading, error, boards, sections } = useSelector((state) => state.board);
	// get the default/selected board
	// const getCurrentBoard() = boards && boards.length > 0 && boards.find((board) => board.index === 1);
	const getCurrentBoard = () => {
		return boards && boards.length > 0 && boards.find((board) => board.index === 1);
	};
	// map the sections
	const mappedSections = useDragDropSections(sections, getCurrentBoard());

	const onSaveNewSection = (newSection) =>
		dispatch(createSectionController({ board: getCurrentBoard().id, name: newSection }));

	const onSaveNewBoard = () => {
		if (boardTitle.trim() !== '') {
			setIsCreateBoardModalOpen(false);
			// ceate the board and set as current board selected
			dispatch(createBoardController({ title: boardTitle }));
			setBoardTitle('');
		}
	};

	const handleCreateFirstBoard = (value) => {
		!isLoading && setIsCreateBoardModalOpen(value);
	};

	useEffect(() => {
		dispatch(fetchBoardsController());
	}, [dispatch, boards.length]);

	return (
		<>
			<Modal
				style={{
					display: 'flex',
					justifyContent: 'center',
					padding: '0px',
					width: '275px',
					height: '105px',
					minHeight: 'min-content',
					// boxShadow: 'none',
					background: 'transparent',
				}}
				isOpen={isCreateBoardModalOpen}
				onClose={() => setIsCreateBoardModalOpen(false)}
				hideCloseButton>
				<div className='section-wrapper descendform'>
					<div className='section'>
						<div className='section-container'>
							<input
								type='text'
								className='new-section-input'
								placeholder='Add board title'
								value={boardTitle}
								onChange={(e) => setBoardTitle(e.target.value)}
							/>
							<div className='add-card-actions'>
								<button className='add-card-button' onClick={onSaveNewBoard}>
									Create board
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>

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
						{!isLoading && (
							<DragDropBoardButtons boards={boards} onClickNewBoard={handleCreateFirstBoard} />
						)}
					</div>
					<div className='right'>
						<div className='board-menu' onClick={() => setIsCreateBoardModalOpen(true)}>
							<IoAddOutline className='lg' />
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

						{getCurrentBoard() && (
							<DragDropNewItem
								variant='input'
								isOpen={mappedSections.length <= 0}
								placeHolder='Enter section title...'
								composerButtonLabel={`Add ${mappedSections.length > 0 ? 'another' : 'new'} section`}
								buttonLabel='Add section'
								onSaveCallback={onSaveNewSection}
							/>
						)}
					</div>
				)}
			</div>
		</>
	);
}
