import './DragDropBoardButtons.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentBoardController } from '../../controllers';

export const DragDropBoardButtons = ({ boards, currentBoard }) => {
	const [selectedBoard, setSelectedBoard] = useState();
	const dispatch = useDispatch();
	let initCurrentBoard = useRef(null);

	initCurrentBoard.current = () => {
		if (!currentBoard?.id && boards) {
			dispatch(updateCurrentBoardController(boards[0]));
			setSelectedBoard(boards[0]);
		} else {
			setSelectedBoard(currentBoard);
		}
	};

	const onClickNewBoard = (board) => {
		setSelectedBoard(board);
		dispatch(updateCurrentBoardController(board));
	};

	useEffect(() => {
		initCurrentBoard.current();
	}, [boards]);

	return (
		<>
			{selectedBoard ? (
				<div className='dropdown'>
					<h3 className='selected'>{selectedBoard.title}</h3>
					<div className='dropdown-content'>
						{boards.map((board) => {
							const { id, title } = board;
							if (selectedBoard.id !== id) {
								return (
									<h3 key={id} className='board-menu' onClick={() => onClickNewBoard(board)}>
										{title}
									</h3>
								);
							}
							return null;
						})}
					</div>
				</div>
			) : null}
		</>
	);
};
