import React from 'react';
import { Box, makeStyles, styled } from '@material-ui/core';

export default styled(Box)(({ theme }) => ({
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
    '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
    },
}));
