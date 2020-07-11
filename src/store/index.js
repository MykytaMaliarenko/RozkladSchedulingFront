import { applyMiddleware, compose, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from './reducers';


export const history = createBrowserHistory();

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk));
    } else {
        // Enable additional logging in non-production environments.
        return composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, createLogger()))
    }
};

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        getMiddleware(),
    )

    return store
}