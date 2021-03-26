import { combineReducers } from 'redux';
import dragDropReducer from './dragdrop/reducer';

export default combineReducers({
	board: dragDropReducer,
});
