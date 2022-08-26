import {
        ADD_TO_DESIRED_PATH, REMOVE_FROM_DESIRED_PATH,
        ADD_TO_NODE_PATH_EDGES, REMOVE_NODE_FROM_DESIRED_PATH,
        REVERSE_DESIRED_PATH, ADD_REMOVE_BORDER, GET_RESULTS_V1,
        GET_RESULTS_V2, GET_RESULTS_V3,
        RESET_DATA, CHANGE_VERSION, UPDATE_DESIRED_PATH,
        UPDATE_VARIABLES, UPDATE_MARKERS, GET_SHORTEST_PATH,
        CHANGE_INPUT_TYPE, RESET_PARTIAL_DATA
} from "./constants";
import axios from 'axios';
import * as qs from 'qs'
import { getPathFormat, getCorrectNodes } from './helperFunctions'

axios.defaults.baseURL = 'http://localhost:5000';

export const calculateSP = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const nodesp = state.markers
        const nodes = getCorrectNodes(nodesp)

        const { data } = await axios.get("/sp/", {
            params: {
                nodes: nodes,
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        })

        const shortestPathNodes = data['shortest_path']
        const shortestPath = getPathFormat(shortestPathNodes)

        dispatch({ type: GET_SHORTEST_PATH, payload: shortestPath });
    } catch (error) {
        console.log(error.message);
    }
}

export const getExplanations = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const version = state.version
        
        if(version === 1) {
            dispatch(getResultsV1())
        } else if(version === 2) {
            dispatch(getResultsV2())
        } else if(version === 3) {
            dispatch(getResultsV3())
        }

    } catch (error) {
        console.log(error.message);
    }
};

export const getResultsV1 = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const desiredPath = state.desiredPathNodes
        const variablesToUse = state.variables

        const { data } = await axios.get("/1/", {
            params: {
                desired_path: desiredPath,
                variablesToUse: variablesToUse
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        })

        const shortestPathNodes = data['shortest_path']
        const explanations = data['explanations']

        const shortestPath = getPathFormat(shortestPathNodes)

        dispatch({ type: GET_RESULTS_V1, payload: [ shortestPath, explanations ] });
    } catch (error) {
        console.log(error.message);
    }
};


export const getResultsV2 = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const nodesp = state.markers
        const nodes = getCorrectNodes(nodesp)
        const variablesToUse = state.variables

        const { data } = await axios.get("/2/", {
            params: {
                nodes: nodes,
                variablesToUse: variablesToUse
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        })

        const shortestPathNodes = data['shortest_path']
        const desiredPathNodes = data['desired_path']
        const explanations = data['explanations']

        const shortestPath = getPathFormat(shortestPathNodes)
        const desiredPath = getPathFormat(desiredPathNodes)

        dispatch({ type: GET_RESULTS_V2, payload: [ desiredPath, shortestPath, explanations ] });
    } catch (error) {
        console.log(error.message);
    }
};


export const getResultsV3 = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const nodesp = state.markers
        const nodes = getCorrectNodes(nodesp)
        const variablesToUse = state.variables

        const { data } = await axios.get("/3/", {
            params: {
                nodes: nodes,
                variablesToUse: variablesToUse
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        })

        const shortestPathNodes = data['shortest_path']
        const desiredPathNodes = data['desired_path']
        const explanations = data['explanations']

        const shortestPath = getPathFormat(shortestPathNodes)
        const desiredPath = getPathFormat(desiredPathNodes)

        dispatch({ type: GET_RESULTS_V3, payload: [ desiredPath, shortestPath, explanations ] });
    } catch (error) {
        console.log(error.message);
    }
};


export const addToDesiredPath = (edge) => async (dispatch, getState) => {
    try {
        const state = getState()
        let desiredPath = state.desiredPath
        let desiredPathNodes = state.desiredPathNodes
        const shortestPath = state.shortestPath

        if (!(desiredPathNodes[desiredPathNodes.length - 1] === shortestPath[shortestPath.length - 1]['nodes'][1])) {
            if (desiredPath.length > 1) {
                let secondLastNodes = desiredPath[desiredPath.length - 2]['nodes']
                let lastNodes = desiredPath[desiredPath.length - 1]['nodes']
                let newNodes = edge['nodes']
                let notCurrentNode = 0
                for (var i = 0; i < secondLastNodes.length; i++) {
                    for (var j = 0; j < lastNodes.length; j++) {
                        if (secondLastNodes[i] === lastNodes[j]) {
                            notCurrentNode = lastNodes[j]
                        }
                    }
                }
                lastNodes = lastNodes.filter(item => item !== notCurrentNode)
                let currentNode = lastNodes[0]
    
                console.log(currentNode, newNodes[0], newNodes[1]);
                if(newNodes.includes(currentNode)) {
                    desiredPath.push(edge)
                }
            }  else {
                let lastNode = desiredPathNodes[desiredPathNodes.length - 1]
                let newNodes = edge['nodes']
                if (newNodes.includes(lastNode)) {
                    desiredPath.push(edge)
                }
            } 
        }

        dispatch({ type: ADD_TO_DESIRED_PATH, payload: desiredPath });
    } catch (error) {
        console.log(error.message);
    }
};


