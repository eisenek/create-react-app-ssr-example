
import AppException from '../../../exceptions/AppException.js';

/**
 * Handles create todo request
 * @property {Server} server Server instance
 * @property {Request} req request object
 * @property {Response} res response object
 * @returns {Promise<Object|String>}
 */
export default async function todoCreateHandler(server, request) {
    try {
        const todoModel = (await server.db.models()).Todo;
        todoModel.create(request.body.data);
        return { code: 200, message: 'TODO created' };
    } catch (err) {
        server.log.error(err);
        return AppException.rejectFromError(err);
    }
}


