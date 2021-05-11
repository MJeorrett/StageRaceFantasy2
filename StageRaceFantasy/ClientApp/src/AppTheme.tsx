import React from 'react';
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    ThemeProvider,
    CssBaseline
} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#005596',
        },
        secondary: {
            main: '#1e90ff',
        },
        background: {
            default: '#ffffff',
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