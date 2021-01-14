import AppException from '../../../exceptions/AppException.js';

const FORBIDDEN_KEYS = ['id', 'uuid', 'createdAt', 'updatedAt'];

export default async function editHandler(server, request) {
    const { uuid } = request.params;
    if (!uuid) {
        return { code: 400, message: 'Bad request' };
    }

    const { data } = request.body;

    try {
        const todo = (await server.db.models()).Todo;
        const toChange = await todo.findOne({ where: { uuid } });
        if (!toChange) {
            return { code: 404, message: 'Todo not found' };
        }

        const allowedChanges = Object.fromEntries(Object.entries(data).filter(([key]) => !FORBIDDEN_KEYS.includes(key)));
        await toChange.update(allowedChanges);
        await todo.sync();
        return { code: 204 };
    } catch (error) {
        server.log.error(error);
        AppException.fromError(error).reject();
    }
}
