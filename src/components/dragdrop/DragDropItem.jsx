import { memo, useState, useEffect } from 'react';

function DragDropItem({ text, handleDragStart, dragOver, dragLeave, drop }) {
	const [itemClass, setItemClass] = useState('section-item');
	const [editClass, setEditClass] = useState('edit');

	const onDrag = (action) => {
		if (action === 'start') {
			handleDragStart();
			setItemClass((prev) => prev + ' invisible');
		} else if (action === 'end') {
			setItemClass('section-item');
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setItemClass('section-item');
		}, 100);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div
			className={itemClass}
			draggable='true'
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			onDrop={drop}
			onMouseEnter={() => setEditClass('edit show')}
			onMouseLeave={() => setEditClass('edit')}
			onDragStart={() => onDrag('start')}
			onDragEnd={() => onDrag('end')}>
			<div className='content'>
				<p>{text}</p>
				<span className={editClass}>🖉</span>
			</div>
		</div>
	);
}

export default memo(DragDropItem);
