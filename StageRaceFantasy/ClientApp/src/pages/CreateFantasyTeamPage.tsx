import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyTeam } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyTeamForm from '../fantasyTeams/Form';
import { appPaths, useFantasyRaceId } from '../Routes';

const CreateFantasyTeamPage: React.FC = () => {
    const history = useHistory();
    const fantasyRaceId = useFantasyRaceId();

    return (
        <>
            <AppPageTitle>Create New Team</AppPageTitle>
            
            <FantasyTeamForm
                onSubmit={async values => {
                    const response = await createFantasyTeam({
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

export default CreateFantasyTeamPage;