import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

// actions
import { moveCard } from '../redux/dragdrop/actions';

function useDragDrop(sections, cards) {
	const dispatch = useDispatch();
	let initSections = useRef({});
	let cardMoved = useRef(null);
	let sectionClassNameState = {};
	const [sectionClasses, setSectionClasses] = useState(sectionClassNameState);
	// dragged item states
	const [cardId, setCardId] = useState();
	const [sectionNameFrom, setSectionNameFrom] = useState();
	const [sectionNameTo, setSectionNameTo] = useState();

	// Action Handlers
	const handleDragStart = (id, fr) => {
		// clear the previous dragged item states before starting a new one
		clearDraggedItem();
		// capture new dragged item id
		setCardId(id);
		setSectionNameFrom(fr);
	};

	const handleDrop = (sectionId) => setSectionNameTo(sectionId);

	const handleDragOver = (evt, sectionName) => {
		evt.preventDefault();

		if (sectionName !== sectionNameFrom) {
			sections.forEach(({ name }) => {
				if (sectionName === name) {
					if (!sectionClasses[name].includes('hovered')) {
						// append 'hovered' class name
						setSectionClasses((prevClass) => ({ ...prevClass, [name]: prevClass[name] + ' hovered' }));
					}
				}
			});
		}
	};

	const handleDragLeave = (sectionName) => {
		sections.forEach(({ name }) => {
			if (sectionName === name) {
				// remove 'hovered' class name
				setSectionClasses((prevClass) => ({ ...prevClass, [name]: 'section' }));
			}
		});
	};

	const clearDraggedItem = () => {
		setCardId(null);
		setSectionNameFrom(null);
		setSectionNameTo(null);
	};

	initSections.current = () => {
		sections.forEach(({ name }) => {
			sectionClassNameState = { ...sectionClassNameState, [name]: 'section' };
		});
		setSectionClasses(sectionClassNameState);
	};

	cardMoved.current = () => {
		if (sectionNameFrom && sectionNameTo && sectionNameFrom !== sectionNameTo) {
			// move card to new section
			dispatch(moveCard(cardId, sectionNameTo));
			// clear the state of dragged item
			clearDraggedItem();
		}
	};

	useEffect(() => {
		initSections.current();
		cardMoved.current();
	}, [sections, sectionNameTo]);

	// build the object mapping of sections with associated card items and action handlers
	const mappedSections = sections.map(({ name }) => {
		const cardsList = cards.filter((cards) => cards.section === name);
		const sectionClassName = sectionClasses[name];
		const actionHandlers = {
			sectionClassName,
			handleDragOver,
			handleDragStart,
			handleDragLeave,
			handleDrop,
		};
		return {
			section: name,
			handlers: actionHandlers,
			lists: cardsList,
		};
	});

	return mappedSections;
}

export { useDragDrop };
