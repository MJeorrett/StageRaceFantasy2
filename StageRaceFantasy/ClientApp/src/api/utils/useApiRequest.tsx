import { useEffect, useState } from 'react';
import { ApiClientFailureResponse, ApiClientResponse } from '../common/apiClientResponseModels';
import { HttpClientFailureResponse } from '../common/httpClient';

export interface UseApiRequestLoadingState {
    isLoading: true,
    forceRefresh: () => void,
}

export interface UseApiRequestFailureState {
    isLoading: false,
    httpError: ApiClientFailureResponse,
    isError: true,
    forceRefresh: () => void,
}

export interface UseApiRequestSuccessState<T> {
    isLoading: false,
    isError: false,
    result: T,
    forceRefresh: () => void,
}

export type UseApiRequestState<T> =
    UseApiRequestLoadingState |
    UseApiRequestFailureState |
    UseApiRequestSuccessState<T>;

export const useApiRequest = <T,>(makeRequest: () => Promise<ApiClientResponse<T>>, defaultValue?: T): UseApiRequestState<T> => {
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState<ApiClientFailureResponse | undefined>(undefined);
    const [result, setResult] = useState<T | undefined>(defaultValue);
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
        forceRefresh: doForceRefresh,
    };

    if (apiError) return {
        isLoading: false,
        httpError: apiError,
        isError: true,
        forceRefresh: doForceRefresh,
    };

    return {
        isLoading: false,
        isError: false,
        result: result as T,
        forceRefresh: doForceRefresh,
    };
};