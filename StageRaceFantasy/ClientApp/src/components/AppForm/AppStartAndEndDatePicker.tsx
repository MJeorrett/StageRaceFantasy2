import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import React from 'react';
import { useFieldState } from '../../formikHelpers';
import AppFormikDatePicker from './AppFormikDatePicker';

export interface AppFormikStartAndEndDatePickerProps {
    startFieldName: string,
    endFieldName: string,
    startFieldLabel?: string,
    endFieldLabel?: string,
}

const AppFormikStartAndEndDatePicker: React.FC<AppFormikStartAndEndDatePickerProps> = ({
    startFieldName,
    endFieldName,
    startFieldLabel = 'Start Date',
    endFieldLabel = 'End Date',
}) => {
    const [startDate, setStartDate] = useFieldState<ParsableDate>(startFieldName);
    const [endDate, setEndDate] = useFieldState<ParsableDate>(endFieldName);

    const handleStartChange = (newStartParsableDate: ParsableDate) => {
        const newStartDate = newStartParsableDate as Date;

        if (endDate && newStartDate > endDate) {
            setEndDate(newStartDate);
        }
    };

    const handleEndChange = (newEndParsableDate: ParsableDate) => {
        const newEndDate = newEndParsableDate as Date;

        if (startDate && newEndDate < startDate) {
            setStartDate(newEndDate);
        }
    };
    
    return (
        <>
            <AppFormikDatePicker name={startFieldName} label={startFieldLabel} onChangeCallback={handleStartChange} />
            <AppFormikDatePicker name={endFieldName} label={endFieldLabel} onChangeCallback={handleEndChange} />
        </>
    );
};

export default AppFormikStartAndEndDatePicker;