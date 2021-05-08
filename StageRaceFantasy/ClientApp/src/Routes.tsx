import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <AuthorizeRoute path="/fetch-data" component={FetchData} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;