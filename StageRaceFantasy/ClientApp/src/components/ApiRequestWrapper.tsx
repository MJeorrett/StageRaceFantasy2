import React from 'react';
import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';
import { useApiRequest } from '../api';
import { ApiClientResponse } from '../api/common/apiClientResponseModels';

interface ApiRequestWrapperProps<T> {
    makeRequest: () => Promise<ApiClientResponse<T>>
    children: (result: T) => JSX.Element,
}

const ApiRequestWrapper = <T, >({
    makeRequest,
    children,
}: ApiRequestWrapperProps<T>) => {
    const apiRequestState = useApiRequest(makeRequest);
    
    if (apiRequestState.isLoading) {
        return <AppLoader />;
    }

    if (apiRequestState.isError) {
        return (
            <div>
                <Typography align="center" color="error" gutterBottom>error, please try again</Typography>
                <Typography variant="body2" align="center" color="textSecondary">{apiRequestState.httpError.message}</Typography>
            </div>
        );
    }

    return (
        <>
            {children(apiRequestState.result)}
        </>
    );
};

export default ApiRequestWrapper;