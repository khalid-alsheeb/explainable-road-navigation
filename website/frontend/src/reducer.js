import {
    ADD_TO_DESIRED_PATH, REMOVE_FROM_DESIRED_PATH,
    REVERSE_DESIRED_PATH, ADD_TO_NODE_PATH_EDGES,
    REMOVE_NODE_FROM_DESIRED_PATH, ADD_REMOVE_BORDER, GET_RESULTS_V1,
    GET_RESULTS_V2, GET_RESULTS_V3,
    RESET_DATA, CHANGE_VERSION, UPDATE_DESIRED_PATH,
    UPDATE_VARIABLES
} from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case GET_RESULTS_V1:
            return { ...state, shortestPath: [...action.payload[0]], explanations: [...action.payload[1]] }

        case GET_RESULTS_V2:
            return { ...state, desiredPath: [...action.payload[0]], shortestPath: [...action.payload[1]], explanations: [...action.payload[2]] }

        case GET_RESULTS_V3:
            return { ...state, desiredPath: [...action.payload[0]], shortestPath: [...action.payload[1]], explanations: [...action.payload[2]] }

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

        case UPDATE_DESIRED_PATH:
            return { ...state, desiredPathNodes: [...action.payload] }

        case UPDATE_VARIABLES:
            return { ...state, variables: action.payload }
        case RESET_DATA:
            return { 
                ...state,
                edges: [],
                desiredPath: [],
                shortestPath: [],
                explanations: []
            }

        default:
            return state;
    }
}

export default Reducer;