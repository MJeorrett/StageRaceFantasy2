import React from 'react';
import { useHistory } from 'react-router';

import { createRider } from '../api';
import AppForm, { AppFormikSubmitButton } from '../components/AppForm';
import AppPageTitle from '../components/PageTitle';
import RiderForm from '../riders/form';
import { appPaths } from '../Routes';

const CreateRiderPage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Rider</AppPageTitle>
            
            <RiderForm.Container
                onSubmit={async values => {
                    const response = await createRider(values);

                    if (!response.isError) {
                        history.push(appPaths.viewRider(response.content));
                    }
                }}
            >
                <AppForm>
                    <RiderForm.Fields autoFocus />
                    <AppFormikSubmitButton>Create</AppFormikSubmitButton>
                </AppForm>
            </RiderForm.Container>
        </>
    );
};

export default CreateRiderPage;