import React from 'react';

import { ApiRider } from '../api/models';
import { defaultValues, validationSchema } from './formValues';
import AppFormikForm from '../components/AppForm/AppFormikForm';

export type RiderFormContainer = {
    initialValues?: ApiRider.CreateUpdateDto,
    onSubmit: (values: ApiRider.CreateUpdateDto) => Promise<void>,
    submitButtonText?: string,
}

const RiderForm: React.FC<RiderFormContainer> = ({
    initialValues = defaultValues,
    onSubmit,
    submitButtonText,
}) => {
    return (
        <AppFormikForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
            config={{
                firstName: {
                    type: 'string',
                    label: 'First Name'
                },
                lastName: {
                    type: 'string',
                    label: 'Last Name'
                }
            }}
        />
    );
};

export default RiderForm;
