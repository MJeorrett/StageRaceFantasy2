import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyRace } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceForm from '../fantasyRaces/Form';
import { appPaths } from '../Routes';

const CreateFantasyRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Race</AppPageTitle>
            
            <FantasyRaceForm
                onSubmit={async values => {
                    const response = await createFantasyRace(values);

                    if (!response.isError) {
                        history.push(appPaths.fantasyRaces);
                    }
                }}
                submitButtonText="Create New Race"
                autofocus
            />
        </>
    );
};

export default CreateFantasyRacePage;