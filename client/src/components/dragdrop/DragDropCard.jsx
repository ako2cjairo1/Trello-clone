import { memo, useState } from 'react';
import { Modal } from '../shared';
import { DragDropNewItem } from './';
import { useDispatch } from 'react-redux';
import { moveCardController } from '../../controllers';

export const DragDropCard = memo(({ card, handleDragStart, dragOver, dragLeave, drop }) => {
	const [itemClass, setItemClass] = useState('section-item');
	const [editClass, setEditClass] = useState('edit');
	const [isActive, setIsActive] = useState(false);
	const { sectionName, ...cardData } = card;
	const dispatch = useDispatch();
	let modalData = {};

	if (isActive) {
		modalData = { ...cardData, title: card.sectionName };
	}

	const toggleModal = (value) => {
		if (value === true) {
		} else {
		}
		setIsActive(value);
	};

	const onDrag = (action) => {
		// hide/show the dragged item
		if (action === 'start') {
			handleDragStart();
			setItemClass((prev) => prev + ' invisible');
		} else if (action === 'end') {
			setItemClass('section-item');
		}
	};

	const handleUpdateCard = (description) => {
		// add description
		modalData = { ...cardData, description };
		dispatch(moveCardController(modalData));
	};

	return (
		<div
			draggable='true'
			className={itemClass}
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			onDrop={drop}
			onMouseEnter={() => setEditClass('edit show')}
			onMouseLeave={() => setEditClass('edit')}
			onDragStart={() => onDrag('start')}
			onDragEnd={() => onDrag('end')}>
			{isActive && (
				<Modal data={modalData} onClose={() => toggleModal(false)} isOpen={isActive}>
					<DragDropNewItem
						value={card.description}
						noicon={1}
						variant='textarea'
						ismodal={1}
						placeHolder={'Add a more detailed description...'}
						composerButtonLabel={
							card.description ? card.description : 'Add a more detailed description...'
						}
						buttonLabel='Save'
						onSaveCallback={handleUpdateCard}
					/>
				</Modal>
			)}
			<div className='content' onClick={() => toggleModal(true)}>
				<p>{card.text}</p>
				<span
					className={editClass}
					onClick={(e) => {
						e.stopPropagation();
						alert('TODO: open in-line modal popup to edit details.');
					}}>
					🖉
				</span>
			</div>
		</div>
	);
});
