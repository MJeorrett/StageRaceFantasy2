import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useHistory } from 'react-router-dom';
import { useHttpRequest, getAllFantasyStageRaces } from '../api';
import AppTable from '../components/AppTable';
import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import HttpRequestWrapper from '../components/HttpRequestWrapper';

const ViewFantasyStageRacesPage: React.FC = () => {
    const history = useHistory();
    const fetchRacesState = useHttpRequest(getAllFantasyStageRaces);

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyStageRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Stage Races</AppPageTitle>

            <AppButton linkPath={appPaths.createFantasyStageRace}>Create New</AppButton>
            <HttpRequestWrapper httpState={fetchRacesState}>
                {fetchRacesResponse => (
                    <AppTable
                        headers={['id', 'Name', '']}
                        entities={fetchRacesResponse.content || []}
                        renderRow={fantasyStageRace => (
                            <TableRow key={fantasyStageRace.id}>
                                <TableCell>{fantasyStageRace.id}</TableCell>
                                <TableCell>{fantasyStageRace.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(fantasyStageRace.id)}>
                                        <EditIcon />
                                    </IconButton>
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

export default ViewFantasyStageRacesPage;