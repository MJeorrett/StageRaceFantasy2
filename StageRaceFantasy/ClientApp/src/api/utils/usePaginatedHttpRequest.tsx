import { useCallback, useState } from 'react';
import { HttpClientResponse } from '../common/httpClient';
import { ApiPaginatedListResponse, ApiPaginationQueryParams } from '../models/common';
import { useHttpRequest, UseHttpRequestFailureState, UseHttpRequestLoadingState, UseHttpRequestSuccessState } from './useHttpRequest';

export interface UsePaginatedHttpRequestLoadingState extends UseHttpRequestLoadingState {
    setPageNumber: (pageSize: number) => void,
    setPageSize: (pageSize: number) => void,
}

export interface UsePaginatedHttpRequestFailureState extends UseHttpRequestFailureState {
    setPageNumber: (pageSize: number) => void,
    setPageSize: (pageSize: number) => void,
}

export interface UsePaginatedHttpRequestSuccessState<T> extends UseHttpRequestSuccessState<ApiPaginatedListResponse<T>> {
    setPageNumber: (pageSize: number) => void,
    setPageSize: (pageSize: number) => void,
}

export type UsePaginatedHttpRequestState<T> =
    UsePaginatedHttpRequestLoadingState |
    UsePaginatedHttpRequestFailureState |
    UsePaginatedHttpRequestSuccessState<T>;

export const usePaginatedHttpRequest = <T, >(makeRequest: (params: ApiPaginationQueryParams) => Promise<HttpClientResponse<ApiPaginatedListResponse<T>>>): UsePaginatedHttpRequestState<T> => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const doGetPaginatedRaces = useCallback(
        () => makeRequest({ pageNumber, pageSize }),
        [pageNumber, pageSize]);

    const httpState = useHttpRequest(doGetPaginatedRaces);
    
    return {
        ...httpState,
        setPageNumber,
        setPageSize,
    };
};