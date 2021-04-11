import './BoardButtons.css';
import { memo } from 'react';
import {
	IoAppsSharp,
	IoPodiumOutline,
	IoHomeOutline,
	IoAddOutline,
	IoNotificationsOutline,
	IoInformationCircleOutline,
	IoPersonOutline,
} from 'react-icons/io5';

export const BoardButtons = memo((props) => {
	// destructure component props
	const { boards, currentBoard, actionHandlers } = props;
	// destructure action handlers
	const { openCreateBoard, selectBoard } = actionHandlers;

	return (
		<header>
			<div className='left'>
				<div className='board-menu padding-inline'>
					<IoAppsSharp className='lg' />
				</div>
				<div className='board-menu'>
					<IoHomeOutline className='lg' />
				</div>
				{/* Show the Board dropdown selection if there are 2 or more options  */}
				{currentBoard && (
					<div className='dropdown'>
						<div className='board-menu'>
							<IoPodiumOutline className='lg' />
							<h3>Boards</h3>
						</div>
						{currentBoard && boards.length > 1 && (
							<div className='dropdown-content'>
								{boards.map((board) => {
									if (board.id !== currentBoard.id) {
										const { id, title } = board;
										return (
											<h3
												key={id}
												className='board-menu item-wrap'
												onClick={() => selectBoard(board)}>
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
			</div>

			<div className='right'>
				<div title='Create a board' className='board-menu' onClick={openCreateBoard}>
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
	);
});
