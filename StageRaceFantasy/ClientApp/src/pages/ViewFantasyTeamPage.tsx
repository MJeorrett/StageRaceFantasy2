import React, { useCallback } from 'react';
import { getFantasyTeamById } from '../api';

import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { useFantasyTeamId } from '../Routes';

const ViewFantasyTeamPage = () => {
    const fantasyTeamId = useFantasyTeamId();
    const getFantasyTeam = useCallback(() => getFantasyTeamById(fantasyTeamId), [fantasyTeamId]);

    return (
        <ApiRequestWrapper makeRequest={getFantasyTeam}>
            {
                fantasyTeam => (
                    <>
                        <AppPageTitle>{fantasyTeam.name}</AppPageTitle>
                    </>
                )
            }
        </ApiRequestWrapper>
    );
};

export default ViewFantasyTeamPage;