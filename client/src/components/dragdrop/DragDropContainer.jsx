import './dragdropStyles.css';
import {
	IoAddOutline,
	IoNotificationsOutline,
	IoInformationCircleOutline,
	IoPersonOutline,
	IoCloseOutline,
	IoPodiumOutline,
} from 'react-icons/io5';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionContainer, BoardButtons, CreateNewItem, CreateBoardModal } from './';
import { Spinner } from '../shared';
// custom hook
import { useDragDropSections } from '../../hooks';
// actions
import {
	fetchBoardsController,
	createSectionController,
	closeBoardController,
	updateBoardController,
	updateCurrentBoardController,
} from '../../controllers';

export function DragDropContainer() {
	const dispatch = useDispatch();
	let handleNoSelectedBoardRef = useRef();
	//local states
	const [currentBoard, setCurrentBoard] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isCreatingBoard, setIsCreatingBoard] = useState(false);
	// select global states
	const { isLoading, error, boards, sections } = useSelector((state) => state.board);
	// get the default/selected board
	const getCurrentBoard = boards && boards.length > 0 && boards.find((board) => board.index === 1);
	// map the sections
	const mappedSections = useDragDropSections(sections, getCurrentBoard);

	const onSaveNewSection = (newSection) =>
		dispatch(createSectionController({ board: getCurrentBoard.id, name: newSection }));

	const showCreateBoardModal = (value) => !isLoading && setIsCreatingBoard(value);

	const handleCloseBoard = () => dispatch(closeBoardController(getCurrentBoard));

	// Local Event handlers
	const handleUpdateBoardTitle = () => {
		// don't udpate if there are no changes in value
		if (getCurrentBoard.title !== currentBoard) {
			dispatch(updateBoardController({ id: getCurrentBoard.id, title: currentBoard }));
		}
		setIsEditing(false);
	};

	handleNoSelectedBoardRef.current = () => {
		if (!getCurrentBoard && boards.length > 0) {
			// set the first board in the list
			// if there is currently no default selected board
			dispatch(updateCurrentBoardController(boards[0]));
		} else if (boards.length <= 0) {
			showCreateBoardModal(true);
		}
		if (getCurrentBoard?.title) {
			setCurrentBoard(getCurrentBoard.title);
		}
	};

	useEffect(() => {
		handleNoSelectedBoardRef.current();
	}, [getCurrentBoard]);

	useEffect(() => {
		dispatch(fetchBoardsController());
	}, [dispatch]);

	return (
		<main>
			<CreateBoardModal isActive={isCreatingBoard} onClose={() => showCreateBoardModal(false)} />
			<div
				className='dragdrop-container'
				// TODO: ability to change background image by the user
				style={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1614199238405-741b10b6e5af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
				}}>
				{isLoading && <Spinner />}

				<header>
					<div className='left'>
						<BoardButtons />
					</div>
					<div className='right'>
						<div
							title='Create a board'
							className='board-menu'
							onClick={() => showCreateBoardModal(true)}>
							<IoAddOutline className='lg' />
						</div>
						<div className='board-menu'>
							<IoInformationCircleOutline className='lg' />
						</div>
						<div className='board-menu padding-inline'>
							<IoNotificationsOutline className='lg' />
						</div>
						<div className='board-menu avatar'>
							<IoPersonOutline className='lg' />
						</div>
					</div>
				</header>

				<div className='board-header'>
					{boards && boards.length > 0 ? (
						<input
							type='text'
							className={isEditing ? 'input-title mod-title-name' : 'input-title board-menu'}
							style={{
								width: `${(currentBoard.length + 1) * 10 + 'px'}`,
							}}
							readOnly={!isEditing}
							value={currentBoard}
							onChange={(e) => setCurrentBoard(e.target.value.replace('\n', ''))}
							onKeyUp={(e) => e.key === 'Enter' && handleUpdateBoardTitle()}
							onBlur={handleUpdateBoardTitle}
							onClick={() => setIsEditing(true)}
							autoFocus
						/>
					) : (
						<div className='board-menu' onClick={() => showCreateBoardModal(true)}>
							<IoPodiumOutline className='lg' />
							<h3>Create board</h3>
						</div>
					)}

					<div
						title={`Close '${currentBoard}' board`}
						className='close board'
						onClick={handleCloseBoard}>
						<IoCloseOutline className='close-icon' />
						<h4 className='close-board-label' onClick={handleCloseBoard}>
							Close board
						</h4>
					</div>
				</div>

				{/* Loading Backdrop  */}
				{isLoading && <div className='backdrop'></div>}
				{/* TODO: create error page component  */}
				{error && <h3>Error: {error}</h3>}

				{/* Sections Content` */}
				{!isLoading && !error && mappedSections && (
					<div className='sections'>
						{sections.length > 0 &&
							mappedSections.map(({ section, handlers }) => (
								<SectionContainer key={section.id} section={section} handlers={handlers} />
							))}

						<CreateNewItem
							variant='input'
							buttonLabel='Add section'
							placeHolder='Enter section title...'
							composerButtonLabel={`Add ${mappedSections.length > 0 ? 'another' : 'new'} section`}
							isOpen={mappedSections.length <= 0}
							onSaveCallback={onSaveNewSection}
						/>
					</div>
				)}
			</div>
		</main>
	);
}
