import './BoardButtons.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentBoardController } from '../../controllers';
import { IoAppsSharp, IoPodiumOutline, IoHomeOutline } from 'react-icons/io5';

export const BoardButtons = () => {
	const [selectedBoard, setSelectedBoard] = useState();
	const dispatch = useDispatch();
	let initDefaultBoard = useRef(null);

	const boards = useSelector((state) => state.board.boards);

	initDefaultBoard.current = () => {
		if (boards && boards.length > 0) {
			const defaultBoard = boards.find((board) => board.index === 1);
			if (defaultBoard) {
				setSelectedBoard(defaultBoard);
			}
		}
	};

	const onChangeBoard = (board) => {
		if (selectedBoard.id !== board.id) {
			dispatch(updateCurrentBoardController(board));
			setSelectedBoard(board);
		}
	};

	useEffect(() => {
		initDefaultBoard.current();
	}, [boards]);

	return (
		<>
			<div className='board-menu padding-inline'>
				<IoAppsSharp className='lg' />
			</div>
			<div className='board-menu'>
				<IoHomeOutline className='lg' />
			</div>
			{selectedBoard && boards.length > 1 && (
				<div className='dropdown'>
					<div className='board-menu'>
						<IoPodiumOutline className='lg' />
						<h3>Boards</h3>
					</div>
					{selectedBoard && boards.length > 1 && (
						<div className='dropdown-content'>
							{boards.map((board) => {
								const { id, title } = board;
								return (
									<h3
										key={id}
										className='board-menu item-wrap'
										onClick={() => onChangeBoard(board)}>
										{title}
									</h3>
								);
							})}
						</div>
					)}
				</div>
			)}
		</>
	);
};
