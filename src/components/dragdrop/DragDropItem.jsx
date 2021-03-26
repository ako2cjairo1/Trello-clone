import { memo, useState } from 'react';

export const DragDropItem = memo(({ text, handleDragStart, dragOver, dragLeave, drop }) => {
	const [itemClass, setItemClass] = useState('section-item');
	const [editClass, setEditClass] = useState('edit');

	const onDrag = (action) => {
		// hide/show the dragged item
		if (action === 'start') {
			handleDragStart();
			setItemClass((prev) => prev + ' invisible');
		} else if (action === 'end') {
			setItemClass('section-item');
		}
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
			<div className='content' onClick={() => alert('TODO: open modal popup for item details.')}>
				<p>{text}</p>
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
