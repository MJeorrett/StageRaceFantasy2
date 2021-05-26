import { Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { getFantasyRaceById, useHttpRequest } from '../api';
import AppButton from '../components/AppButton';
import AppDataPoint from '../components/AppDataPoints/AppDataPoint';
import AppDataPointGroup from '../components/AppDataPoints/AppDataPointGroup';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppTableActionButtons from '../components/AppTableActionButtons';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { formatDateString } from '../dateUtils';
import FantasyRaceTeamsTable from '../fantasyRaceTeams/Table';
import { appPaths, useFantasyRaceId } from '../Routes';

const ViewFantasyRacePage = () => {
    const fantasyRaceId = useFantasyRaceId();
    const getFantasyRaceCallback = useCallback(() => getFantasyRaceById(fantasyRaceId), [fantasyRaceId]);
    const getFantasyRaceRequest = useHttpRequest(getFantasyRaceCallback);

    return (
        <HttpRequestWrapper
            httpState={getFantasyRaceRequest}
        >
            {
                fantasyRace => (
                    <>
                        <AppPageTitle>{fantasyRace.name}</AppPageTitle>
                        <AppDataPointGroup>
                            <AppDataPoint label="Start">{formatDateString(fantasyRace.startDate)}</AppDataPoint>
                            <AppDataPoint label="End">{formatDateString(fantasyRace.endDate)}</AppDataPoint>
                        </AppDataPointGroup>
                        <AppTableActionButtons>
                            <Typography variant="h5" component="h2">Fantasy Teams</Typography>
                            <AppFlexSpacer />
                            <AppButton variant="text" linkPath={appPaths.createFantasyRaceTeam(fantasyRaceId)}>Create New Team</AppButton>
                        </AppTableActionButtons>
                        <FantasyRaceTeamsTable fantasyRaceId={fantasyRaceId} />
                    </>
                )
            }
        </HttpRequestWrapper>
    );
};

export default ViewFantasyRacePage;
