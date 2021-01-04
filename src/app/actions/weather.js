import { weatherService } from '../services.js';
import { WEATHER_LOADED } from './types.js';

export default function getWeather(latitude, longitude) {
    return async (dispatch) => {
        try {
            const { data } = await weatherService.get('/', { params: { latitude, longitude } });
            dispatch({ type: WEATHER_LOADED, payload: data });
            console.log(WEATHER_LOADED, 'dispatched');
        } catch (error) { return null; }
    };
}
