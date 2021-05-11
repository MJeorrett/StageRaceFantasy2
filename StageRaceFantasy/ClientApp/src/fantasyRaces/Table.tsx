import React, {  } from 'react';
import { TableCell } from '@material-ui/core';
import { getPaginatedFantasyRaces } from '../api';
import AppTable, { TableActionButtonDefinition } from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import { usePaginatedHttpRequest } from '../api/utils/usePaginatedHttpRequest';

export interface FantasyRacesTableProps {
    actionButtons?: TableActionButtonDefinition[],
}

const FantasyRacesTable: React.FC<FantasyRacesTableProps> = ({
    actionButtons = [],
}) => {
    const {
        setPageNumber,
        setPageSize,
        ...fetchRacesState
    } = usePaginatedHttpRequest(getPaginatedFantasyRaces);

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
                        renderRowCells={fantasyRace => (
                            <>
                                <TableCell width={48}>{fantasyRace.id}</TableCell>
                                <TableCell>{fantasyRace.name}</TableCell>
                                <TableCell>{fantasyRace.startDate.toDateString()}</TableCell>
                                <TableCell>{fantasyRace.endDate.toDateString()}</TableCell>
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

export default FantasyRacesTable;