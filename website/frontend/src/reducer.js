import {
    ADD_TO_DESIRED_PATH, REMOVE_FROM_DESIRED_PATH,
    REVERSE_DESIRED_PATH, ADD_TO_NODE_PATH_EDGES,
    REMOVE_NODE_FROM_DESIRED_PATH, ADD_REMOVE_BORDER, GET_EXPLANATIONS,
    RESET_DATA, CHANGE_VERSION
} from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case GET_EXPLANATIONS:
            return { ...state, shortestPath: [...action.payload[0]], explanations: [...action.payload[1]] }
        case ADD_TO_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case REMOVE_FROM_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        case ADD_TO_NODE_PATH_EDGES:
            return { ...state, desiredPathNodes: [...action.payload] }
        case REMOVE_NODE_FROM_DESIRED_PATH:
            return { ...state, desiredPathNodes: [...action.payload] }
        case REVERSE_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload[0]], desiredPathNodes: [...action.payload[1]] }
        case ADD_REMOVE_BORDER:
            return { ...state, isBorder: action.payload }
        case CHANGE_VERSION:
            return { ...state, version: action.payload }
        case RESET_DATA:
            return { 
                ...state,
                edges: [],
                desiredPath: [],
                desiredPathNodes: [],
                shortestPath: [],
                explanations: []
            }
        default:
            return state;
    }
}

export default Reducer;