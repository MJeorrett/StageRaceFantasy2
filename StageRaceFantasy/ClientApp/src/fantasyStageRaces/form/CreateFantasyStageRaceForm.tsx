import React from 'react';
import { Form, Formik } from 'formik';
import { ApiFantasyStageRace } from '../../api/models';

import { defaultValues, validationSchema } from './values';
import * as Fields from './Fields';
import AppForm from '../../components/AppForm';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';

export type CreateFormProps = {
    onSubmit: (values: ApiFantasyStageRace.CreateDto) => Promise<void>
}

const CreateFantasyStageRaceForm: React.FC<CreateFormProps> = ({
    onSubmit,
}) => {
    return (
        <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <AppForm>
                    <Fields.Name />
                    <Fields.FantasyTeamSize />
                    <AppFormikSubmitButton>Create</AppFormikSubmitButton>
                </AppForm>
            </Form>
        </Formik>
    );
};

export default CreateFantasyStageRaceForm;
