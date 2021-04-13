import { trelloInitState } from '../initialState';
import { ActionType } from './actions';
import { fnSortByIndex } from '../../utils';

export function trelloReducer(trello = trelloInitState, action) {
	switch (action.type) {
		case ActionType.UPDATE_CURRENT_BOARD:
			const selectedBoard = action.payload;
			const selectedBoardsUpdate = trello.boards.map((board) => {
				if (board.id === selectedBoard.id) {
					// set the selected board
					return { ...board, index: 1 };
				}
				// unset all other boards
				return { ...board, index: 0 };
			});
			return {
				...trello,
				boards: fnSortByIndex(selectedBoardsUpdate),
			};

		case ActionType.ADD_BOARD:
			const addedBoard = action.payload;
			return {
				...trello,
				boards: [...trello.boards, ...addedBoard],
			};

		case ActionType.UPDATE_BOARD:
			const updatedBoard = action.payload;
			// make a copy of boards and replace with updated copy of board record
			// to maintain the record index in array.
			const boardUpdates = trello.boards.map((board) => {
				if (board.id === updatedBoard.id) {
					return updatedBoard;
				}
				return board;
			});
			return {
				...trello,
				boards: fnSortByIndex(boardUpdates),
			};

		case ActionType.CLOSE_BOARD:
			const {
				boards: remainingBoards,
				sections: remainingSections,
				cards: remainingCards,
			} = action.payload;

			return {
				...trello,
				boards: remainingBoards,
				sections: remainingSections,
				cards: remainingCards,
			};

		case ActionType.ADD_SECTION:
			const addedSection = action.payload;
			return {
				...trello,
				sections: fnSortByIndex([...trello.sections, ...addedSection]),
			};

		case ActionType.UPDATE_SECTION:
			const updatedSection = action.payload;
			// make a copy of sections and replace with updated copy of section record
			// to maintain the record index in array.
			const sectionUpdates = trello.sections.map((section) => {
				if (section.id === updatedSection.id) {
					return updatedSection;
				}
				return section;
			});
			return {
				...trello,
				sections: fnSortByIndex(sectionUpdates),
			};

		case ActionType.ADD_CARD:
			const addedCard = action.payload;
			return {
				...trello,
				cards: fnSortByIndex([...trello.cards, ...addedCard]),
			};

		// Update and Move card both use the same operation
		// just different action names
		case ActionType.UPDATE_CARD:
		case ActionType.MOVE_CARD:
			const updatedCard = action.payload;
			// make a copy of cards and replace with updated copy of card record
			// to maintain the record index in array.
			const updatedCards = trello.cards.map((card) => {
				if (card.id === updatedCard.id) {
					return updatedCard;
				}
				return card;
			});
			return {
				...trello,
				cards: fnSortByIndex(updatedCards),
			};

		case ActionType.DELETE_CARD:
			const deletedCard = action.payload;
			return {
				...trello,
				cards: trello.cards.filter((card) => card.id !== deletedCard.id),
			};
		case ActionType.IS_LOADING:
			return {
				...trello,
				isLoading: action.isLoading,
			};

		case ActionType.UPDATE_ERROR:
			return {
				...trello,
				error: action.error,
			};

		case ActionType.FETCH_BOARDS:
			const {
				boards: fetchedBoards,
				sections: fetchedSections,
				cards: fetchedCards,
			} = action.payload;
			return {
				...trello,
				boards: fetchedBoards,
				sections: fetchedSections,
				cards: fetchedCards,
			};

		default:
			return trello;
	}
}
