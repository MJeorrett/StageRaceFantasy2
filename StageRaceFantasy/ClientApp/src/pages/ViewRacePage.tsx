import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/Visibility';

import { getRaceById } from '../api';
import AppButton from '../components/AppButton';
import AppDataPoint from '../components/AppDataPoints/AppDataPoint';
import AppDataPointGroup from '../components/AppDataPoints/AppDataPointGroup';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppTableActionButtons from '../components/AppTableActionButtons';
import AppPageTitle from '../components/PageTitle';
import { formatDateString } from '../dateUtils';
import FantasyTeamsTable from '../fantasyTeams/Table';
import { appPaths, useRaceId } from '../Routes';
import RiderRaceEntriesTable from '../riders/RiderEntriesTable';
import ApiRequestWrapper from '../components/ApiRequestWrapper';

const useStyles = makeStyles(theme => ({
    container: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(8),
        },
    },
}));

const ViewRacePage = () => {
    const history = useHistory();
    const classNames = useStyles();
    const raceId = useRaceId();

    const getRace = useCallback(() => getRaceById(raceId), [raceId]);

    const handleViewFantasyTeamClick = (id: number) => {
        history.push(appPaths.viewFantasyTeam(id));
    };

    return (
        <ApiRequestWrapper makeRequest={getRace}>
            {
                race => (
                    <>
                        <AppPageTitle>{race.name}</AppPageTitle>

                        <div className={classNames.container}>
                            <AppDataPointGroup>
                                <AppDataPoint label="Start">{formatDateString(race.startDate)}</AppDataPoint>
                                <AppDataPoint label="End">{formatDateString(race.endDate)}</AppDataPoint>
                            </AppDataPointGroup>

                            <div>
                                <Typography align="center" variant="h5" component="h2">Fantasy Teams</Typography>
                                <AppTableActionButtons>
                                    <AppFlexSpacer />
                                    <AppButton variant="text" linkPath={appPaths.createFantasyTeam(raceId)}>Create New Team</AppButton>
                                </AppTableActionButtons>
                                <FantasyTeamsTable
                                    raceId={raceId}
                                    actionButtons={[
                                        { icon: <ViewIcon />, onClick: handleViewFantasyTeamClick }
                                    ]}
                                />
                            </div>

                            <div>
                                <Typography align="center" variant="h5" component="h2">Riders</Typography>
                                <RiderRaceEntriesTable
                                    raceId={raceId}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </ApiRequestWrapper>
    );
};

export default ViewRacePage;
