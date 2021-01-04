
import { Box } from '@material-ui/core';
import 'fontsource-roboto';
import React from 'react';
import './App.css';
import Todos from './app/components/views/Todos.js';
import Weather from './app/components/views/Weather.js';

function App() {
    return (
        <Box display="flex">
            <Weather />
            <Todos />
        </Box>
    );
}

export default App;
