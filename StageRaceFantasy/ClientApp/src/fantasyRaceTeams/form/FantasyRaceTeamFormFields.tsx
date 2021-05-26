import React from 'react';

import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface FantasyRaceTeamFormFieldsProps {
    autoFocus?: boolean,
}
 
const FantasyRaceTeamFormFields: React.FC<FantasyRaceTeamFormFieldsProps> = ({
    autoFocus,
}) => {
    return (
        <>
            <AppFormikTextField name="name" label="Name" autoFocus={autoFocus} />
        </>
    );
};
 
export default FantasyRaceTeamFormFields;