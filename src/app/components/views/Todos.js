import { Box, colors, Typography } from '@material-ui/core';
import React from 'react';

export default function Todos() {
    return (
        <Box width={2 / 3} style={{ backgroundColor: colors.red[500] }}><Typography variant='caption'>Todos</Typography></Box>
    );
}
