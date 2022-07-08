import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_TO_PLOT } from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, edges: [...action.payload] }
        case ADD_TO_DESIRED_PATH:
            return { ...state, desiredPath: [...action.payload] }
        // case REMOVE_TO_PLOT:
        //     return { ...state, toPlot: [...action.payload] }
        default:
            return state;
    }
}

export default Reducer;