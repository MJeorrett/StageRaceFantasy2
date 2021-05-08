import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavMenu } from './components/NavMenu';
import Routes from './Routes';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <ToastContainer />
                <NavMenu />
                <Routes />
            </>
        );
    }
}
