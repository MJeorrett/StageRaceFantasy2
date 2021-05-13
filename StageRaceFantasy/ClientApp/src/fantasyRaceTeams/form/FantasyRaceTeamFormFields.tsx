import React from 'react';
import { getAllFantasyRaceNames, useHttpRequest } from '../../api';
import AppFormikSelect, { AppSelectOption } from '../../components/AppForm/AppFormikSelect';

import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface FantasyRaceTeamFormFieldsProps {
    autoFocus?: boolean,
}
 
const FantasyRaceTeamFormFields: React.FC<FantasyRaceTeamFormFieldsProps> = ({
    autoFocus,
}) => {
    const getFantasyRaceNames = useHttpRequest(getAllFantasyRaceNames);

    const fantasyRaceOptions: AppSelectOption[] = getFantasyRaceNames.isLoading || getFantasyRaceNames.isError ?
        [] :
        getFantasyRaceNames.result.content.map(fantasyRaceName => ({
            value: fantasyRaceName.id,
            label: fantasyRaceName.name,
        }));
    
    return (
        <>
            <AppFormikTextField name="name" label="Name" autoFocus={autoFocus} />
            <AppFormikSelect
                name="fantasyRaceId"
                label="Fantasy Race"
                isLoading={getFantasyRaceNames.isLoading}
                options={fantasyRaceOptions}
            />
        </>
    );
};
 
export default FantasyRaceTeamFormFields;