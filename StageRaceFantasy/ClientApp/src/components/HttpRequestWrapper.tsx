import React from 'react';
import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';
import { UseHttpRequestState } from '../api';

interface HttpRequestWrapperProps<T> {
    httpState: UseHttpRequestState<T>,
    children: (result: T) => JSX.Element,
}

const HttpRequestWrapper = <T, >({
    httpState,
    children,
}: HttpRequestWrapperProps<T>) => {
    if (httpState.isLoading) {
        return <AppLoader />;
    }

    if (httpState.isError) {
        return (
            <>
                <Typography align="center" color="error">error, please try again</Typography>
            </>
        );
    }

    return (
        <>
            {children(httpState.result)}
        </>
    );
};

export default HttpRequestWrapper;