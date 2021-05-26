import React from 'react';
import { Form, Formik } from 'formik';

import { ApiRider } from '../../api/models';
import { defaultValues, validationSchema } from './values';

export type RiderFormContainer = {
    initialValues?: ApiRider.CreateUpdateDto,
    onSubmit: (values: ApiRider.CreateUpdateDto) => Promise<void>
}

const RiderFormContainer: React.FC<RiderFormContainer> = ({
    initialValues,
    onSubmit,
    children,
}) => {
    return (
        <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                {children}
            </Form>
        </Formik>
    );
};

export default RiderFormContainer;
