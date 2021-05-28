import React, {  } from 'react';
import AppTable, { AppTableProps } from './AppTable';
import { useApiRequest } from '../../api';
import { ApiClientListResponse } from '../../api/common/apiClientResponseModels';
import HttpRequestWrapper from '../HttpRequestWrapper';

type OverriddenProps = 'entities';

export interface PaginatedApiTableProps<T> extends Omit<AppTableProps<T>, OverriddenProps> {
    makeRequest: () => Promise<ApiClientListResponse<T>>,
}

export const ApiTable = <T extends { id: number }, >({
    makeRequest,
    ...restOfProps
}: PaginatedApiTableProps<T>): JSX.Element => {
    const apiRequestState = useApiRequest(makeRequest);

    return (
        <>
            <HttpRequestWrapper apiRequestState={apiRequestState}>
                {fetchRacesResponse => (
                    <AppTable
                        entities={fetchRacesResponse || []}
                        {...restOfProps}
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};
