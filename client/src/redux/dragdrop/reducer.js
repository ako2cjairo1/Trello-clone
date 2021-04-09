import { board } from '../initialState';
import { ActionType } from './actions';
import { fnSortByIndex } from '../../utils';

export function dragDropReducer(state = board, action) {
	switch (action.type) {
		case ActionType.UPDATE_CURRENT_BOARD:
			const selectedBoard = action.payload;
			const selectedBoardsUpdate = state.boards.map((board) => {
				if (board.id === selectedBoard.id) {
					// set the selected board
					return { ...board, index: 1 };
				}
				// unset all other boards
				return { ...board, index: 0 };
			});
			return {
				...state,
				boards: fnSortByIndex(selectedBoardsUpdate),
			};

		case ActionType.ADD_BOARD:
			const addedBoard = action.payload;
			return {
				...state,
				boards: [...state.boards, ...addedBoard],
			};

		case ActionType.UPDATE_BOARD:
			const updatedBoard = action.payload;
			// make a copy of boards and replace with updated copy of board record
			// to maintain the record index in array.
			const boardUpdates = state.boards.map((board) => {
				if (board.id === updatedBoard.id) {
					return updatedBoard;
				}
				return board;
			});
			return {
				...state,
				boards: fnSortByIndex(boardUpdates),
			};

		case ActionType.CLOSE_BOARD:
			const closedBoard = action.payload;
			return {
				...state,
				boards: state.boards.filter((board) => board.id !== closedBoard.id),
			};

		case ActionType.ADD_SECTION:
			const addedSection = action.payload;
			return {
				...state,
				sections: fnSortByIndex([...state.sections, ...addedSection]),
			};

		case ActionType.UPDATE_SECTION:
			const updatedSection = action.payload;
			// make a copy of sections and replace with updated copy of section record
			// to maintain the record index in array.
			const sectionUpdates = state.sections.map((section) => {
				if (section.id === updatedSection.id) {
					return updatedSection;
				}
				return section;
			});
			return {
				...state,
				sections: fnSortByIndex(sectionUpdates),
			};

		case ActionType.ADD_CARD:
			const addedCard = action.payload;
			return {
				...state,
				cards: fnSortByIndex([...state.cards, ...addedCard]),
			};

		// Update and Move card both use the same operation
		// just different action names
		case ActionType.UPDATE_CARD:
		case ActionType.MOVE_CARD:
			const updatedCard = action.payload;
			// make a copy of cards and replace with updated copy of card record
			// to maintain the record index in array.
			const updatedCards = state.cards.map((card) => {
				if (card.id === updatedCard.id) {
					return updatedCard;
				}
				return card;
			});
			return {
				...state,
				cards: fnSortByIndex(updatedCards),
			};

		case ActionType.DELETE_CARD:
			const deletedCard = action.payload;
			return {
				...state,
				cards: state.cards.filter((card) => card.id !== deletedCard.id),
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
				boards: fnSortByIndex(fetchedBoards),
				sections: fnSortByIndex(fetchedSections),
				cards: fnSortByIndex(fetchedCards),
			};

		default:
			return state;
	}
}
