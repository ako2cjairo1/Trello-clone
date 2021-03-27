const ADD_SECTION = 'dragdrop/ADD_SECTION';
const UPDATE_SECTION = 'dragdrop/UPDATE_SECTION';
const ADD_CARD = 'dragdrop/ADD_CARD';
const UPDATE_CARD = 'dragdrop/UPDATE_CARD';
const MOVE_CARD = 'dragdrop/MOVE_CARD';

// actions
const addSectionAction = (sectionName) => {
	return {
		type: ADD_SECTION,
		sectionName,
	};
};
const updateSectionAction = (id, sectionName) => {
	return {
		type: UPDATE_SECTION,
		payload: { id, sectionName },
	};
};
const addCardAction = (text, sectionName) => {
	return {
		type: ADD_CARD,
		payload: { text, sectionName },
	};
};
const updateCardAction = (cardId, text) => {
	return {
		type: UPDATE_CARD,
		payload: { cardId, text },
	};
};
const moveCardAction = (cardId, toSection) => {
	return {
		type: MOVE_CARD,
		payload: { cardId, toSection },
	};
};

// action creators
const addSection = (sectionName) => addSectionAction(sectionName);
const updateSection = (id, sectionName) => updateSectionAction(id, sectionName);
const addCard = (text, sectionName) => addCardAction(text, sectionName);
const updateCard = (cardId, text) => updateCardAction(cardId, text);
const moveCard = (cardId, toSection) => moveCardAction(cardId, toSection);

export { ADD_SECTION, UPDATE_SECTION, ADD_CARD, UPDATE_CARD, MOVE_CARD };
export { addSection, updateSection, addCard, updateCard, moveCard };
