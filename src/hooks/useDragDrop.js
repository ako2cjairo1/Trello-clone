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
	const [secIdFrom, setSecIdFrom] = useState();
	const [secIdTo, setSecIdTo] = useState();

	// Action Handlers
	const handleDragStart = (id, fr) => {
		// clear the previous dragged item states before starting a new one
		clearDraggedItem();
		// capture new dragged item id
		setCardId(id);
		setSecIdFrom(fr);
	};

	const handleDrop = (sectionId) => setSecIdTo(sectionId);

	const handleDragOver = (evt, secID) => {
		evt.preventDefault();

		if (secID !== secIdFrom) {
			sections.forEach(({ id }) => {
				if (secID === id) {
					if (!sectionClasses[id].includes('hovered')) {
						// append 'hovered' class name
						setSectionClasses((prevClass) => ({ ...prevClass, [id]: prevClass[id] + ' hovered' }));
					}
				}
			});
		}
	};

	const handleDragLeave = (secID) => {
		sections.forEach(({ id }) => {
			if (secID === id) {
				// remove 'hovered' class name
				setSectionClasses((prevClass) => ({ ...prevClass, [id]: 'section' }));
			}
		});
	};

	const clearDraggedItem = () => {
		setCardId(null);
		setSecIdFrom(null);
		setSecIdTo(null);
	};

	initSections.current = () => {
		sections.forEach(({ id }) => {
			sectionClassNameState = { ...sectionClassNameState, [id]: 'section' };
		});
		setSectionClasses(sectionClassNameState);
	};

	cardMoved.current = () => {
		if (secIdFrom && secIdTo && secIdFrom !== secIdTo) {
			// move card to new section
			dispatch(moveCard(cardId, secIdTo));
			// clear the state of dragged item
			clearDraggedItem();
		}
	};

	useEffect(() => {
		initSections.current();
		cardMoved.current();
	}, [sections, secIdTo]);

	// build the object mapping of sections with associated card items and action handlers
	const mappedSections = sections
		.sort((x, y) => (x.index > y.index ? 1 : -1))
		.map(({ id, name }) => {
			const cardsList = cards.filter((cards) => cards.section === id);
			const sectionClassName = sectionClasses[id];
			const actionHandlers = {
				sectionClassName,
				handleDragOver,
				handleDragStart,
				handleDragLeave,
				handleDrop,
			};
			return {
				section: { id, name },
				handlers: actionHandlers,
				lists: cardsList,
			};
		});

	return mappedSections;
}

export { useDragDrop };
