export default function DragDropItem({ text, handleDragStart }) {
	return (
		<div className='list-item' draggable='true' onDragStart={handleDragStart}>
			<div>
				<p>{text}</p>
			</div>
		</div>
	);
}
