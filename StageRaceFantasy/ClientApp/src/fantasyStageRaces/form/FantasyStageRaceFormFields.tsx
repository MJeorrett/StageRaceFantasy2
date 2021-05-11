import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { useField } from 'formik';
import React from 'react';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface FantasyStageRaceFormFieldsProps {
    autoFocus?: boolean,
}

const FantasyStageRaceFormFields: React.FC<FantasyStageRaceFormFieldsProps> = ({
    autoFocus,
}) => {
    const [{ value: startDate }, , { setValue: setStartDate }] = useField<ParsableDate>('startDate');
    const [{ value: endDate }, , { setValue: setEndDate }] = useField<ParsableDate>('endDate');

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
            <AppFormikTextField name="name" label="Name" autoFocus={autoFocus} />
            <AppFormikTextField name="fantasyTeamSize" label="Team Size" type="number" />
            <AppFormikDatePicker name="startDate" label="Start Date" onChangeCallback={handleStartChange} />
            <AppFormikDatePicker name="endDate" label="Emd Date" onChangeCallback={handleEndChange} />
        </>
    );
};

export default FantasyStageRaceFormFields;
