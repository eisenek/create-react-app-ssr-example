import { WEATHER_LOADED } from '../actions/types.js';

const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {
        case WEATHER_LOADED:
            console.log('set payload for weather loaded');
            return payload;
        default:
            return state;
    }
};
