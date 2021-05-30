import { useEffect, useState } from 'react';
import { isError } from 'util';
import { ApiClientFailureResponse, ApiClientResponse } from '../common/apiClientResponseModels';
import { HttpClientFailureResponse } from '../common/httpClient';

export interface UseApiRequestLoadingState {
    isLoading: true,
    isError: false,
    isLoadedSuccessfully: false,
    result: undefined,
    apiError: undefined,
    forceRefresh: () => void,
}

export interface UseApiRequestFailureState {
    isLoading: false,
    isError: true,
    isLoadedSuccessfully: false,
    result: undefined,
    apiError: ApiClientFailureResponse,
    forceRefresh: () => void,
}

export interface UseApiRequestSuccessState<T> {
    isLoading: false,
    isError: false,
    isLoadedSuccessfully: true,
    result: T,
    apiError: undefined,
    forceRefresh: () => void,
}

export type UseApiRequestState<T> =
    UseApiRequestLoadingState |
    UseApiRequestFailureState |
    UseApiRequestSuccessState<T>;

export const useApiRequest = <T, >(makeRequest: () => Promise<ApiClientResponse<T>>): UseApiRequestState<T> => {
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<ApiClientFailureResponse | undefined>();
    const [result, setResult] = useState<T | undefined>();
    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        const doRequest = async () => {
            setIsLoading(true);
            setApiError(undefined);
            const apiResponse = await makeRequest();
            if (apiResponse.isError) {
                setApiError(apiResponse);
            }
            else {
                setResult(apiResponse.content);
            }
            setIsLoading(false);
        };
        doRequest();
    }, [makeRequest, forceRefresh]);

    const doForceRefresh = () => setForceRefresh(!forceRefresh);

    if (isLoading) return {
        isLoading: true,
        isError: false,
        isLoadedSuccessfully: false,
        apiError: undefined,
        result: undefined,
        forceRefresh: doForceRefresh,
    };

    if (apiError) return {
        isLoading: false,
        isError: true,
        isLoadedSuccessfully: false,
        result: undefined,
        apiError,
        forceRefresh: doForceRefresh,
    };

    return {
        isLoading: false,
        isError: false,
        isLoadedSuccessfully: true,
        result: result as T,
        apiError: undefined,
        forceRefresh: doForceRefresh,
    };
};