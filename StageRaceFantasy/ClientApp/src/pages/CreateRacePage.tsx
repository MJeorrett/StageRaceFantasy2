import React from 'react';
import { useHistory } from 'react-router';
import { createRace } from '../api';
import AppPageTitle from '../components/PageTitle';
import RaceForm from '../races/Form';
import { appPaths } from '../Routes';

const CreateRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Race</AppPageTitle>
            
            <RaceForm
                onSubmit={async values => {
                    const response = await createRace(values);

                    if (!response.isError) {
                        history.push(appPaths.races);
                    }
                }}
                submitButtonText="Create New Race"
                autofocus
            />
        </>
    );
};

export default CreateRacePage;