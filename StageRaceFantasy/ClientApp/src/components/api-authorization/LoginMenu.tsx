import React, { Component } from 'react';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import AppNavBarButton from '../AppNavBar/AppNavBarButton';

type LoginMenuState = {
    isAuthenticated: boolean,
    userName: string | null,
}

export class LoginMenu extends Component<{}, LoginMenuState> {
    private _subscription = -1;

    constructor(props: {}) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.setState({
            isAuthenticated,
            userName: (user && user.name) || null,
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName: string | null, profilePath: string, logoutPath: any) {
        return (
            <>
                <AppNavBarButton linkPath={profilePath}>Hello {userName}</AppNavBarButton>
                <AppNavBarButton linkPath={logoutPath}>Logout</AppNavBarButton>
            </>
        );
    }

    anonymousView(registerPath: string, loginPath: string) {
        return (
            <>
                <AppNavBarButton linkPath={registerPath}>Register</AppNavBarButton>
                <AppNavBarButton linkPath={loginPath}>Login</AppNavBarButton>
            </>
        );
    }
}
