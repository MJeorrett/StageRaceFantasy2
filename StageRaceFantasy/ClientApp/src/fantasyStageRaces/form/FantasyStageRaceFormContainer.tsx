import React from 'react';
import { Form, Formik } from 'formik';

import { ApiFantasyStageRace } from '../../api/models';
import { defaultValues, validationSchema } from './values';
import FantasyStageRaceFormFields from './FantasyStageRaceFormFields';

export type FantasyStageRaceFormContainerProps = {
    initialValues?: ApiFantasyStageRace.CreateUpdateDto,
    onSubmit: (values: ApiFantasyStageRace.CreateUpdateDto) => Promise<void>
}

const FantasyStageRaceFormContainer: React.FC<FantasyStageRaceFormContainerProps> = ({
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

export default FantasyStageRaceFormContainer;
