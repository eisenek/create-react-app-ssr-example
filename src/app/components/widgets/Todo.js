import { Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import classNames from 'classnames';
import { once } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
    heading: theme.typography.h6,
    cardlike: { boxShadow: theme.shadows[5], borderRadius: theme.shape.borderRadius },
    spacedOut: { margin: theme.spacing(2) },
    spacedIn: { padding: theme.spacing(2) },
    toRight: { marginLeft: 'auto', marginRight: 0 }
}));

const TodoBar = ({ saveable, closeHandler }) => (
    <Box width={'100%'} display="flex" flexDirection="row" justifyContent="space-between">
        {saveable && <IconButton color="secondary" disabled={!saveable}>
            <Check/>
        </IconButton>}
        <IconButton className={useStyles().toRight} color="secondary" onClick={closeHandler}>
            <Close />
        </IconButton>
    </Box>
);

const TodoTitle = ({ title = '', update = () => void 0 }) => (
    <Box my={2} width={1 / 1}>
        <TextField placeholder="Title" value={title} onChange={({ target }) => update('title', target.value)} InputProps={{
            classes: {
                input: useStyles().heading,
            },
        }} fullWidth/>
    </Box>
);

const TodoDescription = ({ description = '', update = () => void 0 }) => <Box my={2} width={1 / 1}><TextField placeholder="Description" value={description} onChange={({ target }) => update('description', target.value)} rowsMax={6} multiline fullWidth/></Box>;

export default function Todo({ content = { title: '', description: '', priority: 0 }, onClose }) {
    const classes = useStyles();
    const [todo, setTodo] = React.useState({ ...content, update: (key, value) => setTodo(prevState => ({ ...prevState, [key]: value })) });
    const [changed, setChanged] = React.useState(false);

    React.useEffect(() => {
        const changedTodoEntries = Object.entries(todo)
            .filter(([key, value]) => key !== 'update' && content[key] !== value)
            .map(([key, val]) => [key, val && val]);
        if (changedTodoEntries.length) {
            setChanged(true);
        } else {
            // eslint-disable-next-line no-unused-expressions
            changed !== false && setChanged(false);
        }
    }, [todo, changed, content]);

    return (
        <Box className={classNames([classes.spacedIn, classes.cardlike])} display="flex" flex={1} flexDirection="column" component="form">
            <TodoBar saveable={changed} closeHandler={once(onClose)} />
            <TodoTitle {...todo} />
            <TodoDescription {...todo} />
        </Box>
    );
}

Todo.propTypes = {
    content: PropTypes.object,
    onClose: PropTypes.func
};

TodoBar.propTypes = {
    closeHandler: PropTypes.func
};

TodoTitle.propTypes = {
    title: PropTypes.string,
    update: PropTypes.func,
};

TodoDescription.propTypes = {
    description: PropTypes.string,
    update: PropTypes.func
};
