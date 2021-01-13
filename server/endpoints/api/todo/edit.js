import AppException from '../../../exceptions/AppException.js';

export default async function editHandler(server, request) {
    try {

    } catch (error) {
        AppException.fromError(error).reject();
    }
}
