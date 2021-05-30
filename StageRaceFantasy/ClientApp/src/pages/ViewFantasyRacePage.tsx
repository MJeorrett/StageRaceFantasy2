import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/Visibility';

import { getFantasyRaceById } from '../api';
import AppButton from '../components/AppButton';
import AppDataPoint from '../components/AppDataPoints/AppDataPoint';
import AppDataPointGroup from '../components/AppDataPoints/AppDataPointGroup';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppTableActionButtons from '../components/AppTableActionButtons';
import AppPageTitle from '../components/PageTitle';
import { formatDateString } from '../dateUtils';
import FantasyTeamsTable from '../fantasyTeams/Table';
import { appPaths, useFantasyRaceId } from '../Routes';
import RiderRaceEntriesTable from '../riders/RiderEntriesTable';
import ApiRequestWrapper from '../components/ApiRequestWrapper';

const useStyles = makeStyles(theme => ({
    container: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(8),
        },
    },
}));

const ViewFantasyRacePage = () => {
    const history = useHistory();
    const classNames = useStyles();
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

                        <div className={classNames.container}>
                            <AppDataPointGroup>
                                <AppDataPoint label="Start">{formatDateString(fantasyRace.startDate)}</AppDataPoint>
                                <AppDataPoint label="End">{formatDateString(fantasyRace.endDate)}</AppDataPoint>
                            </AppDataPointGroup>

                            <div>
                                <Typography align="center" variant="h5" component="h2">Fantasy Teams</Typography>
                                <AppTableActionButtons>
                                    <AppFlexSpacer />
                                    <AppButton variant="text" linkPath={appPaths.createFantasyTeam(fantasyRaceId)}>Create New Team</AppButton>
                                </AppTableActionButtons>
                                <FantasyTeamsTable
                                    fantasyRaceId={fantasyRaceId}
                                    actionButtons={[
                                        { icon: <ViewIcon />, onClick: handleViewFantasyTeamClick }
                                    ]}
                                />
                            </div>

                            <div>
                                <Typography align="center" variant="h5" component="h2">Riders</Typography>
                                <RiderRaceEntriesTable
                                    fantasyRaceId={fantasyRaceId}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </ApiRequestWrapper>
    );
};

export default ViewFantasyRacePage;
