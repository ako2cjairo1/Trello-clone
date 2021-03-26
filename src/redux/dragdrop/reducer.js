import { v4 as uuid } from 'uuid';
import { ADD_SECTION, ADD_CARD, MOVE_CARD, UPDATE_CARD } from './actions';

const initialState = {
	title: '',
	sections: [],
	cards: [],
};

export default function dragDropReducer(state = initialState, action) {
	let cards = [];
	switch (action.type) {
		case ADD_SECTION:
			const newSection = {
				id: uuid(),
				name: action.sectionName,
			};

			return {
				...state,
				sections: [...state.sections, newSection],
			};

		case ADD_CARD:
			const newCard = {
				id: uuid(),
				text: action.payload.text,
				section: action.payload.sectionName,
			};

			return {
				...state,
				cards: [...state.cards, newCard],
			};

		case MOVE_CARD:
			// filter out the card item to be moved
			cards = state.cards.filter((card) => card.id !== action.payload.cardId);
			// get the card item to be moved
			let movingCard = state.cards.find((card) => card.id === action.payload.cardId);
			// set the new section name
			movingCard = { ...movingCard, section: action.payload.toSection };

			return {
				...state,
				cards: [...cards, movingCard],
			};

		case UPDATE_CARD:
			// filter out the card item to be updated
			cards = state.cards.filter((card) => card.id !== action.payload.cardId);
			// get the card item to be updated
			let updatedCards = state.cards.find((card) => card.id === action.payload.cardId);
			// set the new text value
			updatedCards = { ...updatedCards, text: action.payload.text };

			return {
				...state,
				cards: [...cards, updatedCards],
			};
		default:
			return state;
	}
}
