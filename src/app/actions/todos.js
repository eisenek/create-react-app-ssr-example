import { todoService } from '../services.js';
import { TODOS_LOADED } from './types.js';

export const listTodos = () => async (dispatch) => {
    try {
        const { data } = (await todoService.get('/list')).data;
        dispatch({ type: TODOS_LOADED, payload: data });
    } catch (error) {
        dispatch({ type: TODOS_LOADED, payload: [] });
    }
};

export const createTodo = todo => async (dispatch) => {
    try {
        await todoService.post('/create', { data: todo });
        setTimeout(() => dispatch(listTodos()));
    } catch (error) {
        return null;
    }
};

export const editTodo = todo => async (dispatch) => {
    try {
        await todoService.patch(`/edit/${todo.uuid}`, { data: todo });
        setTimeout(() => dispatch(listTodos()));
    } catch (error) {
        return null;
    }
};

export const deleteTodo = uuid => async (dispatch) => {
    try {
        await todoService.delete(`/delete/${uuid}`);
        setTimeout(() => dispatch(listTodos()));
    } catch (error) {
        return null;
    }
};
