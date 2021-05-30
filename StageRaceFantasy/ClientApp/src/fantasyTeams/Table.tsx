import React, { useCallback } from 'react';
import { TableCell } from '@material-ui/core';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { ApiPaginationQueryParams, getPaginatedFantasyTeams } from '../api';

export interface FantasyTeamsTableProps {
    raceId: number,
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyTeamsTable: React.FC<FantasyTeamsTableProps> = ({
    raceId,
    actionButtons = [],
}) => {
    const getTeamsForRace = useCallback((paginationParams: ApiPaginationQueryParams) => getPaginatedFantasyTeams(raceId, paginationParams), [raceId]);

    const columnHeaders = ['ID', 'Name'];

    return (
        <PaginatedApiTable
            makeRequest={getTeamsForRace}
            headers={columnHeaders}
            pageSizeOptions={[10]}
            renderRowCell={fantasyTeam => (
                <>
                    <TableCell width={48}>{fantasyTeam.id}</TableCell>
                    <TableCell>{fantasyTeam.name}</TableCell>
                </>
            )}
            actionButtons={actionButtons}
            noEntitiesMessage="You don't have any teams yet."
        />
    );
};

export default FantasyTeamsTable;