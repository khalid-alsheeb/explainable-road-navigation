import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_TO_PLOT, REMOVE_FROM_DESIRED_PATH, SWITCH_NODE, ADD_TO_NODE_PATH_EDGES } from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, edges: [...action.payload] }
        case ADD_TO_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case REMOVE_FROM_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case SWITCH_NODE:
            return { ...state, desiredPath: [...action.payload]}
        case ADD_TO_NODE_PATH_EDGES:
            return { ...state, desiredPathNodes: [...action.payload]}
        default:
            return state;
    }
}

export default Reducer;