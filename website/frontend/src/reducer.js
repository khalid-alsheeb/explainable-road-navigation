import { FETCH_DATA, ADD_TO_PLOT, REMOVE_TO_PLOT } from "./constants";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload
        // case ADD_TO_PLOT:
        //     return { ...state, toPlot: [...action.payload] }
        // case REMOVE_TO_PLOT:
        //     return { ...state, toPlot: [...action.payload] }
        default:
            return state;
    }
}

export default Reducer;