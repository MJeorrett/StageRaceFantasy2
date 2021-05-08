import React from 'react';
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    ThemeProvider,
    CssBaseline
} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#367bfc',
        },
        secondary: {
            main: '#ebf2ff',
        },
        background: {
            default: '#FFFFFF',
        },
        text: {
            primary: '#1a283d'
        }
    }
});

const AppTheme: React.FC = ({
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;