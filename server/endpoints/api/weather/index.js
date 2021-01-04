import axios from 'axios';
import AppException from '../../../exceptions/AppException.js';

const getWeather = async (server, request, response) => {
    const weatherServiceUrl = server.config.get('openWeatherApi.baseUrl');
    const appid = server.config.get('openWeatherApi.apiKey');
    const units = server.config.get('openWeatherApi.units');
    const { latitude, longitude } = request.query;

    if (!latitude || !longitude) {
        return response.status(400).json({ message: 'Bad request' });
    }

    try {
        const { data } = await axios.get(weatherServiceUrl, { params: { lat: latitude, lon: longitude, units, appid, mode: 'json' } });
        return response.json([...data.weather.map(record => ({ ...record, icon: `https://openweathermap.org/img/wn/${record.icon}@2x.png`, ...data.main, wind: data.wind, location: data.name }))]);
    } catch (error) {
        return error.isAxiosError ? error.response.data : AppException.fromError(error).reject();
    }
};

export default function registerWeather(path, server) {
    server.registerHandler('get', path, getWeather);
}
