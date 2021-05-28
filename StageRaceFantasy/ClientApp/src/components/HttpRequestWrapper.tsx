import React from 'react';
import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';
import { UseApiRequestState } from '../api';

interface HttpRequestWrapperProps<T> {
    apiRequestState: UseApiRequestState<T>,
    children: (result: T) => JSX.Element,
}

const HttpRequestWrapper = <T, >({
    apiRequestState,
    children,
}: HttpRequestWrapperProps<T>) => {
    if (apiRequestState.isLoading) {
        return <AppLoader />;
    }

    if (apiRequestState.isError) {
        return (
            <>
                <Typography align="center" color="error">error, please try again</Typography>
            </>
        );
    }

    return (
        <>
            {children(apiRequestState.result)}
        </>
    );
};

export default HttpRequestWrapper;