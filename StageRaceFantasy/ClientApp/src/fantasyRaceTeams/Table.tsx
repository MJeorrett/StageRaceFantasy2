import React, { useCallback } from 'react';
import { TableCell } from '@material-ui/core';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import { usePaginatedApiRequest } from '../api/utils/usePaginatedApiRequest';
import { ApiPaginationQueryParams, getPaginatedFantasyRaceTeams } from '../api';

export interface FantasyRacesTeamsTableProps {
    fantasyRaceId: number,
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyRaceTeamsTable: React.FC<FantasyRacesTeamsTableProps> = ({
    fantasyRaceId,
    actionButtons = [],
}) => {
    const getTeamsForRace = useCallback((paginationParams: ApiPaginationQueryParams) => getPaginatedFantasyRaceTeams(fantasyRaceId, paginationParams), [fantasyRaceId]);
    const {
        setPageNumber,
        setPageSize,
        ...fetchTeamsState
    } = usePaginatedApiRequest(getTeamsForRace);

    const columnHeaders = ['ID', 'Name'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchTeamsState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.items}
                        pagination={{
                            ...fetchRacesResponse,
                            setPageNumber,
                            setPageSize,
                        }}
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
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default FantasyRaceTeamsTable;