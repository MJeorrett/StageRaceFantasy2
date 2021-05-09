import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyStageRace } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import AppPageTitle from '../components/PageTitle';
import FantasyStageRaceForm from '../fantasyStageRaces/form';
import { appPaths } from '../Routes';

const CreateFantasyStageRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Race</AppPageTitle>
            <FantasyStageRaceForm.Container
                onSubmit={async values => {
                    const response = await createFantasyStageRace(values);

                    if (!response.isError) {
                        history.push(appPaths.fantasyStageRaces);
                    }
                }}
            >
                <AppForm>
                    <FantasyStageRaceForm.Fields />
                    <AppFormikSubmitButton>Create</AppFormikSubmitButton>
                </AppForm>
            </FantasyStageRaceForm.Container>
        </>
    );
};

export default CreateFantasyStageRacePage;