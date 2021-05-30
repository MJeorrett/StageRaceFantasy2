import React, { } from 'react';
import { TableCell } from '@material-ui/core';
import { getPaginatedRiders } from '../api';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { Rider } from '../models';

export type ExtraColumn = {
    header: string,
    renderRow: (value: Rider.Summary) => JSX.Element,
}

export interface RidersTableProps {
    actionButtons?: TableActionButtonDefinition[],
    extraColumns?: ExtraColumn[],
}

const RidersTable: React.FC<RidersTableProps> = ({
    actionButtons = [],
    extraColumns = [],
}) => {
    const extraColumnHeaders = extraColumns.map(_ => _.header);
    const columnHeaders = ['ID', 'First Name', 'Last Name'].concat(extraColumnHeaders);

    return (
        <PaginatedApiTable
            makeRequest={getPaginatedRiders}
            headers={columnHeaders}
            renderRowCells={rider => (
                <>
                    <TableCell width={48}>{rider.id}</TableCell>
                    <TableCell>{rider.firstName}</TableCell>
                    <TableCell>{rider.lastName}</TableCell>
                    {extraColumns.map(extraColumn => (
                        extraColumn.renderRow(rider)
                    ))}
                </>
            )}
            actionButtons={actionButtons}
            noEntitiesMessage="You don't have any riders yet."
        />
    );
};

export default RidersTable;