import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ViewFantasyPage from './pages/ViewRacesPage';
import CreateRacePage from './pages/CreateRacePage';
import EditRacePage from './pages/EditRacePage';
import HomePage from './pages/HomePage';
import CreateFantasyTeamPage from './pages/CreateFantasyTeamPage';
import ViewRacePage from './pages/ViewRacePage';
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
    races: '/races',
    createRace: '/races/create',
    viewRace: (id: number|string) => `/races/${id}`,
    editRace: (id: number|string) => `/races/${id}/edit`,
    createFantasyTeam: (id: number|string) => `/races/${id}/fantasy-teams/create`,
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
            <AuthorizeRoute exact path={appPaths.races} component={ViewFantasyPage} />
            <AuthorizeRoute path={appPaths.createRace} component={CreateRacePage} />
            <AuthorizeRoute exact path={appPaths.viewRace(':raceId')} component={ViewRacePage} />
            <AuthorizeRoute path={appPaths.editRace(':raceId')} component={EditRacePage} />
            <AuthorizeRoute path={appPaths.createFantasyTeam(':raceId')} component={CreateFantasyTeamPage} />
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

export const useRaceId = () => {
    const { raceId } = useParams<{ raceId: string }>();
    return parseInt(raceId);
};

export const useFantasyTeamId = () => {
    const { fantasyTeamId } = useParams<{ fantasyTeamId: string }>();
    return parseInt(fantasyTeamId);
};

export default Routes;