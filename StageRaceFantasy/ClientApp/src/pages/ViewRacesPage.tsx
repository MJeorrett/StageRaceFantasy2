import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import RacesTable from '../races/Table';
import AppTableActionButtons from '../components/AppTableActionButtons';

const ViewFantasyPage: React.FC = () => {
    const history = useHistory();

    const handleViewClick = (id: number) => {
        history.push(appPaths.viewRace(id));
    };

    const handleEditClick = (id: number) => {
        history.push(appPaths.editRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Races</AppPageTitle>

            <AppTableActionButtons>
                <AppButton linkPath={appPaths.createRace}>Create New</AppButton>
            </AppTableActionButtons>
            
            <RacesTable
                actionButtons={[
                    { icon: <ViewIcon />, onClick: handleViewClick },
                    { icon: <EditIcon />, onClick: handleEditClick },
                ]}
            />
        </>
    );
};

export default ViewFantasyPage;