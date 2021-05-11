import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import FantasyRacesTable from '../fantasyRaces/Table';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

const ViewFantasyRacesPage: React.FC = () => {
    const classNames = useStyles();
    const history = useHistory();

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Stage Races</AppPageTitle>

            <div className={classNames.buttons}>
                <AppButton linkPath={appPaths.createFantasyRace}>Create New</AppButton>
            </div>
            
            <FantasyRacesTable
                actionButtons={[
                    { icon: <EditIcon />, onClick: handleEditClick }
                ]}
            />
        </>
    );
};

export default ViewFantasyRacesPage;