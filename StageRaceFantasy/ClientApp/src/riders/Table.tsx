import React, {  } from 'react';
import { TableCell } from '@material-ui/core';
import { getPaginatedRiders, usePaginatedApiRequest } from '../api';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
}) => {
    const {
        setPageNumber,
        setPageSize,
        ...fetchRacesState
    } = usePaginatedApiRequest(getPaginatedRiders);

    const columnHeaders = ['ID', 'First Name', 'Last Name'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {ridersResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={ridersResponse.items || []}
                        pagination={{
                            ...ridersResponse,
                            setPageNumber,
                            setPageSize,
                        }}
                        renderRowCells={rider => (
                            <>
                                <TableCell width={48}>{rider.id}</TableCell>
                                <TableCell>{rider.firstName}</TableCell>
                                <TableCell>{rider.lastName}</TableCell>
                            </>
                        )}
                        actionButtons={actionButtons}
                        noEntitiesMessage="You don't have any riders yet."
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default RidersTable;