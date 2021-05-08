import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import CreateFantasyStageRacePage from './pages/CreateFantasyStageRacePage';
import HomePage from './pages/HomePage';
import ViewFantasyStageRacesPage from './pages/ViewFantasyStageRacesPage';

export const appPaths = {
    home: '/',
    fantasyStageRaces: '/fantasy-stage-races',
    createFantasyStageRace: '/fantasy-stage-races/create',
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute exact path={appPaths.fantasyStageRaces} component={ViewFantasyStageRacesPage} />
            <AuthorizeRoute path={appPaths.createFantasyStageRace} component={CreateFantasyStageRacePage} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to={appPaths.home} />
        </Switch>
    );
};

export default Routes;