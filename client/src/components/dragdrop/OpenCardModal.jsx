import { memo } from 'react';
import { Modal } from '../shared';
import { CreateNewItem } from '.';
import { IoCardOutline, IoList } from 'react-icons/io5';

export const OpenCardModal = memo((props) => {
	const { card, isActive, actionHandlers } = props;
	const { closeModal, saveCard } = actionHandlers;

	return (
		<Modal onClose={closeModal} isOpen={isActive}>
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
			</div>

			<div className='modal-body'>
				<div className='title'>
					<div className='d-flex'>
						<IoList className='title-icon' />
						<h3>Description</h3>
					</div>
					<div className='description'>
						<CreateNewItem
							value={card.description}
							noicon={1}
							variant='textarea'
							ismodal={1}
							placeHolder={'Add a more detailed description...'}
							composerButtonLabel={
								card.description ? card.description : 'Add a more detailed description...'
							}
							buttonLabel='Save'
							onSaveCallback={saveCard}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
});
