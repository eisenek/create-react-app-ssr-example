import { Box, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTodos } from '../../actions/todos.js';
import Todo from '../widgets/Todo.js';

const useStyles = makeStyles(theme => ({
    spaced: { padding: theme.spacing(2) },
    floating: { margin: theme.spacing(2), top: 'auto', bottom: 20, left: 'auto', right: 20, position: 'fixed' }
}));

function getTodo(todoObject = {}) {
    return { title: todoObject.title || '', description: todoObject.description || '', priority: todoObject.priority || 0 };
}

export default function Todos() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { todos } = useSelector(state => state);
    const [newTodo, setNewTodo] = React.useState(false);

    React.useEffect(() => {
        dispatch(listTodos());
    }, [todos, dispatch]);

    return (
        <Box className={classes.spaced} width={2 / 3}>
            {todos && todos.length > 0 && todos.map(todo => <Todo key={todos.uuid} content={getTodo(todo)} />)}
            {newTodo && <Todo content={getTodo()} onClose={() => setNewTodo(false)} />}
            <Fab className={classes.floating} color="primary" aria-label="add" onClick={() => setNewTodo(true)} disabled={newTodo}><AddIcon /></Fab>
        </Box>
    );
}


