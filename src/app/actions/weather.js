import { weatherService } from '../services.js';
import { WEATHER_LOADED } from './types.js';

export default function getWeather(latitude, longitude) {
    return async (dispatch) => {
        try {
            const { data } = (await weatherService.get('/', { params: { latitude, longitude } })).data;
            dispatch({ type: WEATHER_LOADED, payload: data });
        } catch (error) {
            dispatch({ type: WEATHER_LOADED, payload: [] });
        }
    };
}
