import { Checkbox, TableCell, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useApiRequest } from '../api';
import { enterRiderIntoRace, getAllEnteredRiderIdsForRace, withdrawRiderFromRace } from '../api/riderRaceEntries';
import ApiRequestStateWrapper from '../components/ApiRequestStateWrapper';
import AppFlexSpacer from '../components/AppFlexSpacer';
import AppTableActionButtons from '../components/AppTableActionButtons';
import RidersTable from './Table';

export type RiderRaceEntriesTableProps = {
    fantasyRaceId: number,
}

const RiderRaceEntriesTable: React.FC<RiderRaceEntriesTableProps> = ({
    fantasyRaceId,
}) => {
    const getAllEnteredRiders = useCallback(() => getAllEnteredRiderIdsForRace(fantasyRaceId), [fantasyRaceId]);    
    const getAllEnteredRidersRequest = useApiRequest(getAllEnteredRiders);

    const handleRiderClick = async (riderId: number) => {
        const enteredRiderIds = getAllEnteredRidersRequest.result || [];

        if (enteredRiderIds.includes(riderId)) {
            await withdrawRiderFromRace(fantasyRaceId, riderId);
        }
        else {
            await enterRiderIntoRace(fantasyRaceId, riderId);
        }

        getAllEnteredRidersRequest.forceRefresh();
    };
    
    return (
        <div>
            <AppTableActionButtons>
                <Typography variant="h5" component="h2">Riders</Typography>
                <AppFlexSpacer />
            </AppTableActionButtons>
            <RidersTable
                extraColumns={[
                    {
                        header: 'Entered?',
                        // eslint-disable-next-line react/display-name
                        renderRow: rider => (
                            <TableCell>
                                <ApiRequestStateWrapper
                                    apiRequestState={getAllEnteredRidersRequest}
                                >
                                    {enteredRiderIds => (
                                        <Checkbox
                                            checked={enteredRiderIds.includes(rider.id)}
                                            onChange={() => handleRiderClick(rider.id)}
                                        />
                                    )}
                                </ApiRequestStateWrapper>
                            </TableCell>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default RiderRaceEntriesTable;