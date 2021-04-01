const ActionType = {
	UPDATE_CURRENT_BOARD: 'dragdrop/UPDATE_CURRENT_BOARD',
	ADD_SECTION: 'dragdrop/ADD_SECTION',
	UPDATE_SECTION: 'dragdrop/UPDATE_SECTION',
	ADD_CARD: 'dragdrop/ADD_CARD',
	UPDATE_CARD: 'dragdrop/UPDATE_CARD',
	MOVE_CARD: 'dragdrop/MOVE_CARD',
	FETCH_BOARDS: 'dragdrop/FETCH_BOARDS',
	IS_LOADING: 'dragdrop/IS_LOADING',
	UPDATE_ERROR: 'dragdrop/UPDATE_ERROR',
};

// actions
const updateCurrentBoardAction = (board) => {
	return {
		type: ActionType.UPDATE_CURRENT_BOARD,
		payload: board,
	};
};
const addSectionAction = (section) => {
	return {
		type: ActionType.ADD_SECTION,
		payload: section,
	};
};
const updateSectionAction = (section) => {
	return {
		type: ActionType.UPDATE_SECTION,
		payload: section,
	};
};
const addCardAction = (card) => {
	return {
		type: ActionType.ADD_CARD,
		payload: card,
	};
};
const updateCardAction = (id, text) => {
	return {
		type: ActionType.UPDATE_CARD,
		payload: { id, text },
	};
};
const moveCardAction = (movedCard) => {
	return {
		type: ActionType.MOVE_CARD,
		payload: movedCard,
	};
};
const fetchBoardsAction = (data) => {
	return {
		type: ActionType.FETCH_BOARDS,
		payload: data,
	};
};
const isLoadingAction = (isLoading) => {
	return {
		type: ActionType.IS_LOADING,
		isLoading,
	};
};
const updateErrorAction = (error) => {
	return {
		type: ActionType.UPDATE_ERROR,
		error,
	};
};

// action creators
const Actions = {
	updateCurrentBoard: (board) => updateCurrentBoardAction(board),
	addSection: (section) => addSectionAction(section),
	updateSection: (section) => updateSectionAction(section),
	addCard: (card) => addCardAction(card),
	updateCard: (id, text) => updateCardAction(id, text),
	moveCard: (card) => moveCardAction(card),
	fetchBoards: (data) => fetchBoardsAction(data),
	isLoading: (isLoading) => isLoadingAction(isLoading),
	updateError: (error) => updateErrorAction(error),
};

export { Actions, ActionType };
