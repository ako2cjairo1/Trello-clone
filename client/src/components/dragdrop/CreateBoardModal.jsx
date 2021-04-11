import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../shared';
import { createBoardController } from '../../controllers';

export function CreateBoardModal(props) {
	const dispatch = useDispatch();
	const { isActive, onClose } = props;

	const [boardTitle, setBoardTitle] = useState('');

	const handleCreateBoard = () => {
		if (boardTitle.trim() !== '') {
			// ceate the board and set as current board selected
			dispatch(createBoardController({ title: boardTitle }));
			setBoardTitle('');
			onClose();
		}
	};

	const handleKeyStroke = (evt) => {
		if (evt.key === 'Enter') {
			if (boardTitle.trim() !== '') {
				handleCreateBoard();
			}
		} else if (evt.key === 'Escape') {
			setBoardTitle('');
			onClose();
		}
	};

	return (
		<Modal
			style={{
				display: 'flex',
				justifyContent: 'center',
				padding: '0px',
				width: '275px',
				height: '105px',
				minHeight: 'min-content',
				background: 'transparent',
			}}
			isOpen={isActive}
			onClose={onClose}
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
							onKeyUp={handleKeyStroke}
							autoFocus
						/>
						<div className='add-card-actions'>
							<button className='add-card-button' onClick={handleCreateBoard}>
								Create board
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
