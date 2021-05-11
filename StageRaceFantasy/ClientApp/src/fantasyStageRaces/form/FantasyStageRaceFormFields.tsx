import React from 'react';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface FantasyStageRaceFormFieldsProps {
    autoFocus?: boolean,
}

const FantasyStageRaceFormFields: React.FC<FantasyStageRaceFormFieldsProps> = ({
    autoFocus,
}) => {
    return (
        <>
            <AppFormikTextField name="name" label="Name" autoFocus={autoFocus} />
            <AppFormikTextField name="fantasyTeamSize" label="Team Size" type="number" />
            <AppFormikDatePicker name="startDate" label="Start Date" />
            <AppFormikDatePicker name="endDate" label="Emd Date" />
        </>
    );
};

export default FantasyStageRaceFormFields;
