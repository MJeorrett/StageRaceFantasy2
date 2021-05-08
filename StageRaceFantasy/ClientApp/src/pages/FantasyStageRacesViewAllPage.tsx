import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useHttpRequest, getAllFantasyStageRaces} from '../api';
import AppTable from '../components/AppTable';

const FantasyStageRacesViewAllPage: React.FC = () => {
    const { isLoading, result: fantasyStageRaces } = useHttpRequest(getAllFantasyStageRaces);

    return (
        <AppTable
            headers={['id', 'Name']}
            entities={fantasyStageRaces?.content || []}
            renderRow={fantasyStageRace => (
                <TableRow key={fantasyStageRace.id}>
                    <TableCell>{fantasyStageRace.id}</TableCell>
                    <TableCell>{fantasyStageRace.name}</TableCell>
                </TableRow>
            )}
            noEntitiesMessage="You don't have any fantasy stage races yet."
        />
    );
};

export default FantasyStageRacesViewAllPage;