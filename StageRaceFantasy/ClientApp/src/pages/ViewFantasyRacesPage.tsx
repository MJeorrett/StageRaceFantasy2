import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

import { appPaths } from '../Routes';
import AppPageTitle from '../components/PageTitle';
import AppButton from '../components/AppButton';
import FantasyRacesTable from '../fantasyRaces/Table';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1),
        '& > *:not(:last-child)': {
            marginRight: theme.spacing(1),
        },
    },
}));

const ViewFantasyRacesPage: React.FC = () => {
    const classNames = useStyles();
    const history = useHistory();

    const handleEditClick = (id: number) => {
        history.push(appPaths.editFantasyRace(id));
    };

    return (
        <>
            <AppPageTitle>Fantasy Races</AppPageTitle>

            <div className={classNames.buttons}>
                <AppButton linkPath={appPaths.createFantasyRace}>Create New</AppButton>
                <AppButton linkPath={appPaths.createFantasyRaceTeam}>Create New Team</AppButton>
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