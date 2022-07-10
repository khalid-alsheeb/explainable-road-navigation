import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    isBorder: true,
    edges: [],
    desiredPath: [],
    desiredPathNodes: []
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;