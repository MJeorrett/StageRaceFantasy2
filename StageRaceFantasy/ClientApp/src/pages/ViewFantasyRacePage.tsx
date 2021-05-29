import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/Visibility';

import { getFantasyRaceById } from '../api';
import AppButton from '../components/AppButton';
import AppDataPoint from '../components/AppDataPoints/AppDataPoint';
import AppDataPointGroup from '../components/AppDataPoints/AppDataPointGroup';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppTableActionButtons from '../components/AppTableActionButtons';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { formatDateString } from '../dateUtils';
import FantasyTeamsTable from '../fantasyTeams/Table';
import { appPaths, useFantasyRaceId } from '../Routes';

const ViewFantasyRacePage = () => {
    const history = useHistory();

    const fantasyRaceId = useFantasyRaceId();
    const getFantasyRace = useCallback(() => getFantasyRaceById(fantasyRaceId), [fantasyRaceId]);

    const handleViewFantasyTeamClick = (id: number) => {
        history.push(appPaths.viewFantasyTeam(id));
    };

    return (
        <ApiRequestWrapper makeRequest={getFantasyRace}>
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
                            <AppButton variant="text" linkPath={appPaths.createFantasyTeam(fantasyRaceId)}>Create New Team</AppButton>
                        </AppTableActionButtons>

                        <FantasyTeamsTable
                            fantasyRaceId={fantasyRaceId}
                            actionButtons={[
                                { icon: <ViewIcon />, onClick: handleViewFantasyTeamClick }
                            ]}
                        />
                    </>
                )
            }
        </ApiRequestWrapper>
    );
};

export default ViewFantasyRacePage;
