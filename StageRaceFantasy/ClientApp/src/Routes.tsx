import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ViewFantasyRacesPage from './pages/ViewFantasyRacesPage';
import CreateFantasyRacePage from './pages/CreateFantasyRacePage';
import EditFantasyRacePage from './pages/EditFantasyRacePage';
import HomePage from './pages/HomePage';
import CreateFantasyTeamPage from './pages/CreateFantasyTeamPage';
import ViewFantasyRacePage from './pages/ViewFantasyRacePage';
import ViewRidersPage from './pages/ViewRidersPage';
import CreateRiderPage from './pages/CreateRiderPage';
import ViewRiderPage from './pages/ViewRiderPage';
import EditRiderPage from './pages/EditRiderPage';
import ViewFantasyTeamPage from './pages/ViewFantasyTeamPage';

export const appPaths = {
    home: '/',
    riders: '/riders',
    createRider: '/riders/create',
    editRider: (id: number|string) => `/riders/${id}/edit`,
    viewRider: (id: number|string) => `/riders/${id}`,
    fantasyRaces: '/fantasy-races',
    createFantasyRace: '/fantasy-races/create',
    viewFantasyRace: (id: number|string) => `/fantasy-races/${id}`,
    editFantasyRace: (id: number|string) => `/fantasy-races/${id}/edit`,
    createFantasyTeam: (id: number|string) => `/fantasy-races/${id}/fantasy-teams/create`,
    viewFantasyTeam: (id: number|string) => `/fantasy-teams/${id}`,
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute exact path={appPaths.createRider} component={CreateRiderPage} />
            <AuthorizeRoute exact path={appPaths.editRider(':riderId')} component={EditRiderPage} />
            <AuthorizeRoute exact path={appPaths.riders} component={ViewRidersPage} />
            <AuthorizeRoute exact path={appPaths.viewRider(':riderId')} component={ViewRiderPage} />
            <AuthorizeRoute exact path={appPaths.fantasyRaces} component={ViewFantasyRacesPage} />
            <AuthorizeRoute path={appPaths.createFantasyRace} component={CreateFantasyRacePage} />
            <AuthorizeRoute exact path={appPaths.viewFantasyRace(':fantasyRaceId')} component={ViewFantasyRacePage} />
            <AuthorizeRoute path={appPaths.editFantasyRace(':fantasyRaceId')} component={EditFantasyRacePage} />
            <AuthorizeRoute path={appPaths.createFantasyTeam(':fantasyRaceId')} component={CreateFantasyTeamPage} />
            <AuthorizeRoute path={appPaths.viewFantasyTeam(':fantasyTeamId')} component={ViewFantasyTeamPage} />
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

export const useFantasyTeamId = () => {
    const { fantasyTeamId } = useParams<{ fantasyTeamId: string }>();
    return parseInt(fantasyTeamId);
};

export default Routes;