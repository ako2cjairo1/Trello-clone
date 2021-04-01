import { combineReducers } from 'redux';
import { dragDropReducer } from './dragdrop';

export default combineReducers({
	board: dragDropReducer,
});
