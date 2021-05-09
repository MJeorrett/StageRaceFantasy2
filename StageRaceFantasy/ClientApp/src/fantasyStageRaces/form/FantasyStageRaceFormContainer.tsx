import React from 'react';
import { Formik } from 'formik';

import { ApiFantasyStageRace } from '../../api/models';
import { defaultValues, validationSchema } from './values';
import FantasyStageRaceForm from './FantasyStageRaceForm';

export type FantasyStageRaceFormContainerProps = {
    initialValues?: ApiFantasyStageRace.CreateUpdateDto,
    onSubmit: (values: ApiFantasyStageRace.CreateUpdateDto) => Promise<void>
}

const FantasyStageRaceFormContainer: React.FC<FantasyStageRaceFormContainerProps> = ({
    initialValues,
    onSubmit,
}) => {
    return (
        <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <FantasyStageRaceForm />
        </Formik>
    );
};

export default FantasyStageRaceFormContainer;
