import { memo } from 'react';

function NewItemCard({ close, save }) {
	return (
		<>
			<div>
				<textarea className='new-item-textarea' placeholder='Enter a title for this card...' />
			</div>
			<div className='add-card-actions'>
				<button className='add-card-button' onClick={save}>
					Add Card
				</button>
				<span className='remove-card-button' onClick={close}>
					✕
				</span>
			</div>
		</>
	);
}

export default memo(NewItemCard);
