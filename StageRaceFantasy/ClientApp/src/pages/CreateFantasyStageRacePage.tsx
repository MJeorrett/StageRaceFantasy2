import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyStageRace } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyStageRaceForm from '../fantasyStageRaces/form/FantasyStageRaceFormContainer';
import { appPaths } from '../Routes';

const CreateFantasyStageRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Race</AppPageTitle>
            <FantasyStageRaceForm
                onSubmit={async values => {
                    const response = await createFantasyStageRace(values);

                    if (!response.isError) {
                        history.push(appPaths.fantasyStageRaces);
                    }
                }}
            />
        </>
    );
};

export default CreateFantasyStageRacePage;