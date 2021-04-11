import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
// Controllers
import { updateCardController } from '../controllers';
import { Actions } from '../redux/dragdrop/actions';

function useDragDropSections(sections, currentBoard) {
	const dispatch = useDispatch();
	let fnInitSections = useRef({});
	let fnCardMoved = useRef(null);
	let sectionClassNameState = {};

	const currentSections =
		sections && currentBoard && sections.filter((section) => section.board === currentBoard.id);

	// local state variables
	const [sectionClasses, setSectionClasses] = useState(sectionClassNameState);
	// dragged item states
	const [cardId, setCardId] = useState();
	const [secIdFrom, setSecIdFrom] = useState();
	const [secIdTo, setSecIdTo] = useState();

	// Lifecycle Actions
	useEffect(() => {
		if (sections) {
			fnInitSections.current();
			fnCardMoved.current();
		}
	}, [sections, secIdTo]);

	fnInitSections.current = () => {
		sections.forEach(({ id }) => {
			sectionClassNameState = { ...sectionClassNameState, [id]: 'section' };
		});
		setSectionClasses(sectionClassNameState);
	};

	fnCardMoved.current = () => {
		if (secIdFrom && secIdTo && secIdFrom !== secIdTo) {
			// move card to new section
			dispatch(updateCardController({ id: cardId, section: secIdTo }, Actions.moveCard));
			// clear the state of dragged item
			clearDraggedItem();
		}
	};

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
						setSectionClasses((prevClass) => ({
							...prevClass,
							[id]: prevClass[id] + ' hovered',
						}));
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

	// build the object mapping of sections with associated action handlers
	const mappedBoard =
		currentSections &&
		currentSections.map(({ id, name }) => {
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
			};
		});

	return mappedBoard;
}

export { useDragDropSections };
