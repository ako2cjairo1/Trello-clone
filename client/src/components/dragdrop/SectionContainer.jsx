import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardContainer, CreateNewItem } from '.';
// Controllers
import { updateSectionController, createCardController } from '../../controllers';

export const SectionContainer = ({
	section: { id: sectionID, name },
	handlers: { sectionClassName, handleDragOver, handleDragStart, handleDragLeave, handleDrop },
}) => {
	const dispatch = useDispatch();
	const endCardRef = useRef(null);

	// Global state
	// map cards by section
	const cards = useSelector((state) => state.trello.cards);

	// Local state
	const [editedName, setEditedName] = useState(name);
	const [isEditing, setIsEditing] = useState(false);
	// Event handlers
	const onDragOver = (e) => handleDragOver(e, sectionID);
	const onDragLeave = () => handleDragLeave(sectionID);
	const onDrop = () => handleDrop(sectionID);

	// controller funcs
	const updateSectionName = () => {
		// dispatch the update action only when there are changes
		if (editedName !== name) {
			setEditedName((name) => name.replace('\n', ''));
			dispatch(updateSectionController({ id: sectionID, name: editedName }));
		}
		setIsEditing(false);
	};
	const onSaveNewCard = (newCard) =>
		dispatch(createCardController({ section: sectionID, text: newCard }));

	// Local Event handlers
	const onKeyUp_UpdateSectionName = (evt) =>
		(evt.key === 'Escape' || evt.key === 'Enter') && updateSectionName();
	const onBlur_UpdateSectionName = () => isEditing && updateSectionName();
	const onClick_IsEditing = () => !isEditing && setIsEditing(true);

	return (
		<div
			id={sectionID}
			className='section-wrapper'
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}>
			<div
				id={sectionID}
				className={sectionClassName}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}>
				<div className='section-header'>
					<div className='section-title'>
						<input
							type='text'
							className={isEditing ? 'section-title-name mod-title-name' : 'section-title-name'}
							readOnly={!isEditing}
							value={editedName}
							onChange={(e) => setEditedName(e.target.value.replace('\n', ''))}
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
					{cards &&
						cards.map((card) => {
							if (card.section === sectionID) {
								return (
									<CardContainer
										key={card.id}
										card={{ ...card, sectionName: name }}
										dragOver={onDragOver}
										dragLeave={onDragLeave}
										drop={onDrop}
										handleDragStart={() => handleDragStart(card.id, sectionID)}
									/>
								);
							}
							return null;
						})}
					<div ref={endCardRef} />
				</div>

				<CreateNewItem
					sectionID={sectionID}
					variant='textarea'
					placeHolder='Enter a title for this card...'
					composerButtonLabel='Add a new card'
					buttonLabel='Add card'
					scrollDown={() => endCardRef.current.scrollIntoView({ behavior: 'smooth' })}
					onSaveCallback={onSaveNewCard}
				/>
			</div>
		</div>
	);
};
