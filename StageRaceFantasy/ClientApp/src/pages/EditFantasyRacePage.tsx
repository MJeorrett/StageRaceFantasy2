import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { getFantasyRaceById, updateFantasyRace, useApiRequest } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import FantasyRaceForm from '../fantasyRaces/form';
import { appPaths, useFantasyRaceId } from '../Routes';

const EditFantasyRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useFantasyRaceId();

    const fetchRace = useCallback(() => getFantasyRaceById(raceId), [raceId]);
    const fetchRaceState = useApiRequest(fetchRace);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            <HttpRequestWrapper httpState={fetchRaceState}>
                {fetchRaceResponse => (
                    <FantasyRaceForm.Container
                        initialValues={fetchRaceResponse}
                        onSubmit={async values => {
                            const response = await updateFantasyRace(raceId, values);

                            if (!response.isError) {
                                history.push(appPaths.fantasyRaces);
                            }
                        }}
                    >
                        <AppForm>
                            <FantasyRaceForm.Fields />
                            <AppFormikSubmitButton>Save Changes</AppFormikSubmitButton>
                        </AppForm>
                    </FantasyRaceForm.Container>
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default EditFantasyRacePage;