import { TableCell } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useApiRequest } from '../api';
import { enterRiderIntoRace, getAllEnteredRiderIdsForRace, withdrawRiderFromRace } from '../api/riderRaceEntries';
import AppCheckbox from '../components/AppForm/AppCheckbox';
import RidersTable from './Table';

export type RiderRaceEntriesTableProps = {
    fantasyRaceId: number,
}

const RiderRaceEntriesTable: React.FC<RiderRaceEntriesTableProps> = ({
    fantasyRaceId,
}) => {
    const [isSubmittingEntry, setIsSubmittingEntry] = useState(false);
    const getAllEnteredRiders = useCallback(() => getAllEnteredRiderIdsForRace(fantasyRaceId), [fantasyRaceId]);    
    const getAllEnteredRidersRequest = useApiRequest(getAllEnteredRiders);
    const enteredRiderIds = getAllEnteredRidersRequest.result || [];
    const checkboxesAreLoading = getAllEnteredRidersRequest.isLoading || isSubmittingEntry;

    const handleRiderClick = async (riderId: number) => {
        setIsSubmittingEntry(true);

        if (enteredRiderIds.includes(riderId)) {
            await withdrawRiderFromRace(fantasyRaceId, riderId);
        }
        else {
            await enterRiderIntoRace(fantasyRaceId, riderId);
        }

        getAllEnteredRidersRequest.forceRefresh();
        setIsSubmittingEntry(false);
    };
    
    return (
        <div>
            <RidersTable
                extraColumns={[
                    {
                        header: 'Entered?',
                        // eslint-disable-next-line react/display-name
                        renderRow: rider => (
                            <TableCell>
                                <AppCheckbox
                                    checked={enteredRiderIds.includes(rider.id)}
                                    onChange={() => handleRiderClick(rider.id)}
                                    isLoading={checkboxesAreLoading}
                                />
                            </TableCell>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default RiderRaceEntriesTable;