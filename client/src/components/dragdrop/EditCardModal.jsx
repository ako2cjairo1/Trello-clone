import React, { memo, useState, useEffect } from 'react';
import {
	IoCardOutline,
	IoPricetagsOutline,
	IoArrowForwardOutline,
	IoTimeOutline,
	IoTrashOutline,
} from 'react-icons/io5';
import { Modal } from '../shared';

export const EditCardModal = memo((props) => {
	const { card, cardCoordinates, isActive, actionHandlers } = props;
	const { openCardModal, closeEditor, saveCard, deleteCard } = actionHandlers;
	const [cardUpdate, setCardUpdate] = useState('');

	useEffect(() => {
		setCardUpdate(card);
	}, [card]);

	const handleCardText = (evt) => setCardUpdate((prev) => ({ ...prev, text: evt.target.value }));
	const handleSaveCard = () => saveCard(cardUpdate);
	const handleKeyStroke = (evt) => {
		if (evt.key === 'Enter') {
			handleSaveCard();
		} else if (evt.key === 'Escape') {
			// set to previous state of card
			setCardUpdate(card);
			closeEditor();
		}
	};

	return (
		<Modal
			isOpen={isActive}
			hideCloseButton={true}
			onClose={closeEditor}
			style={{
				margin: '0px',
				padding: '0px',
				position: 'absolute',
				top: cardCoordinates.top + 'px',
				left: cardCoordinates.left + 'px',
				width: cardCoordinates.width + 'px',
				height: cardCoordinates.height + 'px',
				minHeight: '140px',
				maxHeight: '400px',
				background: 'transparent',
				overflow: 'visible',
				boxShadow: 'none',
			}}>
			<textarea
				className='new-item-textarea'
				placeholder='Add card title'
				value={cardUpdate.text}
				autoFocus
				onChange={handleCardText}
				onKeyUp={handleKeyStroke}
				style={{
					width: cardCoordinates.width + 'px',
					height: cardCoordinates.height + 'px',
					minHeight: '90px',
					maxHeight: '360px',
					marginBottom: '20px !important',
					boxShadow: '15px 15px 50px rgb(9 30 66 / 50%)',
				}}
			/>
			<div className='add-card-actions'>
				<button className='add-card-button' onClick={handleSaveCard}>
					Save
				</button>
				<span className='close-button' style={{ color: '#fff' }} onClick={closeEditor}>
					✕
				</span>
			</div>

			{/* Side buttons  */}
			<div className='card-editor-sidebuttons'>
				<div className='card-editor-button d-flex center' onClick={openCardModal}>
					<IoCardOutline
						className='title-icon'
						style={{ color: 'inherit', width: '15px', height: '15px' }}
					/>
					<h4>Open card</h4>
				</div>
				<div className='card-editor-button d-flex center'>
					<IoPricetagsOutline
						className='title-icon'
						style={{ color: 'inherit', width: '15px', height: '15px' }}
					/>
					<h4>Edit labels</h4>
				</div>
				<div className='card-editor-button d-flex center'>
					<IoArrowForwardOutline
						className='title-icon'
						style={{ color: 'inherit', width: '15px', height: '15px' }}
					/>
					<h4>Move</h4>
				</div>
				<div className='card-editor-button d-flex center'>
					<IoTimeOutline
						className='title-icon'
						style={{ color: 'inherit', width: '15px', height: '15px' }}
					/>
					<h4>Change due date</h4>
				</div>
				<div className='card-editor-button d-flex center' onClick={deleteCard}>
					<IoTrashOutline
						className='title-icon'
						style={{ color: 'inherit', width: '15px', height: '15px' }}
					/>
					<h4>Delete</h4>
				</div>
			</div>
		</Modal>
	);
});
