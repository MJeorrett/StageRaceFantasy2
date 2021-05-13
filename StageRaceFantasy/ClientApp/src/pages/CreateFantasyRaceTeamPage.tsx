import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyRaceTeam } from '../api/fantasyRaceTeams';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceTeamForm from '../fantasyRaceTeams/form';
import { appPaths } from '../Routes';

const CreateFantasyRaceTeamPage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Team</AppPageTitle>
            
            <FantasyRaceTeamForm.Container
                onSubmit={async values => {
                    const response = await createFantasyRaceTeam(values);

                    if (!response.isError) {
                        history.push(appPaths.fantasyRaces);
                    }
                }}
            >
                <AppForm>
                    <FantasyRaceTeamForm.Fields autoFocus />
                    <AppFormikSubmitButton>Create</AppFormikSubmitButton>
                </AppForm>
            </FantasyRaceTeamForm.Container>
        </>
    );
};

export default CreateFantasyRaceTeamPage;