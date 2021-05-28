import React, { useCallback } from 'react';

import { getRiderById, useApiRequest } from '../api';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { useRiderId } from '../Routes';

const ViewRiderPage = () => {
    const riderId = useRiderId();
    const getRiderCallback = useCallback(() => getRiderById(riderId), [riderId]);
    const getRiderRequest = useApiRequest(getRiderCallback);

    return (
        <HttpRequestWrapper
            apiRequestState={getRiderRequest}
        >
            {
                rider => (
                    <>
                        <AppPageTitle>{rider.lastName}, {rider.firstName}</AppPageTitle>
                    </>
                )
            }
        </HttpRequestWrapper>
    );
};

export default ViewRiderPage;