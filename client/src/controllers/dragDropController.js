import axios from 'axios';
import { Actions } from '../redux/dragdrop/actions';
import { fnMapID } from '../utils/fnMapID';

const BASE_URL = 'http://localhost:5000';

const fetchBoardsController = (url = BASE_URL) => async (dispatch) => {
	try {
		// set Loading state
		dispatch(Actions.isLoading(true));
		const response = await axios.get(url);
		const fetchedData = response?.data;

		if (fetchedData) {
			const { boards, sections, cards } = fetchedData;
			const data = {
				boards: fnMapID(boards),
				sections: fnMapID(sections),
				cards: fnMapID(cards),
			};
			// update the state when we get data
			dispatch(Actions.fetchBoards(data));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(error));
	} finally {
		// set state to not loading
		dispatch(Actions.isLoading(false));
	}
};

const getCurrentBoardController = (board) => (dispatch) => {
	dispatch(Actions.updateCurrentBoard(board));
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

const moveCardController = (card) => async (dispatch) => {
	try {
		const response = await axios.post(`${BASE_URL}/update/card/`, card);
		const movedCard = response?.data;

		if (movedCard) {
			// update the state when we get response, and map _id to id
			dispatch(Actions.moveCard(fnMapID([movedCard])[0]));
		}
	} catch (error) {
		// set error state
		dispatch(Actions.updateError(`Can't move the card. ${error}`));
	}
};

export {
	fetchBoardsController,
	getCurrentBoardController,
	createSectionController,
	updateSectionController,
	createCardController,
	moveCardController,
};