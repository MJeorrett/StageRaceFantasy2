import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import FantasyRacesTable from '../fantasyRaces/Table';
import AppTableActionButtons from '../components/AppTableActionButtons';

const ViewFantasyRacesPage: React.FC = () => {
    const history = useHistory();

    const handleViewClick = (id: number) => {
        history.push(appPaths.viewFantasyRace(id));
    };

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Races</AppPageTitle>

            <AppTableActionButtons>
                <AppButton linkPath={appPaths.createFantasyRace}>Create New</AppButton>
            </AppTableActionButtons>
            
            <FantasyRacesTable
                actionButtons={[
                    { icon: <ViewIcon />, onClick: handleViewClick },
                    { icon: <EditIcon />, onClick: handleEditClick },
                ]}
            />
        </>
    );
};

export default ViewFantasyRacesPage;