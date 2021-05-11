import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ViewFantasyRacesPage from './pages/ViewFantasyRacesPage';
import CreateFantasyRacePage from './pages/CreateFantasyRacePage';
import EditFantasyRacePage from './pages/EditFantasyRacePage';
import HomePage from './pages/HomePage';

export const appPaths = {
    home: '/',
    fantasyRaces: '/fantasy-races',
    createFantasyRace: '/fantasy-races/create',
    editFantasyRace: (id: number|string) => `/fantasy-races/${id}/edit`,
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute exact path={appPaths.fantasyRaces} component={ViewFantasyRacesPage} />
            <AuthorizeRoute path={appPaths.createFantasyRace} component={CreateFantasyRacePage} />
            <AuthorizeRoute path={appPaths.editFantasyRace(':fantasyRaceId')} component={EditFantasyRacePage} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to={appPaths.home} />
        </Switch>
    );
};

export const useFantasyRaceId = () => {
    const { fantasyRaceId } = useParams<{ fantasyRaceId: string }>();
    return parseInt(fantasyRaceId);
};

export default Routes;