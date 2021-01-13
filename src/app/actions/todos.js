import { todoService } from '../services';
import { TODOS_LOADED } from './types';

export const listTodos = () => async (dispatch) => {
    try {
        const { data } = (await todoService.get('/list')).data;
        dispatch({ type: TODOS_LOADED, payload: { data } });
    } catch (error) {
        dispatch({ type: TODOS_LOADED, payload: [] });
    }
};

export const createTodo = todo => async (dispatch) => {
    try {
        await todoService.post('/create', { data: todo });
        dispatch(listTodos());
    } catch (error) {}
};
