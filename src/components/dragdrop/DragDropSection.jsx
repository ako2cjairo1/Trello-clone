import { memo, useRef } from 'react';
import { DragDropItem } from './DragDropItem';
import { NewItemCard } from './NewItemCard';

export const DragAndDropSection = memo(
	({ name, handlers: { sectionClassName, handleDragOver, handleDragStart, handleDragLeave, handleDrop }, items }) => {
		const onDragOver = (e) => handleDragOver(e, name);
		const onDragLeave = () => handleDragLeave(name);
		const onDrop = () => handleDrop(name);
		const endCardRef = useRef(null);

		return (
			<div id={name} className='section-wrapper' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
				<div id={name} className={sectionClassName} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
					<div className='section-header'>
						<h4 className='header'>{name}</h4>
						<div className='section-header-extras'>
							<span>⋮</span>
						</div>
					</div>
					<div className='section-container'>
						{items &&
							items.map(({ id, text }) => (
								<DragDropItem
									key={id}
									text={text}
									dragOver={onDragOver}
									dragLeave={onDragLeave}
									drop={onDrop}
									handleDragStart={() => handleDragStart(id, name)}
								/>
							))}
						<div ref={endCardRef} />
					</div>
					<NewItemCard
						section={name}
						variant='textarea'
						placeHolder='Enter a title for this card...'
						composerButtonLabel='Add a new card'
						buttonLabel='Add card'
						scrollDown={() => endCardRef.current.scrollIntoView({ behavior: 'smooth' })}
					/>
				</div>
			</div>
		);
	}
);
