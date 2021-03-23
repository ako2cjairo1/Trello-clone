import DragDropItem from './DragDropItem';

export default function DragAndDropSection({
	name,
	handlers: {
		sectionClassNameStates,
		handleDragOver,
		handleDragStart,
		handleDragLeave,
		handleDrop,
	},
	items,
}) {
	return (
		<div
			id={name}
			className={sectionClassNameStates}
			onDragOver={(e) => handleDragOver(e)}
			onDragLeave={(e) => handleDragLeave(e)}
			onDrop={(e) => handleDrop(e)}>
			<div className='list-header'>
				<h4 className='header'>{name}</h4>
				<div className='list-header-extras'>
					<span>...</span>
				</div>
			</div>
			{items.map(({ id, text }) => (
				<DragDropItem
					key={id}
					text={text}
					handleDragStart={() => handleDragStart(id, name)}
				/>
			))}
			<div className='footer'>+ Add new item</div>
		</div>
	);
}
