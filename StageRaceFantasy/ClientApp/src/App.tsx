import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import AppNavBar from './components/AppNavBar';
import Routes from './Routes';
import './App.css';
import { makeStyles } from '@material-ui/core';

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
