import AppException from '../../../exceptions/AppException.js';

/**
 * Handles create todo request
 * @property {Server} server Server instance
 * @property {Request} req request object
 * @property {Response} res response object
 * @returns {Promise<Object|String>}
 */

export default async function deleteHandler(server, request) {
    const { uuid } = request.params;
    if (!uuid) {
        return { code: 400, message: 'Bad request' };
    }

    try {
        const todo = (await server.db.models()).Todo;
        const toDelete = todo.findOne({ where: { uuid } });
        if (!toDelete) {
            return { code: 404, message: 'Todo not found' };
        }
        todo.destroy({ where: { uuid } });
        todo.sync();
        return { code: 204 };
    } catch (error) {
        server.log.error(error);
        AppException.fromError(error).reject();
    }
}
