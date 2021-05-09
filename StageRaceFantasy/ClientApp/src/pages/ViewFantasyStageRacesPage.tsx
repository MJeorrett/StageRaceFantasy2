import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import FantasyStageRacesTable from '../fantasyStageRaces/Table';

const ViewFantasyStageRacesPage: React.FC = () => {
    const history = useHistory();

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyStageRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Stage Races</AppPageTitle>

            <AppButton linkPath={appPaths.createFantasyStageRace}>Create New</AppButton>
            <FantasyStageRacesTable
                actionButtons={[
                    { icon: <EditIcon />, onClick: handleEditClick }
                ]}
            />
        </>
    );
};

export default ViewFantasyStageRacesPage;