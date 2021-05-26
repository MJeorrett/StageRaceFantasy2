import React, { useCallback } from 'react';

import { getRiderById, useHttpRequest } from '../api';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import { useRiderId } from '../Routes';

const ViewRiderPage = () => {
    const riderId = useRiderId();
    const getRiderCallback = useCallback(() => getRiderById(riderId), [riderId]);
    const getRiderRequest = useHttpRequest(getRiderCallback);

    return (
        <HttpRequestWrapper
            httpState={getRiderRequest}
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