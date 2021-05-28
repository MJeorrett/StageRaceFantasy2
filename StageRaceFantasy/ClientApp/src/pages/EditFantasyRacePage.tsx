import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { getFantasyRaceById, updateFantasyRace, useApiRequest } from '../api';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceForm from '../fantasyRaces/Form';
import { appPaths, useFantasyRaceId } from '../Routes';

const EditFantasyRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useFantasyRaceId();

    const fetchRace = useCallback(() => getFantasyRaceById(raceId), [raceId]);
    const fetchRaceState = useApiRequest(fetchRace);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            <HttpRequestWrapper apiRequestState={fetchRaceState}>
                {fetchRaceResponse => (
                    <FantasyRaceForm
                        initialValues={fetchRaceResponse}
                        onSubmit={async values => {
                            const response = await updateFantasyRace(raceId, values);

                            if (!response.isError) {
                                history.push(appPaths.fantasyRaces);
                            }
                        }}
                        submitButtonText="Save Changes"
                    />
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default EditFantasyRacePage;