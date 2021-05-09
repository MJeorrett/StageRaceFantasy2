import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { getFantasyStageRaceById, updateFantasyStageRace, useHttpRequest } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import FantasyStageRaceForm from '../fantasyStageRaces/form';
import { appPaths, useFantasyStageRaceId } from '../Routes';

const EditFantasyStageRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useFantasyStageRaceId();

    const fetchRace = useCallback(() => getFantasyStageRaceById(raceId), [raceId]);
    const fetchRaceState = useHttpRequest(fetchRace);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            <HttpRequestWrapper httpState={fetchRaceState}>
                {fetchRaceResponse => (
                    <FantasyStageRaceForm.Container
                        initialValues={fetchRaceResponse}
                        onSubmit={async values => {
                            const response = await updateFantasyStageRace(raceId, values);

                            if (!response.isError) {
                                history.push(appPaths.fantasyStageRaces);
                            }
                        }}
                    >
                        <AppForm>
                            <FantasyStageRaceForm.Fields />
                            <AppFormikSubmitButton>Save Changes</AppFormikSubmitButton>
                        </AppForm>
                    </FantasyStageRaceForm.Container>
                )}
            </HttpRequestWrapper>
        </>
    );
};

export default EditFantasyStageRacePage;