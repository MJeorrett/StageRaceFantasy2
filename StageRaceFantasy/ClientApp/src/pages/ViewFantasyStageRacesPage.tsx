import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useHistory } from 'react-router-dom';
import { useHttpRequest, getAllFantasyStageRaces } from '../api';
import AppTable from '../components/AppTable';
import { appPaths } from '../Routes';

const ViewFantasyStageRacesPage: React.FC = () => {
    const history = useHistory();
    const { isLoading, result: fantasyStageRaces } = useHttpRequest(getAllFantasyStageRaces);

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyStageRace(id));
    };

    return (
        <>
            <Link to={appPaths.createFantasyStageRace}>Create New</Link>
            {!isLoading && (
                <AppTable
                    headers={['id', 'Name', '']}
                    entities={fantasyStageRaces?.content || []}
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
        </>
    );
};

export default ViewFantasyStageRacesPage;