import React, { } from 'react';
import { TableCell } from '@material-ui/core';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { getPaginatedRaces } from '../api';

export interface RacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const RacesTable: React.FC<RacesTableProps> = ({
    actionButtons = [],
}) => {
    const columnHeaders = ['ID', 'Name', 'Start', 'End'];

    return (
        <PaginatedApiTable
            makeRequest={getPaginatedRaces}
            headers={columnHeaders}
            renderRowCell={race => (
                <>
                    <TableCell width={48}>{race.id}</TableCell>
                    <TableCell>{race.name}</TableCell>
                    <TableCell>{race.startDate.toDateString()}</TableCell>
                    <TableCell>{race.endDate.toDateString()}</TableCell>
                </>
            )}
            actionButtons={actionButtons}
            noEntitiesMessage="You don't have any fantasy races yet."
        />
    );
};

export default RacesTable;