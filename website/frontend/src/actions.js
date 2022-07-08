import { FETCH_DATA, ADD_TO_PLOT, REMOVE_TO_PLOT } from "./constants";
import axios from 'axios';
import * as qs from 'qs'


export const getData = (params) => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/denoise/", {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        })

        dispatch({ type: FETCH_DATA, payload: data });
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