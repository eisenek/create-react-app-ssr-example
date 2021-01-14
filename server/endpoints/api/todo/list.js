

/**
 * Handles list todo request
 * @property {Server} server Server instance
 * @property {Request} req request object
 * @property {Response} res response object
 * @returns {Promise<Object|String>}
 */
export default async function todoListHandler(server) {
    try {
        const models = await server.db.models();
        return { code: 200, data: await models.Todo.findAll() };
    } catch (err) {
        return { code: err.code, message: err.message };
    }
}


