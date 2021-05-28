import React, {  } from 'react';
import AppTable, { AppTableProps, TableActionButtonDefinition } from './AppTable';
import { ApiPaginationQueryParams, usePaginatedApiRequest } from '../../api';
import { ApiClientPaginatedListResponse } from '../../api/common/apiClientResponseModels';
import HttpRequestWrapper from '../HttpRequestWrapper';

type OverriddenProps = 'entities' | 'pagination';

export interface PaginatedApiTableProps<T> extends Omit<AppTableProps<T>, OverriddenProps> {
    makeRequest: (params: ApiPaginationQueryParams) => Promise<ApiClientPaginatedListResponse<T>>,
}

export const PaginatedApiTable = <T extends { id: number }, >({
    makeRequest,
    ...restOfProps
}: PaginatedApiTableProps<T>): JSX.Element => {
    const {
        setPageNumber,
        setPageSize,
        ...apiRequestState
    } = usePaginatedApiRequest(makeRequest);

    return (
        <>
            <HttpRequestWrapper apiRequestState={apiRequestState}>
                {fetchRacesResponse => (
                    <AppTable
                        entities={fetchRacesResponse.items || []}
                        pagination={{
                            ...fetchRacesResponse,
                            setPageNumber,
                            setPageSize,
                        }}
                        {...restOfProps}
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};
