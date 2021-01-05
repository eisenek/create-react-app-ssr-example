import { WEATHER_LOADED } from '../actions/types.js';

const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {
        case WEATHER_LOADED:
            return payload;
        default:
            return state;
    }
};
