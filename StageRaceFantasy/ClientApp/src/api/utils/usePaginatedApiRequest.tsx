import { useCallback, useState } from 'react';
import { ApiClientPaginatedListResponse, ApiPaginationListResponseContent, ApiPaginationQueryParams } from '../common';
import { useApiRequest, UseApiRequestState } from './useApiRequest';

export type UsePaginatedApiRequestState<T> = UseApiRequestState<ApiPaginationListResponseContent<T>> & {
    setPageNumber: (pageSize: number) => void,
    setPageSize: (pageSize: number) => void,
};

export const usePaginatedApiRequest = <T,>(makeRequest: (params: ApiPaginationQueryParams) => Promise<ApiClientPaginatedListResponse<T>>): UsePaginatedApiRequestState<T> => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const doGetPaginatedRaces = useCallback(
        () => makeRequest({ pageNumber, pageSize }),
        [pageNumber, pageSize]);

    const httpState = useApiRequest(doGetPaginatedRaces);

    if (httpState.isLoading) return {
        ...httpState,
        setPageNumber,
        setPageSize
    };

    if (httpState.isError) return {
        ...httpState,
        setPageNumber,
        setPageSize
    };

    return {
        ...httpState,
        setPageNumber,
        setPageSize
    };
};