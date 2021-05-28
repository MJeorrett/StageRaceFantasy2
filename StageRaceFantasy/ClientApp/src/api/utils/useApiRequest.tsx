import { useEffect, useState } from 'react';
import { ApiClientResponse } from '../common/apiClientResponseModels';
import { HttpClientFailureResponse } from '../common/httpClient';

export interface UseApiRequestLoadingState {
    isLoading: true,
    forceRefresh: () => void,
}

export interface UseApiRequestFailureState {
    isLoading: false,
    httpError: HttpClientFailureResponse,
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
    const [httpError, setHttpError] = useState<HttpClientFailureResponse | undefined>(undefined);
    const [result, setResult] = useState<T | undefined>(defaultValue);
    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        const doRequest = async () => {
            setIsLoading(true);
            setHttpError(undefined);
            const apiResponse = await makeRequest();
            if (apiResponse.isError) {
                setHttpError(apiResponse);
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

    if (httpError) return {
        isLoading: false,
        httpError,
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