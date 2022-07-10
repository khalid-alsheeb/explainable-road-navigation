import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_FROM_DESIRED_PATH, ADD_TO_NODE_PATH_EDGES, REMOVE_NODE_FROM_DESIRED_PATH, REVERSE_DESIRED_PATH } from "./constants";
import axios from 'axios';
import * as qs from 'qs'

axios.defaults.baseURL = 'http://localhost:5000';

export const getData = (params) => async (dispatch) => {
    try {
        const { data } = await axios.get("/")
            //, {
            //params: params,
            // paramsSerializer: params => {
            //     return qs.stringify(params, { arrayFormat: 'repeat' })
            // }
        //})

        const edges = data['edges']

        dispatch({ type: FETCH_DATA, payload: edges });
    } catch (error) {
        console.log(error.message);
    }
};


export const addToDesiredPath = (edge) => async (dispatch, getState) => {
    try {
        const state = getState()
        let desiredPath = state.desiredPath
        let desiredPathNodes = state.desiredPathNodes
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
        }  else if (desiredPath.length === 1) {
            let lastNode = desiredPathNodes[desiredPathNodes.length - 1]
            let newNodes = edge['nodes']
            if (newNodes.includes(lastNode)) {
                desiredPath.push(edge)
            }
        } else {
            desiredPath.push(edge)
        }

        dispatch({ type: ADD_TO_DESIRED_PATH, payload: desiredPath });
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


export const addNodeToDesiredPath = (edge) => async (dispatch, getState) => {
    try {

        const state = getState()
        let desiredPath = state.desiredPathNodes

        if (desiredPath.length === 0) {
            desiredPath.push(edge['nodes'][0])
            desiredPath.push(edge['nodes'][1])
        } else {

            const lastNode = desiredPath[desiredPath.length - 1]
            const newNodes = edge['nodes']

            if (newNodes[0] === lastNode) {
                desiredPath.push(newNodes[1])    
            } else if (newNodes[1] === lastNode) {
                desiredPath.push(newNodes[0])
            }
        }

        dispatch({ type: ADD_TO_NODE_PATH_EDGES, payload: desiredPath });
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

            if (len <= 2) {
                desiredPathNodes.length = 0
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
    console.log('aslkjhasdaskjdha');
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