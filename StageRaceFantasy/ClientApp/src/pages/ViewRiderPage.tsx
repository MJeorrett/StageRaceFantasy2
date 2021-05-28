import React, { useCallback } from 'react';

import { getRiderById } from '../api';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { useRiderId } from '../Routes';

const ViewRiderPage = () => {
    const riderId = useRiderId();
    const getRider = useCallback(() => getRiderById(riderId), [riderId]);

    return (
        <ApiRequestWrapper makeRequest={getRider}>
            {
                rider => (
                    <>
                        <AppPageTitle>{rider.lastName}, {rider.firstName}</AppPageTitle>
                    </>
                )
            }
        </ApiRequestWrapper>
    );
};

export default ViewRiderPage;