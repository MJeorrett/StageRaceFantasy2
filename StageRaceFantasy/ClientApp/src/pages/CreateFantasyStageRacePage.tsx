import React from 'react';
import { useHistory } from 'react-router';
import { createFantasyStageRace } from '../api';
import CreateFantasyStageRaceForm from '../fantasyStageRaces/form/CreateFantasyStageRaceForm';
import { appPaths } from '../Routes';

const CreateFantasyStageRacePage: React.FC = () => {
    const history = useHistory();

    return (
        <CreateFantasyStageRaceForm
            onSubmit={async values => {
                const response = await createFantasyStageRace(values);

                if (!response.isError) {
                    history.push(appPaths.fantasyStageRaces);
                }
            }}
        />
    );
};

export default CreateFantasyStageRacePage;