import React from 'react';
import { Form, Formik } from 'formik';
import AppForm from './AppForm';
import AppFormikSubmitButton from './AppFormikSubmitButton';
import AppFormikFormFields, { AppFormikFormFieldsConfig } from './AppFormikFormFields';

export type AppFormikFormProps<T> = {
    initialValues: T,
    validationSchema: any,
    config: AppFormikFormFieldsConfig<T>,
    onSubmit: (values: T) => Promise<void>,
    submitButtonText?: string,
    autofocus?: boolean,
}

const AppFormikForm = <T, >({
    initialValues,
    validationSchema,
    config,
    onSubmit,
    submitButtonText = 'Submit',
    autofocus,
}: AppFormikFormProps<T>): JSX.Element => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <AppForm>
                    <AppFormikFormFields config={config} autofocus={autofocus} />
                    <AppFormikSubmitButton>{submitButtonText}</AppFormikSubmitButton>
                </AppForm>
            </Form>
        </Formik>
    );
};

export default AppFormikForm;
