import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { getFantasyRaceById, updateFantasyRace } from '../api';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceForm from '../fantasyRaces/Form';
import { appPaths, useFantasyRaceId } from '../Routes';

const EditFantasyRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useFantasyRaceId();

    const getFantasyRace = useCallback(() => getFantasyRaceById(raceId), [raceId]);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            <ApiRequestWrapper makeRequest={getFantasyRace}>
                {fantasyRaceDetails => (
                    <FantasyRaceForm
                        initialValues={fantasyRaceDetails}
                        onSubmit={async values => {
                            const response = await updateFantasyRace(raceId, values);

                            if (!response.isError) {
                                history.push(appPaths.fantasyRaces);
                            }
                        }}
                        submitButtonText="Save Changes"
                    />
                )}
            </ApiRequestWrapper>
        </>
    );
};

export default EditFantasyRacePage;