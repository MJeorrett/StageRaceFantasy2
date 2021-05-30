import { TableCell } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useApiRequest } from '../api';
import { enterRiderIntoRace, getIdOfAllRidersEnteredInRace, withdrawRiderFromRace } from '../api';
import AppCheckbox from '../components/AppForm/AppCheckbox';
import RidersTable from './Table';

export type EditRiderRaceEntriesTableProps = {
    raceId: number,
}

const EditRiderRaceEntriesTable: React.FC<EditRiderRaceEntriesTableProps> = ({
    raceId,
}) => {
    const [isSubmittingEntry, setIsSubmittingEntry] = useState(false);
    const getAllEnteredRiderIds = useCallback(() => getIdOfAllRidersEnteredInRace(raceId), [raceId]);    
    const getAllEnteredRidersRequest = useApiRequest(getAllEnteredRiderIds);
    const enteredRiderIds = getAllEnteredRidersRequest.result || [];
    const checkboxesAreLoading = getAllEnteredRidersRequest.isLoading || isSubmittingEntry;

    const handleRiderClick = async (riderId: number) => {
        setIsSubmittingEntry(true);

        if (enteredRiderIds.includes(riderId)) {
            await withdrawRiderFromRace(raceId, riderId);
        }
        else {
            await enterRiderIntoRace(raceId, riderId);
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

export default EditRiderRaceEntriesTable;