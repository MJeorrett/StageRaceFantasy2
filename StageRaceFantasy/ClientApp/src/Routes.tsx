import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import HomePage from './pages/HomePage';
import FantasyStageRacesViewAllPage from './pages/FantasyStageRacesViewAllPage';

export const appPaths = {
    home: '/',
    fantasyStageRaces: '/fantasy-stage-races',
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute path={appPaths.fantasyStageRaces} component={FantasyStageRacesViewAllPage} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to={appPaths.home} />
        </Switch>
    );
};

export default Routes;