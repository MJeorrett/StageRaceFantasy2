import React from 'react';

import * as Fields from './Fields';

const FantasyStageRaceFormFields: React.FC = () => {
    return (
        <>
            <Fields.Name />
            <Fields.FantasyTeamSize />
        </>
    );
};

export default FantasyStageRaceFormFields;
