import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyRace } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceForm from '../fantasyRaces/form';
import { appPaths } from '../Routes';

const CreateFantasyRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Race</AppPageTitle>
            
            <FantasyRaceForm.Container
                onSubmit={async values => {
                    const response = await createFantasyRace(values);

                    if (!response.isError) {
                        history.push(appPaths.fantasyRaces);
                    }
                }}
            >
                <AppForm>
                    <FantasyRaceForm.Fields autoFocus />
                    <AppFormikSubmitButton>Create</AppFormikSubmitButton>
                </AppForm>
            </FantasyRaceForm.Container>
        </>
    );
};

export default CreateFantasyRacePage;