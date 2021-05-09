import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { createFantasyStageRace, getFantasyStageRaceById, useHttpRequest } from '../api';
import AppPageTitle from '../components/PageTitle';
import FantasyStageRaceForm from '../fantasyStageRaces/form';
import { appPaths, useFantasyStageRaceId } from '../Routes';

const EditFantasyStageRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useFantasyStageRaceId();

    const fetchRace = useCallback(() => getFantasyStageRaceById(raceId), [raceId]);
    const { result: fantasyStageRace, isLoading } = useHttpRequest(fetchRace);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            {!isLoading && (
                <FantasyStageRaceForm
                    initialValues={fantasyStageRace}
                    onSubmit={async values => {
                        const response = await createFantasyStageRace(values);

                        if (!response.isError) {
                            history.push(appPaths.fantasyStageRaces);
                        }
                    }}
                />
            )}
        </>
    );
};

export default EditFantasyStageRacePage;