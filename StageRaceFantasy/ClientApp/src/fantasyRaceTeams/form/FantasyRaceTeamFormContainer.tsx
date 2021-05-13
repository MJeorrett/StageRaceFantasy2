import React from 'react';
import { Form, Formik } from 'formik';

import { ApiFantasyRaceTeam } from '../../api/models';
import { defaultValues, validationSchema } from './values';

export type FantasyRaceTeamFormContainerProps = {
    initialValues?: ApiFantasyRaceTeam.CreateUpdateDto,
    onSubmit: (values: ApiFantasyRaceTeam.CreateUpdateDto) => Promise<void>
}

const FantasyRaceTeamFormContainer: React.FC<FantasyRaceTeamFormContainerProps> = ({
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

export default FantasyRaceTeamFormContainer;
