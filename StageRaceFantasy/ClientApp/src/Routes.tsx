import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ViewFantasyStageRacesPage from './pages/ViewFantasyStageRacesPage';
import CreateFantasyStageRacePage from './pages/CreateFantasyStageRacePage';
import EditFantasyStageRacePage from './pages/EditFantasyStageRacePage';
import HomePage from './pages/HomePage';

export const appPaths = {
    home: '/',
    fantasyStageRaces: '/fantasy-stage-races',
    createFantasyStageRace: '/fantasy-stage-races/create',
    editFantasyStageRace: (id: number|string) => `/fantasy-stage-races/${id}/edit`,
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path={appPaths.home} component={HomePage} />
            <AuthorizeRoute exact path={appPaths.fantasyStageRaces} component={ViewFantasyStageRacesPage} />
            <AuthorizeRoute path={appPaths.createFantasyStageRace} component={CreateFantasyStageRacePage} />
            <AuthorizeRoute path={appPaths.editFantasyStageRace(':fantasyStageRaceId')} component={EditFantasyStageRacePage} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to={appPaths.home} />
        </Switch>
    );
};

export const useFantasyStageRaceId = () => {
    const { fantasyStageRaceId } = useParams<{ fantasyStageRaceId: string }>();
    return parseInt(fantasyStageRaceId);
};

export default Routes;