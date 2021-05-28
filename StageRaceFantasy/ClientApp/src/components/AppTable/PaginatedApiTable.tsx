import React, {  } from 'react';
import AppTable, { AppTableProps } from './AppTable';
import { ApiPaginationQueryParams } from '../../api';
import { ApiClientPaginatedListResponse } from '../../api/common/apiClientResponseModels';
import ApiPaginatedRequestWrapper from '../ApiPaginatedRequestWrapper';

type OverriddenProps = 'entities' | 'pagination';

export interface PaginatedApiTableProps<T> extends Omit<AppTableProps<T>, OverriddenProps> {
    makeRequest: (params: ApiPaginationQueryParams) => Promise<ApiClientPaginatedListResponse<T>>,
}

export const PaginatedApiTable = <T extends { id: number }, >({
    makeRequest,
    ...restOfProps
}: PaginatedApiTableProps<T>): JSX.Element => {

    return (
        <>
            <ApiPaginatedRequestWrapper makeRequest={makeRequest}>
                {response => (
                    <AppTable
                        entities={response.items || []}
                        pagination={response}
                        {...restOfProps}
                    />
                )}
            </ApiPaginatedRequestWrapper>
        </>
    );
};
