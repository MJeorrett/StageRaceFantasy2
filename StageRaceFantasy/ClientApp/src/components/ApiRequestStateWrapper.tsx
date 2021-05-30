import React from 'react';
import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';
import { UseApiRequestState } from '../api';

interface ApiRequestStateWrapperProps<T> {
    apiRequestState: UseApiRequestState<T>,
    children: (result: T) => JSX.Element,
}

const ApiRequestStateWrapper = <T, >({
    apiRequestState,
    children,
}: ApiRequestStateWrapperProps<T>) => {    
    if (apiRequestState.isLoading) {
        return <AppLoader />;
    }

    if (apiRequestState.isError) {
        return (
            <div>
                <Typography align="center" color="error" gutterBottom>error, please try again</Typography>
                <Typography variant="body2" align="center" color="textSecondary">{apiRequestState.apiError.message}</Typography>
            </div>
        );
    }

    return (
        <>
            {children(apiRequestState.result)}
        </>
    );
};

export default ApiRequestStateWrapper;