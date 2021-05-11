import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppNavBar from './components/AppNavBar';
import Routes from './Routes';
import './App.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppTheme from './AppTheme';

const useStyles = makeStyles({
    root: {
        padding: '24px',
    }
});

const App = () => {
    const classNames = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppTheme>
                <ToastContainer />
                <AppNavBar />
                <div className={classNames.root}>
                    <Routes />
                </div>
            </AppTheme>
        </MuiPickersUtilsProvider>
    );
};

export default App;
