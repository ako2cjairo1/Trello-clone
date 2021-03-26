const ADD_SECTION = 'dragdrop/ADD_SECTION';
const ADD_CARD = 'dragdrop/ADD_CARD';
const MOVE_CARD = 'dragdrop/MOVE_CARD';
const UPDATE_CARD = 'dragdrop/UPDATE_CARD';

// actions
const addSectionAction = (sectionName) => {
	return {
		type: ADD_SECTION,
		sectionName,
	};
};
const addCardAction = (text, sectionName) => {
	return {
		type: ADD_CARD,
		payload: { text, sectionName },
	};
};
const moveCardAction = (cardId, toSection) => {
	return {
		type: MOVE_CARD,
		payload: { cardId, toSection },
	};
};
const updateCardAction = (cardId, text) => {
	return {
		type: UPDATE_CARD,
		payload: { cardId, text },
	};
};

// action creators
const addSection = (sectionName) => addSectionAction(sectionName);
const addCard = (text, sectionName) => addCardAction(text, sectionName);
const moveCard = (cardId, toSection) => moveCardAction(cardId, toSection);
const updateCard = (cardId, text) => updateCardAction(cardId, text);

export { ADD_SECTION, ADD_CARD, MOVE_CARD, UPDATE_CARD };
export { addSection, addCard, moveCard, updateCard };
