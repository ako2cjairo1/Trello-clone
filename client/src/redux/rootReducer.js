import { combineReducers } from 'redux';
import { trelloReducer } from './dragdrop';

export default combineReducers({
	trello: trelloReducer,
});
