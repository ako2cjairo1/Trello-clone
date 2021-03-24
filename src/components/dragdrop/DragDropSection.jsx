import { memo, useState } from 'react';
import DragDropItem from './DragDropItem';
import NewItemCard from './NewItemCard';

function DragAndDropSection({
	name,
	handlers: { sectionClassNameStates, handleDragOver, handleDragStart, handleDragLeave, handleDrop },
	items,
}) {
	const [showNewItemForm, setShowNewItemForm] = useState(false);
	const onDragOver = (e) => handleDragOver(e, name);
	const onDragLeave = () => handleDragLeave(name);
	const onDrop = () => handleDrop(name);

	return (
		<div id={name} className='section-container' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
			<div id={name} className={sectionClassNameStates} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
				<div className='section-header'>
					<h4 className='header'>{name}</h4>
					<div className='section-header-extras'>
						<span>⋮</span>
					</div>
				</div>
				{items.map(({ id, text }) => (
					<DragDropItem
						key={id}
						text={text}
						dragOver={onDragOver}
						dragLeave={onDragLeave}
						drop={onDrop}
						handleDragStart={() => handleDragStart(id, name)}
					/>
				))}
				{!showNewItemForm ? (
					<div className='footer' onClick={() => setShowNewItemForm(true)}>
						<span>+</span>
						<p>Add new item</p>
					</div>
				) : (
					<NewItemCard close={() => setShowNewItemForm(false)} save={() => alert('TODO: implement save func.')} />
				)}
			</div>
		</div>
	);
}

export default memo(DragAndDropSection);
