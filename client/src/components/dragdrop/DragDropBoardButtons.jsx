import './DragDropBoardButtons.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	updateCurrentBoardController,
	updateBoardController,
	closeBoardController,
} from '../../controllers';
import { IoAppsSharp, IoPodiumOutline, IoCloseOutline } from 'react-icons/io5';

export const DragDropBoardButtons = ({ boards, onClickNewBoard }) => {
	const [selectedBoard, setSelectedBoard] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const [boardTitle, setBoardTitle] = useState();
	const dispatch = useDispatch();
	let initCurrentBoard = useRef(null);

	const currentBoard = boards.find((board) => board.index === 1);

	initCurrentBoard.current = () => {
		if (boards && boards.length > 0) {
			if (currentBoard) {
				setSelectedBoard(currentBoard);
				setBoardTitle(currentBoard.title);
			}
		}
		onClickNewBoard(boards.length <= 0);
	};

	const onChangeBoard = (board) => {
		dispatch(updateCurrentBoardController(board));
		setSelectedBoard(board);
		setBoardTitle(board.title);
	};

	const handleCloseBoard = () => dispatch(closeBoardController(currentBoard));

	// Local Event handlers
	const onKeyUp_UpdateBoardTitle = (evt) => {
		if (evt.key === 'Escape' || evt.key === 'Enter') {
			dispatch(updateBoardController({ id: currentBoard.id, title: boardTitle }));
			setIsEditing(false);
		}
	};

	const onBlur_UpdateBoardTitle = () => {
		dispatch(updateBoardController({ id: currentBoard.id, title: boardTitle }));
		setIsEditing(false);
	};

	useEffect(() => {
		initCurrentBoard.current();
	}, [boards]);

	return (
		<>
			<div className='board-menu padding-inline'>
				<IoAppsSharp className='lg' />
			</div>
			{selectedBoard && boards.length > 0 && (
				<div className='dropdown'>
					<div className='board-menu d-flex-row selected'>
						<IoPodiumOutline className='lg' />
						<h3>Boards</h3>
					</div>
					{!isEditing && (
						<div className='dropdown-content'>
							{boards.map((board) => {
								const { id, title } = board;
								if (selectedBoard.id !== id) {
									return (
										<h3 key={id} className='board-menu' onClick={() => onChangeBoard(board)}>
											{title}
										</h3>
									);
								}
								return null;
							})}
						</div>
					)}
				</div>
			)}
			<div>
				{selectedBoard && boards.length > 0 ? (
					<div className='board-menu d-flex-row'>
						<input
							type='text'
							className={isEditing ? 'section-title-name mod-title-name' : 'section-title-name'}
							style={{
								marginTop: '0px',
								marginLeft: '-5px',
								width: `${(boardTitle?.length + 1) * 9 + 'px'}`,
								height: '32px',
								fontSize: '17px',
							}}
							readOnly={false}
							value={boardTitle}
							onChange={(e) => setBoardTitle(e.target.value.replace('\n', ''))}
							onKeyUp={onKeyUp_UpdateBoardTitle}
							onBlur={onBlur_UpdateBoardTitle}
							onClick={() => setIsEditing(true)}
						/>
					</div>
				) : (
					<div className='board-menu d-flex-row selected' onClick={onClickNewBoard}>
						<IoPodiumOutline className='lg' />
						<h3>Create new board</h3>
					</div>
				)}
			</div>
			{selectedBoard && (
				<div className='close board' onClick={handleCloseBoard}>
					<IoCloseOutline className='close-icon' />
					<h4 className='close-board-label' onClick={handleCloseBoard}>
						Close board
					</h4>
				</div>
			)}
		</>
	);
};
