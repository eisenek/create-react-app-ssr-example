
import status from './status.js';
import todosRegister from './todo/index.js';
import weatherRegister from './weather/index.js';

/**
 * Registers API request handlers
 * @param {String} path current url path
 * @param {Server} server server instance
 */
export default function registerApi(path, server) {
    // register underlaying paths first
    todosRegister(`${path}/todo`, server);
    weatherRegister(`${path}/weather`, server);

    server.registerHandler('get', `${path}/status`, status);
}

