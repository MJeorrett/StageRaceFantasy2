import React from 'react';
import { useHistory } from 'react-router';

import { createRider } from '../api';
import AppPageTitle from '../components/PageTitle';
import RiderForm from '../riders/Form';
import { appPaths } from '../Routes';

const CreateRiderPage: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <AppPageTitle>Create New Rider</AppPageTitle>
            
            <RiderForm
                onSubmit={async values => {
                    const response = await createRider(values);

                    if (!response.isError) {
                        history.push(appPaths.viewRider(response.content));
                    }
                }}
            />
        </>
    );
};

export default CreateRiderPage;