import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    isBorder: false,
    edges: [],
    desiredPath: [],
    desiredPathNodes: [],
    shortestPath: [],
    explanations: [],
    variablesToUse: [],
    version: 1
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;