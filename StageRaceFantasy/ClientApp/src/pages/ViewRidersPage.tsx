import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
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
        history.push(appPaths.editRider(id));
    };

    return (
        <>
            <AppPageTitle>Riders</AppPageTitle>
            <RidersTable
                actionHeaderContent={[
                    <AppButton key="create new" linkPath={appPaths.createRider}>Create New</AppButton>
                ]}
                actionButtons={[
                    { icon: <ViewIcon />, onClick: handleViewClick },
                    { icon: <EditIcon />, onClick: handleEditClick },
                ]}
            />
        </>
    );
};

export default ViewRidersPage;