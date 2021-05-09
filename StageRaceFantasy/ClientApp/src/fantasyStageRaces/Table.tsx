import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { useHttpRequest, getAllFantasyStageRaces } from '../api';
import AppTable from '../components/AppTable';
import HttpRequestWrapper from '../components/HttpRequestWrapper';

export interface ActionButtonDefinition {
    icon: JSX.Element,
    onClick: (id: number) => void,
}

export interface FantasyStageRacesTableProps {
    actionButtons?: ActionButtonDefinition[],
}

const FantasyStageRacesTable: React.FC<FantasyStageRacesTableProps> = ({
    actionButtons = [],
}) => {
    const fetchRacesState = useHttpRequest(getAllFantasyStageRaces);
    const columnHeaders = ['id', 'Name'];
    actionButtons.length > 0 && columnHeaders.push('');

    return (
        <>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={columnHeaders}
                        entities={fetchRacesResponse.content || []}
                        renderRow={fantasyStageRace => (
                            <TableRow key={fantasyStageRace.id}>
                                <TableCell>{fantasyStageRace.id}</TableCell>
                                <TableCell>{fantasyStageRace.name}</TableCell>
                                <TableCell>
                                    {actionButtons.map(({ onClick, icon }, index) => (
                                        <IconButton
                                            key={index}
                                            onClick={() => onClick(fantasyStageRace.id)}>
                                            {icon}
                                        </IconButton>
                                    ))}
                                </TableCell>
                            </TableRow>
                        )}
                        noEntitiesMessage="You don't have any fantasy stage races yet."
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default FantasyStageRacesTable;