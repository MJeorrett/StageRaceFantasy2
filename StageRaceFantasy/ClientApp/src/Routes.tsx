import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ViewFantasyRacesPage from './pages/ViewFantasyRacesPage';
import CreateFantasyRacePage from './pages/CreateFantasyRacePage';
import EditFantasyRacePage from './pages/EditFantasyRacePage';
import HomePage from './pages/HomePage';
import CreateFantasyRaceTeamPage from './pages/CreateFantasyRaceTeamPage';
import ViewFantasyRacePage from './pages/ViewFantasyRacePage';
import ViewRidersPage from './pages/ViewRidersPage';
import CreateRiderPage from './pages/CreateRiderPage';
import ViewRiderPage from './pages/ViewRiderPage';

export const appPaths = {
    home: '/',
    riders: '/riders',
    createRider: '/riders/create',
    viewRider: (id: number|string) => `/riders/${id}`,
    fantasyRaces: '/fantasy-races',
    createFantasyRace: '/fantasy-races/create',
    viewFantasyRace: (id: number|string) => `/fantasy-races/${id}`,
    editFantasyRace: (id: number|string) => `/fantasy-races/${id}/edit`,
    createFantasyRaceTeam: (id: number|string) => `/fantasy-races/${id}/fantasy-teams/create`,
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute exact path={appPaths.createRider} component={CreateRiderPage} />
            <AuthorizeRoute exact path={appPaths.riders} component={ViewRidersPage} />
            <AuthorizeRoute exact path={appPaths.viewRider(':riderId')} component={ViewRiderPage} />
            <AuthorizeRoute exact path={appPaths.fantasyRaces} component={ViewFantasyRacesPage} />
            <AuthorizeRoute path={appPaths.createFantasyRace} component={CreateFantasyRacePage} />
            <AuthorizeRoute exact path={appPaths.viewFantasyRace(':fantasyRaceId')} component={ViewFantasyRacePage} />
            <AuthorizeRoute path={appPaths.editFantasyRace(':fantasyRaceId')} component={EditFantasyRacePage} />
            <AuthorizeRoute path={appPaths.createFantasyRaceTeam(':fantasyRaceId')} component={CreateFantasyRaceTeamPage} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to={appPaths.home} />
        </Switch>
    );
};

export const useRiderId = () => {
    const { riderId } = useParams<{ riderId: string }>();
    return parseInt(riderId);
};

export const useFantasyRaceId = () => {
    const { fantasyRaceId } = useParams<{ fantasyRaceId: string }>();
    return parseInt(fantasyRaceId);
};

export default Routes;