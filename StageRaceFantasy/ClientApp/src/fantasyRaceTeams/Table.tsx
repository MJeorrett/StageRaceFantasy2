import React, { useCallback } from 'react';
import { TableCell } from '@material-ui/core';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import { usePaginatedHttpRequest } from '../api/utils/usePaginatedHttpRequest';
import { getPaginatedFantasyRaceTeams } from '../api';
import { ApiPaginationQueryParams } from '../api/models/common';

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
    } = usePaginatedHttpRequest(getTeamsForRace);

    const columnHeaders = ['ID', 'Name'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchTeamsState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.content.items}
                        pagination={{
                            ...fetchRacesResponse.content,
                            setPageNumber,
                            setPageSize,
                        }}
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