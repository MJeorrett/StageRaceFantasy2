import React from 'react';

import * as Fields from './Fields';

export interface FantasyStageRaceFormFieldsProps {
    autoFocus?: boolean,
}

const FantasyStageRaceFormFields: React.FC<FantasyStageRaceFormFieldsProps> = ({
    autoFocus,
}) => {
    return (
        <>
            <Fields.Name autoFocus={autoFocus} />
            <Fields.FantasyTeamSize />
        </>
    );
};

export default FantasyStageRaceFormFields;
