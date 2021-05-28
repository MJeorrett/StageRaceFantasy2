import React from 'react';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import AppFormikStartAndEndDatePicker from '../../components/AppForm/AppStartAndEndDatePicker';

export interface FantasyRaceFormFieldsProps {
    autoFocus?: boolean,
}

const FantasyRaceFormFields: React.FC<FantasyRaceFormFieldsProps> = ({
    autoFocus,
}) => {
    return (
        <>
            <AppFormikTextField name="name" label="Name" autoFocus={autoFocus} />
            <AppFormikTextField name="fantasyTeamSize" label="Team Size" type="number" />
            <AppFormikStartAndEndDatePicker startFieldName="startDate" endFieldName="endDate" />
        </>
    );
};

export default FantasyRaceFormFields;
