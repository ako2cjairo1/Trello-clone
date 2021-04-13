import './dragdropStyles.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionContainer, BoardButtons, HeaderButtons, CreateNewItem, CreateBoardModal } from './';
import { Spinner } from '../shared';
import { isUndefinedOrEmpty } from '../../utils';
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
	let handleCurrentBoardRef = useRef();
	//local states
	const [isCreatingBoard, setIsCreatingBoard] = useState(false);
	// select global states
	const { isLoading, error, boards, sections } = useSelector((state) => state.trello);
	// get the default/selected board
	const [currentBoard, setCurrentBoard] = useState({});
	// map the sections
	const mappedSections = useDragDropSections(sections, currentBoard);

	// Lifecycle actions
	useEffect(() => {
		// fetch data from server end-point
		dispatch(fetchBoardsController());
	}, [dispatch]);

	useEffect(() => {
		handleCurrentBoardRef.current();
	}, [boards]);

	useEffect(() => {}, [boards]);

	handleCurrentBoardRef.current = () => {
		const selectedBoard = boards && boards.length > 0 && boards.find((board) => board.index === 1);

		if (selectedBoard) {
			setCurrentBoard(selectedBoard);
		}

		if (!isLoading && isUndefinedOrEmpty(currentBoard) && boards.length > 0) {
			// set the first board in the list
			// if there's no default selected board
			dispatch(updateCurrentBoardController(boards[0]));
		}

		// show modal to create a board
		setIsCreatingBoard(boards && boards.length <= 0);
	};

	// Handlers
	const handleCreateSection = (newSection) =>
		dispatch(createSectionController({ board: currentBoard.id, name: newSection }));
	const openCreateBoardModal = (value) => !isLoading && setIsCreatingBoard(value);
	const boardButtonsHandlers = {
		openCreateBoard: () => openCreateBoardModal(true),
		selectBoard: (board) => {
			// don't udpate if there are no changes in value
			if (currentBoard.id !== board.id) {
				dispatch(updateCurrentBoardController(board));
			}
		},
	};
	const headerButtonHandlers = {
		isLoading,
		closeBoard: () => {
			dispatch(closeBoardController(currentBoard));
		},
		openCreateBoard: () => openCreateBoardModal(true),
		updateTitle: (updatedTitle) => {
			// don't udpate if there are no changes in value
			if (currentBoard.title !== updatedTitle) {
				dispatch(updateBoardController({ id: currentBoard.id, title: updatedTitle }));
			}
		},
	};

	return (
		<main>
			{!isLoading && isCreatingBoard && (
				<CreateBoardModal isActive={isCreatingBoard} onClose={() => openCreateBoardModal(false)} />
			)}
			<div
				className='dragdrop-container'
				// TODO: ability to change background image by the user
				style={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1614199238405-741b10b6e5af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
				}}>
				<BoardButtons
					boards={boards}
					currentBoard={currentBoard}
					actionHandlers={boardButtonsHandlers}
				/>
				<HeaderButtons
					boards={boards}
					currentBoard={currentBoard}
					actionHandlers={headerButtonHandlers}
				/>

				{/* Loading Backdrop  */}
				{isLoading && <Spinner />}
				{/* TODO: create error page component  */}
				{error && <h3>Error: {error}</h3>}

				{/* Sections Content` */}
				{!isLoading && !error && mappedSections && (
					<div className='sections'>
						{sections.length > 0 &&
							mappedSections.map(({ section, handlers }) => (
								<SectionContainer key={section.id} section={section} handlers={handlers} />
							))}

						{/* Show if there's a default board  */}
						{!isUndefinedOrEmpty(currentBoard) && boards && boards.length > 0 && (
							<CreateNewItem
								variant='input'
								buttonLabel='Add section'
								placeHolder='Enter section title...'
								composerButtonLabel={`Add ${mappedSections.length > 0 ? 'another' : 'new'} section`}
								// show new section modal if there's no section yet.
								isOpen={mappedSections.length <= 0}
								onSaveCallback={handleCreateSection}
							/>
						)}
					</div>
				)}
			</div>
		</main>
	);
}
