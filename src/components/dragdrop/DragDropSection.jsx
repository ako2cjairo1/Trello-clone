import { memo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropItem } from './DragDropItem';
import { NewItemCard } from './NewItemCard';
import { updateSection } from '../../redux/dragdrop/actions';

export const DragAndDropSection = memo(
	({
		section: { id: sectionID, name },
		handlers: { sectionClassName, handleDragOver, handleDragStart, handleDragLeave, handleDrop },
		items,
	}) => {
		const endCardRef = useRef(null);

		// Local state
		const [editedName, setEditedName] = useState(name);
		const [isEditing, setIsEditing] = useState(false);
		const dispatch = useDispatch();
		// Event handlers
		const onDragOver = (e) => handleDragOver(e, sectionID);
		const onDragLeave = () => handleDragLeave(sectionID);
		const onDrop = () => handleDrop(sectionID);

		// controller funcs
		const updateSectionName = () => {
			// dispatch the update action only when there are changes
			if (editedName !== name) {
				dispatch(updateSection(sectionID, editedName));
			}
			setIsEditing(false);
		};

		// Local Event handlers
		const onKeyUp_UpdateSectionName = (evt) => (evt.key === 'Escape' || evt.key === 'Enter') && updateSectionName();
		const onBlur_UpdateSectionName = () => isEditing && updateSectionName();
		const onClick_IsEditing = () => !isEditing && setIsEditing(true);

		return (
			<div id={sectionID} className='section-wrapper' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
				<div id={sectionID} className={sectionClassName} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
					<div className='section-header'>
						<div className='section-title'>
							<textarea
								className={isEditing ? 'section-title-name mod-title-name' : 'section-title-name'}
								readOnly={!isEditing}
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
								onKeyUp={onKeyUp_UpdateSectionName}
								onBlur={onBlur_UpdateSectionName}
								onClick={onClick_IsEditing}
							/>
						</div>
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
									handleDragStart={() => handleDragStart(id, sectionID)}
								/>
							))}
						<div ref={endCardRef} />
					</div>
					<NewItemCard
						sectionID={sectionID}
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
