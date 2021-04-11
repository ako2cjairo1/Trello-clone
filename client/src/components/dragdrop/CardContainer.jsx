import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OpenCardModal, EditCardModal } from '.';
import { IoList, IoPencil } from 'react-icons/io5';
import { updateCardController, deleteCardController } from '../../controllers';
import { Actions } from '../../redux/dragdrop/actions';
import { fnGetElementRelativePosition } from '../../utils';

export const CardContainer = memo(({ card, handleDragStart, dragOver, dragLeave, drop }) => {
	const dispatch = useDispatch();
	const [itemClass, setItemClass] = useState('section-item');
	const [openCardModal, setOpenCardModal] = useState(false);
	const [editorCardModal, setEditorCardModal] = useState(false);
	const [cardCoordinate, setCardCoordinate] = useState({
		top: 0,
		left: 0,
		with: 0,
		height: 0,
	});

	const onDrag = (action) => {
		// hide/show the dragged item
		if (action === 'start') {
			handleDragStart();
			setItemClass((prev) => prev + ' invisible');
		} else if (action === 'end') {
			setItemClass('section-item');
		}
	};

	const openCardEditor = (evt) => {
		evt.stopPropagation();

		const relativeCard = document.getElementById(card.id);
		const { top, left } = fnGetElementRelativePosition(relativeCard);

		setCardCoordinate({
			top,
			left,
			width: relativeCard.offsetWidth,
			height: relativeCard.offsetHeight,
		});
		toggleCardEditorModal();
	};

	const toggleOpenCardModal = () => setOpenCardModal((prev) => !prev);
	const toggleCardEditorModal = () => setEditorCardModal((prev) => !prev);

	const openCardHandlers = {
		closeModal: toggleOpenCardModal,
		saveCard: (description) => {
			// dispatch card description when there are changes
			if (card.description !== description) {
				dispatch(updateCardController({ ...card, description }, Actions.updateCard));
			}
		},
	};

	const editCardHandlers = {
		closeEditor: toggleCardEditorModal,
		openCardModal: () => {
			// close card editor modal
			toggleCardEditorModal();
			// open card modal
			toggleOpenCardModal();
		},
		saveCard: (cardUpdate) => {
			// dispatch card updates when there are changes
			if (card !== cardUpdate) {
				dispatch(updateCardController(cardUpdate, Actions.updateCard));
			}
			// close card editor modal
			toggleCardEditorModal();
		},
		deleteCard: () => dispatch(deleteCardController(card)),
	};

	return (
		<div
			id={card.id}
			draggable='true'
			className={itemClass}
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			onDrop={drop}
			onDragStart={() => onDrag('start')}
			onDragEnd={() => onDrag('end')}>
			<OpenCardModal card={card} isActive={openCardModal} actionHandlers={openCardHandlers} />
			<EditCardModal
				card={card}
				cardCoordinates={cardCoordinate}
				isActive={editorCardModal}
				actionHandlers={editCardHandlers}
			/>

			<div className='card-content' onClick={setOpenCardModal}>
				{/* Card labels  */}
				<div className='card-labels'>
					<span className='card-label card-label-green' />
					<span className='card-label card-label-yellow' />
					<span className='card-label card-label-orange' />
					<span className='card-label card-label-red' />
					<span className='card-label card-label-purple' />
					<span className='card-label card-label-blue' />
				</div>

				<p>{card.text}</p>

				<div title='Edit card details' className='edit' onClick={(e) => openCardEditor(e)}>
					<IoPencil className='title-icon' />
				</div>

				{/* Card Badges  */}
				{card.description && (
					<div className='card-badges'>
						<IoList className='title-icon' style={{ width: '15px', heigh: '15px' }} />
					</div>
				)}
			</div>
		</div>
	);
});
