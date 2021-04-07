const ActionType = {
	UPDATE_CURRENT_BOARD: 'dragdrop/UPDATE_CURRENT_BOARD',
	ADD_BOARD: 'dragdrop/ADD_BOARD',
	UPDATE_BOARD: 'dragdrop/UPDATE_BOARD',
	CLOSE_BOARD: 'dragdrop/CLOSE_BOARD',
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
const addBoardAction = (board) => {
	return {
		type: ActionType.ADD_BOARD,
		payload: board,
	};
};
const updateBoardAction = (board) => {
	return {
		type: ActionType.UPDATE_BOARD,
		payload: board,
	};
};
const closeBoardAction = (board) => {
	return {
		type: ActionType.CLOSE_BOARD,
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
const updateCardAction = (card) => {
	return {
		type: ActionType.UPDATE_CARD,
		payload: card,
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
	addBoard: (board) => addBoardAction(board),
	updateBoard: (board) => updateBoardAction(board),
	closeBoard: (board) => closeBoardAction(board),
	addSection: (section) => addSectionAction(section),
	updateSection: (section) => updateSectionAction(section),
	addCard: (card) => addCardAction(card),
	updateCard: (card) => updateCardAction(card),
	moveCard: (card) => moveCardAction(card),
	fetchBoards: (data) => fetchBoardsAction(data),
	isLoading: (isLoading) => isLoadingAction(isLoading),
	updateError: (error) => updateErrorAction(error),
};

export { Actions, ActionType };
