import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_FROM_DESIRED_PATH, REVERSE_DESIRED_PATH, ADD_TO_NODE_PATH_EDGES, REMOVE_NODE_FROM_DESIRED_PATH } from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, edges: [...action.payload] }
        case ADD_TO_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case REMOVE_FROM_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case ADD_TO_NODE_PATH_EDGES:
            return { ...state, desiredPathNodes: [...action.payload]}
        case REMOVE_NODE_FROM_DESIRED_PATH:
            return { ...state, desiredPathNodes: [...action.payload]}
        case REVERSE_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload[0]], desiredPathNodes: [...action.payload[1]]}
        default:
            return state;
    }
}

export default Reducer;