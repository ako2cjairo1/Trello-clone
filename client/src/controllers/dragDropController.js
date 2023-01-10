import axios from 'axios';
import { Actions, ActionType } from '../redux/dragdrop/actions';
import { fnMapID, fnSortByIndex } from '../utils';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchBoardsController =
	(url = BASE_URL) =>
	async (dispatch) => {
		try {
			// set Loading state
			dispatch(Actions.isLoading(true));
			const response = await axios.get(url);
			const fetchedData = response?.data;

			if (fetchedData) {
				const { boards, sections, cards } = fetchedData;
				const data = {
					boards: fnSortByIndex(fnMapID(boards)),
					sections: fnSortByIndex(fnMapID(sections)),
					cards: fnSortByIndex(fnMapID(cards)),
				};
				// update the state when we get data
				dispatch(Actions.fetchBoards(data));
				// set to not loading
				dispatch(Actions.isLoading(false));
			}
		} catch (error) {
			// set error state
			dispatch(Actions.updateError(error));
			// set to not loading
			dispatch(Actions.isLoading(false));
		}
	};

const updateCurrentBoardController = (board) => async (dispatch) => {
	try {
		dispatch(Actions.isLoading(true));
		const response = await axios.post(`${BASE_URL}/setcurrentboard/`, board);
		const updatedBoard = response?.data;

		if (updatedBoard) {
			dispatch(Actions.updateCurrentBoard(fnMapID([updatedBoard])[0]));
			// set to not loading
			dispatch(Actions.isLoading(false));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't update the current board. ${error}`));
		// set to not loading
		dispatch(Actions.isLoading(false));
	}
};

const createBoardController = (board) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/create/board/`, board);
		const newBoard = response?.data;

		if (newBoard) {
			// update the state when we get response, and map _id to id
			dispatch(Actions.addBoard(fnMapID(newBoard)));
			// set as current board
			dispatch(updateCurrentBoardController(fnMapID(newBoard)[0]));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't create the board. ${error}`));
	}
};

const updateBoardController = (board) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/update/board/`, board);
		const updateBoard = response?.data;

		if (updateBoard) {
			dispatch(Actions.updateBoard(fnMapID([updateBoard])[0]));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't update the board. ${error}`));
	}
};

const closeBoardController = (deletingBoard) => async (dispatch) => {
	try {
		// set Loading state
		dispatch(Actions.isLoading(true));
		const response = await axios.post(`${BASE_URL}/closeboard/`, deletingBoard);
		const updatedCollections = response?.data;

		if (updatedCollections) {
			const { boards, sections, cards } = updatedCollections;
			const mappedCollections = {
				boards: fnSortByIndex(fnMapID(boards)),
				sections: fnSortByIndex(fnMapID(sections)),
				cards: fnSortByIndex(fnMapID(cards)),
			};
			// response data is the defaulted board after deleted board
			dispatch(Actions.closeBoard(mappedCollections));
			// set to not loading
			dispatch(Actions.isLoading(false));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't close the board. ${error}`));
		// set to not loading
		dispatch(Actions.isLoading(false));
	}
};

const createSectionController = (section) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/create/section/`, section);
		const newSection = response?.data;

		if (newSection) {
			// update the state when we get response, and map _id to id
			dispatch(Actions.addSection(fnMapID(newSection)));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't create the section. ${error}`));
	}
};

const updateSectionController = (section) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/update/section/`, section);
		const updatedSection = response?.data;

		if (updatedSection) {
			dispatch(Actions.updateSection(fnMapID([updatedSection])[0]));
		}
	} catch (error) {
		dispatch(Actions.updateError(`Can't update the section name. ${error}`));
	}
};

const createCardController = (card) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/create/card/`, card);
		const newCard = response?.data;

		if (newCard) {
			// update the state when we get response, and map _id to id
			dispatch(Actions.addCard(fnMapID(newCard)));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't create the card. ${error}`));
	}
};

const updateCardController = (card, action) => async (dispatch) => {
	try {
		const isUpdateIndex = action().type === ActionType.UPDATE_CARD ? false : true;
		const response = await axios.post(`${BASE_URL}/update/card/`, { card, isUpdateIndex });
		const updatedCard = response?.data;

		if (updatedCard) {
			// update the state when we get response, and map _id to id
			dispatch(action(fnMapID([updatedCard])[0]));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't update the card. ${error}`));
	}
};

const deleteCardController = (card) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/delete/card/`, card);

		if (response.status === 200) {
			dispatch(Actions.deleteCard(card));
		}
	} catch (error) {
		dispatch(Actions.updateError(`Can't delete card. ${error}`));
	}
};

export {
	fetchBoardsController,
	updateCurrentBoardController,
	createBoardController,
	updateBoardController,
	closeBoardController,
	createSectionController,
	updateSectionController,
	createCardController,
	updateCardController,
	deleteCardController,
};
