import React from 'react';
import { Form, Formik } from 'formik';
import AppForm from './AppForm';
import AppFormikSubmitButton from './AppFormikSubmitButton';
import AppFormikFormFields, { AppFormikFormFieldsConfig } from './AppFormikFormFields';

export type AppFormikFormTextFieldConfig = {
    type: 'string' | 'number',
    label: string,
}

export type AppFormikFormStartDateFieldConfig = {
    type: 'startDate',
    label?: string,
    endFieldName: string,
    endFieldLabel?: string,
}

export type AppFormikFormEndDateFieldConfig = {
    type: 'endDate',
}

export type AppFormikFormFieldConfig =
    AppFormikFormTextFieldConfig |
    AppFormikFormStartDateFieldConfig |
    AppFormikFormEndDateFieldConfig;

export type AppFormikFormProps<T> = {
    initialValues: T,
    validationSchema: any,
    config: AppFormikFormFieldsConfig<T>,
    onSubmit: (values: T) => Promise<void>,
    submitButtonText?: string,
}

const AppFormikForm = <T, >({
    initialValues,
    validationSchema,
    config,
    onSubmit,
    submitButtonText = 'Submit'
}: AppFormikFormProps<T>): JSX.Element => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <AppForm>
                    <AppFormikFormFields config={config} />
                    <AppFormikSubmitButton>{submitButtonText}</AppFormikSubmitButton>
                </AppForm>
            </Form>
        </Formik>
    );
};

export default AppFormikForm;
