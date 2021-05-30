import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyTeam } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyTeamForm from '../fantasyTeams/Form';
import { appPaths, useRaceId } from '../Routes';

const CreateFantasyTeamPage: React.FC = () => {
    const history = useHistory();
    const raceId = useRaceId();

    return (
        <>
            <AppPageTitle>Create New Team</AppPageTitle>
            
            <FantasyTeamForm
                onSubmit={async values => {
                    const response = await createFantasyTeam({
                        ...values,
                        raceId: raceId,
                    });

                    if (!response.isError) {
                        history.push(appPaths.viewRace(raceId));
                    }
                }}
                submitButtonText="Create New Team"
                autofocus
            />
        </>
    );
};

export default CreateFantasyTeamPage;