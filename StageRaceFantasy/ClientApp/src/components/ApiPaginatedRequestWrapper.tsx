import React from 'react';
import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';
import { usePaginatedApiRequest } from '../api';
import { ApiClientPaginatedListResponse } from '../api/common/apiClientResponseModels';
import { ApiPaginationListResponseContent, ApiPaginationQueryParams } from '../api/common/apiResponseModels';

type ApiPaginatedRequestWrapperChildProps<T> = ApiPaginationListResponseContent<T> & {
    setPageSize: (pageSize: number) => void,
    setPageNumber: (pageNumber: number) => void,
}

interface ApiPaginatedRequestWrapperProps<T> {
    makeRequest: (paginationParams: ApiPaginationQueryParams) => Promise<ApiClientPaginatedListResponse<T>>
    children: (childProps: ApiPaginatedRequestWrapperChildProps<T>) => JSX.Element,
}

const ApiPaginatedRequestWrapper = <T, >({
    makeRequest,
    children,
}: ApiPaginatedRequestWrapperProps<T>) => {
    const {
        setPageNumber,
        setPageSize,
        ...apiRequestState
    } = usePaginatedApiRequest(makeRequest);
    
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
            {children({ ...apiRequestState.result, setPageNumber, setPageSize })}
        </>
    );
};

export default ApiPaginatedRequestWrapper;