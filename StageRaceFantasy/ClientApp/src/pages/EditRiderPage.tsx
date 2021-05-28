import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { getRiderById, updateRider } from '../api';
import ApiRequestWrapper from '../components/ApiRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import RiderForm from '../riders/Form';
import { appPaths, useRiderId } from '../Routes';

const EditRiderPage: React.FC = () => {
    const history = useHistory();
    const riderId = useRiderId();

    const getRider = useCallback(() => getRiderById(riderId), [riderId]);

    return (
        <ApiRequestWrapper makeRequest={getRider}>
            {rider => (
                <>
                    <AppPageTitle>Create New Rider</AppPageTitle>

                    <RiderForm
                        initialValues={rider}
                        onSubmit={async values => {
                            const response = await updateRider(riderId, values);

                            if (!response.isError) {
                                history.push(appPaths.riders);
                            }
                        }}
                        submitButtonText="Save Changes"
                    />
                </>
            )}
        </ApiRequestWrapper>
    );
};

export default EditRiderPage;