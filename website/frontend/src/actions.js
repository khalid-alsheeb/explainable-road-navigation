import { FETCH_DATA, ADD_TO_DESIRED_PATH, REMOVE_TO_PLOT, ADD_TO_PLOT } from "./constants";
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

        const desiredPath = state.desiredPath

        desiredPath.push(edge)

        dispatch({ type: ADD_TO_DESIRED_PATH, payload: desiredPath });
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