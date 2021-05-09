import React from 'react';
import { TableCell } from '@material-ui/core';
import { useHttpRequest, getAllFantasyStageRaces } from '../api';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';

export interface FantasyStageRacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyStageRacesTable: React.FC<FantasyStageRacesTableProps> = ({
    actionButtons = [],
}) => {
    const fetchRacesState = useHttpRequest(getAllFantasyStageRaces);
    const columnHeaders = ['id', 'Name'];

    return (
        <>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.content || []}
                        renderRowCells={fantasyStageRace => (
                            <>
                                <TableCell>{fantasyStageRace.id}</TableCell>
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