export const addNodeToDesiredPath = (edge) => async (dispatch, getState) => {
    try {

        const state = getState()
        let desiredPath = state.desiredPathNodes
        const shortestPath = state.shortestPath
        if (!(desiredPath[desiredPath.length - 1] === shortestPath[shortestPath.length - 1]['nodes'][1])) {
            if (desiredPath.length === 1) {
                if (desiredPath[0] === edge['nodes'][0]) {
                    desiredPath.push(edge['nodes'][1])
                } else if (desiredPath[0] === edge['nodes'][1]) {
                    desiredPath.push(edge['nodes'][0])
                }
            } else {
    
                const lastNode = desiredPath[desiredPath.length - 1]
                const newNodes = edge['nodes']
    
                if (newNodes[0] === lastNode) {
                    desiredPath.push(newNodes[1])    
                } else if (newNodes[1] === lastNode) {
                    desiredPath.push(newNodes[0])
                }
            }
        }

        dispatch({ type: ADD_TO_NODE_PATH_EDGES, payload: desiredPath });
    } catch (error) {
        console.log(error.message);
    }
};

export const removeFromDesiredPath = (edge) => async (dispatch, getState) => {
    try {

        const state = getState()
        let desiredPath = state.desiredPath
        if (desiredPath.includes(edge)) {
            // removes the edges after the one removed, too
            desiredPath.length = desiredPath.indexOf(edge)
        }

        dispatch({ type: REMOVE_FROM_DESIRED_PATH, payload: desiredPath });
    } catch (error) {
        console.log(error.message);
    }
};


export const removeNodeFromDesiredPath = (edge) => async (dispatch, getState) => {
    try {

        const state = getState()
        let desiredPath = state.desiredPath
        let desiredPathNodes = state.desiredPathNodes
        if (desiredPath.includes(edge)) {
            // removes the edges after the one removed, too
            const possibleNodes = edge['nodes']
            let node = 0
            if (desiredPathNodes.includes(possibleNodes[0])) {
                node = possibleNodes[0]
            } else {
                node = possibleNodes[1]
            }

            const len = desiredPathNodes.indexOf(node)
            console.log(len);
            if (len === 0) {
                desiredPathNodes.length = 1
            } else {
                desiredPathNodes.length = len
            }   
        }

        dispatch({ type: REMOVE_NODE_FROM_DESIRED_PATH, payload: desiredPathNodes });
    } catch (error) {
        console.log(error.message);
    }
};

export const flipDP = () => async (dispatch, getState) => {
    try {
        const state = getState()
        let desiredPath = state.desiredPath
        let desiredPathNodes = state.desiredPathNodes

        desiredPath = desiredPath.reverse()
        desiredPathNodes = desiredPathNodes.reverse()

        dispatch({ type: REVERSE_DESIRED_PATH, payload: [ desiredPath, desiredPathNodes ] });
    } catch (error) {
        console.log(error.message);
    }
}


export const changeBorder = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const isBorder = state.isBorder

        dispatch({ type: ADD_REMOVE_BORDER, payload: !isBorder });
    } catch (error) {
        console.log(error.message);
    }
}


export const resetData = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_DATA });
    } catch (error) {
        console.log(error.message);
    }
}

export const changeVersion = (version) => async (dispatch) => {
    try {
        dispatch(resetPartialData())
        dispatch({ type: CHANGE_VERSION, payload: version });
    } catch (error) {
        console.log(error.message);
    }
}

export const resetPartialData = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_PARTIAL_DATA });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateVariablesToUse = (variables) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VARIABLES, payload: variables });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateDP = (nodes) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DESIRED_PATH, payload: nodes });
    } catch (error) {
        console.log(error.message);
    }
}


export const updateMarkers = (markers) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_MARKERS, payload: markers });
    } catch (error) {
        console.log(error.message);
    }
}

export const changeInputType = (version) => async (dispatch) => {
    try {
        dispatch(resetPartialData())
        dispatch({ type: CHANGE_INPUT_TYPE, payload: version });
    } catch (error) {
        console.log(error.message);
    }
}