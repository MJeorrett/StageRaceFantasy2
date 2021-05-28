import React, {  } from 'react';
import AppTable, { AppTableProps } from './AppTable';
import { ApiClientListResponse } from '../../api/common/apiClientResponseModels';
import ApiRequestWrapper from '../ApiRequestWrapper';

type OverriddenProps = 'entities';

export interface PaginatedApiTableProps<T> extends Omit<AppTableProps<T>, OverriddenProps> {
    makeRequest: () => Promise<ApiClientListResponse<T>>,
}

export const ApiTable = <T extends { id: number }, >({
    makeRequest,
    ...restOfProps
}: PaginatedApiTableProps<T>): JSX.Element => {

    return (
        <>
            <ApiRequestWrapper makeRequest={makeRequest}>
                {response => (
                    <AppTable
                        entities={response || []}
                        {...restOfProps}
                    />
                )}
            </ApiRequestWrapper>
        </>
    );
};
