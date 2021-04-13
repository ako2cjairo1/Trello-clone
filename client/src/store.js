import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

// gather middlewares
const middlewares = [thunk];
// HOC enhancer for redux dev tools
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// encapsulate middlewares in redux devtool HOC
const storeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
// create store
const store = createStore(rootReducer, storeEnhancer);
// wrapper component of redux store
export default function ReduxStoreProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}
