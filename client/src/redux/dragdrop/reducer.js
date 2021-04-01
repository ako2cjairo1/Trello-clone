import { board } from '../initialState';
import { ActionType } from './actions';

export function dragDropReducer(state = board, action) {
	// console.log('-----REDUCER-----');
	switch (action.type) {
		case ActionType.UPDATE_CURRENT_BOARD:
			const selectedBoard = action.payload;
			return {
				...state,
				currentBoard: { ...selectedBoard },
			};

		case ActionType.ADD_SECTION:
			const addedSection = action.payload;
			return {
				...state,
				sections: [...state.sections, ...addedSection],
			};

		case ActionType.UPDATE_SECTION:
			const updatedSection = action.payload;
			// make a copy of sections and replace with updated copy of section record
			// to maintain the record index in array.
			const sectionUpdates = state.sections.map((section) => {
				if (section.id === updatedSection.id) {
					return updatedSection;
				} else {
					return section;
				}
			});
			return {
				...state,
				sections: sectionUpdates,
			};

		case ActionType.ADD_CARD:
			const addedCard = action.payload;
			return {
				...state,
				cards: [...state.cards, ...addedCard],
			};

		case ActionType.UPDATE_CARD:
			const updatedCard = action.payload;
			// filter out the card item to be updated
			const removedCards = state.cards.filter((card) => card.id !== updatedCard.id);
			return {
				...state,
				cards: [...removedCards, updatedCard],
			};

		case ActionType.MOVE_CARD:
			const movedCard = action.payload;
			// filter out the card item to be moved
			const removeCard = state.cards.filter((card) => card.id !== movedCard.id);
			return {
				...state,
				cards: [...removeCard, movedCard],
			};

		case ActionType.IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};

		case ActionType.UPDATE_ERROR:
			return {
				...state,
				error: action.error,
			};

		case ActionType.FETCH_BOARDS:
			const {
				boards: fetchedBoards,
				sections: fetchedSections,
				cards: fetchedCards,
			} = action.payload;
			return {
				...state,
				boards: fetchedBoards,
				sections: fetchedSections,
				cards: fetchedCards,
				// boards: state.boards.length > 0 ? [...state.boards, ...fetchedBoards] : fetchedBoards,
				// sections:
				// 	state.sections.length > 0 ? [...state.sections, ...fetchedSections] : fetchedSections,
				// cards: state.cards.length > 0 ? [...state.cards, ...fetchedCards] : fetchedCards,
			};

		default:
			return state;
	}
}
