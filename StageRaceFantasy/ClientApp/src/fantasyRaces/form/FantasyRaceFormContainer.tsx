import React from 'react';
import { Form, Formik } from 'formik';

import { ApiFantasyRace } from '../../api/models';
import { defaultValues, validationSchema } from './values';

export type FantasyRaceFormContainerProps = {
    initialValues?: ApiFantasyRace.CreateUpdateDto,
    onSubmit: (values: ApiFantasyRace.CreateUpdateDto) => Promise<void>
}

const FantasyRaceFormContainer: React.FC<FantasyRaceFormContainerProps> = ({
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

export default FantasyRaceFormContainer;
