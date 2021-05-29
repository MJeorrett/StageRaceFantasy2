import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyRaceTeam } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceTeamForm from '../fantasyRaceTeams/Form';
import { appPaths, useFantasyRaceId } from '../Routes';

const CreateFantasyRaceTeamPage: React.FC = () => {
    const history = useHistory();
    const fantasyRaceId = useFantasyRaceId();

    return (
        <>
            <AppPageTitle>Create New Team</AppPageTitle>
            
            <FantasyRaceTeamForm
                onSubmit={async values => {
                    const response = await createFantasyRaceTeam({
                        ...values,
                        fantasyRaceId,
                    });

                    if (!response.isError) {
                        history.push(appPaths.viewFantasyRace(fantasyRaceId));
                    }
                }}
                submitButtonText="Create New Team"
                autofocus
            />
        </>
    );
};

export default CreateFantasyRaceTeamPage;