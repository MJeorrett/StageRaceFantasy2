import React from 'react';
import { ApiClientResponse, useApiRequest } from '../api';
import ApiRequestStateWrapper from './ApiRequestStateWrapper';

export interface ApiRequestWrapperProps<T> {
    makeRequest: () => Promise<ApiClientResponse<T>>,
    children: (result: T) => JSX.Element,
}
 
const ApiRequestWrapper = <T, >({
    makeRequest,
    children
}: ApiRequestWrapperProps<T>): JSX.Element => {
    const apiRequestState = useApiRequest(makeRequest);

    return (
        <ApiRequestStateWrapper
            apiRequestState={apiRequestState}
        >
            {children}
        </ApiRequestStateWrapper>
    );
};
 
export default ApiRequestWrapper;