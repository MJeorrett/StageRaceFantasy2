import React, { } from 'react';
import { TableCell } from '@material-ui/core';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { getPaginatedFantasyRaces } from '../api';

export interface FantasyRacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyRacesTable: React.FC<FantasyRacesTableProps> = ({
    actionButtons = [],
}) => {
    const columnHeaders = ['ID', 'Name', 'Start', 'End'];

    return (
        <PaginatedApiTable
            makeRequest={getPaginatedFantasyRaces}
            headers={columnHeaders}
            renderRowCells={fantasyRace => (
                <>
                    <TableCell width={48}>{fantasyRace.id}</TableCell>
                    <TableCell>{fantasyRace.name}</TableCell>
                    <TableCell>{fantasyRace.startDate.toDateString()}</TableCell>
                    <TableCell>{fantasyRace.endDate.toDateString()}</TableCell>
                </>
            )}
            actionButtons={actionButtons}
            noEntitiesMessage="You don't have any fantasy races yet."
        />
    );
};

export default FantasyRacesTable;