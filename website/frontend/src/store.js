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
    shortestPathNodes: [],
    explanations: [],
    variables: ['speed', 'maxSpeed', 'noWay and isClosed'],
    markers: [],
    version: 1,
    inputType: 0,
    finishedExplanations: false,
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;