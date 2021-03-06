import { useCallback, useState } from 'react';
import { ApiPaginationListResponseContent, ApiPaginationQueryParams } from '../common/apiResponseModels';
import { ApiClientPaginatedListResponse } from '../common/apiClientResponseModels';
import { useApiRequest, UseApiRequestState } from './useApiRequest';

export type UsePaginatedApiRequestState<T> = UseApiRequestState<ApiPaginationListResponseContent<T>> & {
    setPageNumber: (pageNumber: number) => void,
    setPageSize: (pageSize: number) => void,
};

export const usePaginatedApiRequest = <T,>(makeRequest: (params: ApiPaginationQueryParams) => Promise<ApiClientPaginatedListResponse<T>>): UsePaginatedApiRequestState<T> => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const doGetPaginatedRaces = useCallback(
        () => makeRequest({ pageNumber, pageSize }),
        [pageNumber, pageSize, makeRequest]);

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