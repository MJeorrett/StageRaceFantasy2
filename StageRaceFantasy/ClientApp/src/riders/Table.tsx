import React, { } from 'react';
import { TableCell } from '@material-ui/core';
import { getPaginatedRiders } from '../api';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
}) => {
    const columnHeaders = ['ID', 'First Name', 'Last Name'];

    return (
        <PaginatedApiTable
            makeRequest={getPaginatedRiders}
            headers={columnHeaders}
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
    );
};

export default RidersTable;