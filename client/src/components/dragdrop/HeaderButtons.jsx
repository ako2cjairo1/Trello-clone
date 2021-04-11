import { useState, useEffect } from 'react';
import { IoCloseOutline, IoPodiumOutline } from 'react-icons/io5';
import { isUndefinedOrEmpty } from '../../utils';

export const HeaderButtons = (props) => {
	const { boards, currentBoard, actionHandlers } = props;
	const [boardTitle, setBoardTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const { isLoading, closeBoard, openCreateBoard, updateTitle } = actionHandlers;

	useEffect(() => {
		if (!isLoading && !isUndefinedOrEmpty(currentBoard)) {
			setBoardTitle(currentBoard.title);
		}
	}, [currentBoard, isLoading]);

	const handleKeyStroke = (evt) => {
		if (evt.key === 'Enter') {
			handleUpdateTitle();
		} else if (evt.key === 'Escape') {
			setIsEditing(false);
			setBoardTitle(currentBoard.title);
		}
	};

	const handleUpdateTitle = () => {
		setIsEditing(false);
		if (boardTitle) {
			updateTitle(boardTitle);
		}
	};

	const handleCloseBoard = () => {
		setIsEditing(false);
		closeBoard();
	};

	return (
		<div className='board-header'>
			{boards && boards.length > 0 ? (
				<input
					type='text'
					className={isEditing ? 'input-title mod-title-name' : 'input-title board-menu'}
					style={{
						width: `${(boardTitle.length + 1) * 10 + 'px'}`,
					}}
					readOnly={!isEditing}
					value={boardTitle}
					onChange={(e) => setBoardTitle(e.target.value.replace('\n', ''))}
					onKeyUp={handleKeyStroke}
					onBlur={handleUpdateTitle}
					onClick={() => setIsEditing(true)}
					autoFocus
				/>
			) : (
				!isLoading && (
					<div className='board-menu' onClick={openCreateBoard}>
						<IoPodiumOutline className='lg' />
						<h3>Create board</h3>
					</div>
				)
			)}

			{boards && boards.length > 0 && (
				<div
					title={`Close '${boardTitle}' board`}
					className='close board'
					onClick={handleCloseBoard}>
					<IoCloseOutline className='close-icon' />
					<h4 className='close-board-label' onClick={handleCloseBoard}>
						Close board
					</h4>
				</div>
			)}
		</div>
	);
};
