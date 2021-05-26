import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { createRider, getRiderById, updateRider, useHttpRequest } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import HttpRequestWrapper from '../components/HttpRequestWrapper';
import AppPageTitle from '../components/PageTitle';
import RiderForm from '../riders/form';
import { appPaths, useRiderId } from '../Routes';

const EditRiderPage: React.FC = () => {
    const history = useHistory();
    const riderId = useRiderId();

    const fetchRider = useCallback(() => getRiderById(riderId), [riderId]);
    const fetchRiderState = useHttpRequest(fetchRider);

    return (
        <HttpRequestWrapper httpState={fetchRiderState}>
            {rider => (
                <>
                    <AppPageTitle>Create New Rider</AppPageTitle>
                    
                    <RiderForm.Container
                        initialValues={rider}
                        onSubmit={async values => {
                            const response = await updateRider(riderId, values);

                            if (!response.isError) {
                                history.push(appPaths.riders);
                            }
                        }}
                    >
                        <AppForm>
                            <RiderForm.Fields autoFocus />
                            <AppFormikSubmitButton>Save Changes</AppFormikSubmitButton>
                        </AppForm>
                    </RiderForm.Container>
                </>
            )}
        </HttpRequestWrapper>
    );
};

export default EditRiderPage;