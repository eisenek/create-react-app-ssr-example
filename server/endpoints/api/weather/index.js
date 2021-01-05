import getWeather from './get.js';

export default function registerWeather(path, server) {
    server.registerHandler('get', path, getWeather);
}
