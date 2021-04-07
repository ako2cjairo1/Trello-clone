import { memo, useState } from 'react';
import { Modal } from '../shared';
import { DragDropNewItem } from './';
import { useDispatch } from 'react-redux';
import { updateCardController } from '../../controllers';
import { IoCardOutline, IoList } from 'react-icons/io5';
import { Actions } from '../../redux/dragdrop/actions';

export const DragDropCard = memo(({ card, handleDragStart, dragOver, dragLeave, drop }) => {
	const [itemClass, setItemClass] = useState('section-item');
	const [editClass, setEditClass] = useState('edit');
	const [isActive, setIsActive] = useState(false);
	const { sectionName, ...cardData } = card;
	const dispatch = useDispatch();

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
		// add description to card update
		dispatch(updateCardController({ ...cardData, description }, Actions.updateCard));
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
				<Modal onClose={() => toggleModal(false)} isOpen={isActive}>
					<div className='modal-header'>
						<div className='title'>
							<div className='d-flex'>
								<div className='d-flex'>
									<IoCardOutline className='title-icon' />
								</div>
								<h2>{card.text}</h2>
							</div>
							<div className='section-link'>
								<p>in section </p> <span>{card.sectionName}</span>
							</div>
						</div>
						{/* close button here */}
					</div>

					<div className='modal-body'>
						<div className='title'>
							<div className='d-flex'>
								<IoList className='title-icon' />
								<h3>Description</h3>
							</div>
							<div className='description'>
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
							</div>
						</div>
					</div>
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
