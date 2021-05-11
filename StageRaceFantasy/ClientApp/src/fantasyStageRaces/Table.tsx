import React, { useCallback, useState } from 'react';
import { TableCell } from '@material-ui/core';
import { useHttpRequest, getPaginatedFantasyStageRaces } from '../api';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import { usePaginatedHttpRequest } from '../api/utils/usePaginatedHttpRequest';

export interface FantasyStageRacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyStageRacesTable: React.FC<FantasyStageRacesTableProps> = ({
    actionButtons = [],
}) => {
    const {
        setPageNumber,
        setPageSize,
        ...fetchRacesState
    } = usePaginatedHttpRequest(getPaginatedFantasyStageRaces);

    const columnHeaders = ['ID', 'Name', 'Start', 'End'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.content.items || []}
                        pagination={{
                            ...fetchRacesResponse.content,
                            setPageNumber,
                            setPageSize,
                        }}
                        renderRowCells={fantasyStageRace => (
                            <>
                                <TableCell width={48}>{fantasyStageRace.id}</TableCell>
                                <TableCell>{fantasyStageRace.name}</TableCell>
                                <TableCell>{fantasyStageRace.startDate.toDateString()}</TableCell>
                                <TableCell>{fantasyStageRace.endDate.toDateString()}</TableCell>
                            </>
                        )}
                        actionButtons={actionButtons}
                        noEntitiesMessage="You don't have any fantasy stage races yet."
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default FantasyStageRacesTable;