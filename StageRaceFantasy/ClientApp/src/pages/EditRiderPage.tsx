import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { createRider, getRiderById, updateRider, useApiRequest } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import RiderForm from '../riders/Form';
import { appPaths, useRiderId } from '../Routes';

const EditRiderPage: React.FC = () => {
    const history = useHistory();
    const riderId = useRiderId();

    const fetchRider = useCallback(() => getRiderById(riderId), [riderId]);
    const fetchRiderState = useApiRequest(fetchRider);

    return (
        <HttpRequestWrapper apiRequestState={fetchRiderState}>
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
        </HttpRequestWrapper>
    );
};

export default EditRiderPage;