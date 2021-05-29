import React, { useCallback } from 'react';
import { TableCell } from '@material-ui/core';
import { PaginatedApiTable, TableActionButtonDefinition } from '../components/AppTable';
import { ApiPaginationQueryParams, getPaginatedFantasyTeams } from '../api';

export interface FantasyRacesTeamsTableProps {
    fantasyRaceId: number,
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyTeamsTable: React.FC<FantasyRacesTeamsTableProps> = ({
    fantasyRaceId,
    actionButtons = [],
}) => {
    const getTeamsForRace = useCallback((paginationParams: ApiPaginationQueryParams) => getPaginatedFantasyTeams(fantasyRaceId, paginationParams), [fantasyRaceId]);

    const columnHeaders = ['ID', 'Name'];

    return (
        <PaginatedApiTable
            makeRequest={getTeamsForRace}
            headers={columnHeaders}
            pageSizeOptions={[10]}
            renderRowCells={fantasyTeam => (
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