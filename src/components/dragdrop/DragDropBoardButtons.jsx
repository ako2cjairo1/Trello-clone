export const DragDropBoardButtons = ({ boards }) => {
	return (
		<>
			{boards &&
				boards.map(({ id, index, title }) => (
					<h3 key={id} className='board-menu'>
						{title}
					</h3>
				))}
		</>
	);
};
