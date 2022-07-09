import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_TO_PLOT, ADD_TO_PLOT, REMOVE_FROM_DESIRED_PATH } from "./constants";
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
            let lastNodes = desiredPath[desiredPath.length - 1]['nodes']
            let newNodes = edge['nodes']
            var i = 0
            while ( i < newNodes.length && desiredPath.length === 1) {
                if (lastNodes.includes(newNodes[i])) {
                    desiredPath.push(edge)    
                }
                i++
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




export const addToPlot = (name) => async (dispatch, getState) => {
    try {

        const state = getState()

        const points = state.points
        const toPlot = state.toPlot

        for (var i=0; i < points.length; i++) {
            if(points[i][name] !== 'undefined')
                toPlot[i][name] = points[i][name]
        }

        dispatch({ type: ADD_TO_PLOT, payload: toPlot });
    } catch (error) {
        console.log(error.message);
    }
};


export const removeToPlot = (name) => async (dispatch, getState) => {
    try {

        const state = getState()

        let toPlot = state.toPlot

        for (var i=0; i < toPlot.length; i++) {
            if(toPlot[i][name] !== 'undefined')
                delete toPlot[i][name]
        }

        dispatch({ type: REMOVE_TO_PLOT, payload: toPlot });
    } catch (error) {
        console.log(error.message);
    }
};