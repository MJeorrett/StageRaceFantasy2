import React, { useCallback, useState } from 'react';
import { TableCell } from '@material-ui/core';
import { useHttpRequest, getPaginatedFantasyStageRaces } from '../api';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';

export interface FantasyStageRacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyStageRacesTable: React.FC<FantasyStageRacesTableProps> = ({
    actionButtons = [],
}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const doGetPaginatedRaces = useCallback(
        () => getPaginatedFantasyStageRaces({ pageNumber, pageSize }),
        [pageNumber, pageSize]);

    const fetchRacesState = useHttpRequest(doGetPaginatedRaces);
    const columnHeaders = ['ID', 'Name'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.content.items || []}
                        pagination={fetchRacesResponse.content}
                        onChangePageNumber={setPageNumber}
                        onChangePageSize={setPageSize}
                        renderRowCells={fantasyStageRace => (
                            <>
                                <TableCell width={48}>{fantasyStageRace.id}</TableCell>
                                <TableCell>{fantasyStageRace.name}</TableCell>
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