import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { getRaceById, updateRace } from '../api';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import RaceForm from '../races/Form';
import { appPaths, useRaceId } from '../Routes';

const EditRacePage: React.FC = () => {
    const history = useHistory();
    const raceId = useRaceId();

    const getRace = useCallback(() => getRaceById(raceId), [raceId]);

    return (
        <>
            <AppPageTitle>Edit Race</AppPageTitle>
            <ApiRequestWrapper makeRequest={getRace}>
                {raceDetails => (
                    <RaceForm
                        initialValues={raceDetails}
                        onSubmit={async values => {
                            const response = await updateRace(raceId, values);

                            if (!response.isError) {
                                history.push(appPaths.races);
                            }
                        }}
                        submitButtonText="Save Changes"
                    />
                )}
            </ApiRequestWrapper>
        </>
    );
};

export default EditRacePage;