
import AppException from '../../../exceptions/AppException.js';

/**
 * Handles create todo request
 * @property {Server} server Server instance
 * @property {Request} req request object
 * @property {Response} res response object
 * @returns {Promise<Object|String>}
 */
export default async function todoCreateHandler({ db }, { body }) {
    try {
        const todoModel = (await db.models()).Todo;
        todoModel.create(body);
        return { code: 200, message: 'TODO created' };
    } catch (err) {
        return AppException.rejectFromError(err);
    }
}


