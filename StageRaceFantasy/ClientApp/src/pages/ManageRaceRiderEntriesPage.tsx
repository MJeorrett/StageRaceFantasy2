import React from 'react';
import { useApiRequest, useGetRaceById } from '../api';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import EditRiderRaceEntriesTable from '../riders/EditRiderEntriesTable';
import { useRaceId } from '../Routes';

const ManageRaceRiderEntriesPage = () => {
    const raceId = useRaceId();
    const getRace = useGetRaceById(raceId);

    return (
        <>
            <ApiRequestWrapper makeRequest={getRace}>
                {race => (
                    <AppPageTitle>Entries for {race.name}</AppPageTitle>
                )}
            </ApiRequestWrapper>

            <EditRiderRaceEntriesTable
                raceId={raceId}
            />
        </>
    );
};

export default ManageRaceRiderEntriesPage;
