import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppNavBar from './components/AppNavBar';
import Routes from './Routes';
import './App.css';

const useStyles = makeStyles({
    root: {
        padding: '24px',
    }
});

const App = () => {
    const classNames = useStyles();

    return (
        <>
            <ToastContainer />
            <AppNavBar />
            <div className={classNames.root}>
                <Routes />
            </div>
        </>
    );
};

export default App;
