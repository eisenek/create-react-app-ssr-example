import { Box } from '@material-ui/core';
// eslint-disable-next-line import/extensions
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';
import PropTypes from 'prop-types';
import React from 'react';
import './App.css';
import Todos from './app/components/views/Todos.js';
import Weather from './app/components/views/Weather.js';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#939597'
        },
        primary: {
            main: '#F5DF4D'
        }
    }
});

function Theme(props) {
    return (<MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>);
}

Theme.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

function App() {
    return (
        <Theme>
            <Box display="flex">
                <Weather />
                <Todos />
            </Box>
        </Theme>
    );
}

export default App;
