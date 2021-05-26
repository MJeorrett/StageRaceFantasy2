import React from 'react';
import { useHistory } from 'react-router-dom';
import ViewIcon from '@material-ui/icons/Visibility';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import AppTableActionButtons from '../components/AppTableActionButtons';
import RidersTable from '../riders/Table';

const ViewRidersPage: React.FC = () => {
    const history = useHistory();

    const handleViewClick = (id: number) => {
        history.push(appPaths.viewRider(id));
    };

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyRace(id));
    };

    return (
        <>
            <AppPageTitle>Riders</AppPageTitle>

            <AppTableActionButtons>
                <AppButton linkPath={appPaths.createRider}>Create New</AppButton>
            </AppTableActionButtons>
            
            <RidersTable
                actionButtons={[
                    { icon: <ViewIcon />, onClick: handleViewClick },
                    // { icon: <EditIcon />, onClick: handleEditClick },
                ]}
            />
        </>
    );
};

export default ViewRidersPage;