import React from 'react';
import AppFormikTextField from './AppFormikTextField';
import AppFormikStartAndEndDatePicker from './AppStartAndEndDatePicker';

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

export type AppFormikHiddenFieldConfig = {
    type: 'hidden',
}

export type AppFormikFormFieldConfig =
    AppFormikFormTextFieldConfig |
    AppFormikFormStartDateFieldConfig |
    AppFormikFormEndDateFieldConfig |
    AppFormikHiddenFieldConfig;

export type AppFormikFormFieldsConfig<T> = {
    [Property in keyof T]: AppFormikFormFieldConfig;
}

export type AppFormikFormFieldsProps<T> = {
    config: AppFormikFormFieldsConfig<T>,
    autofocus?: boolean,
}

const AppFormikFormFields = <T,>({
    config,
    autofocus,
}: AppFormikFormFieldsProps<T>): JSX.Element => {
    return (
        <>
            {Object.keys(config).map((fieldName, index) => {
                const fieldConfig = config[fieldName as keyof T] as AppFormikFormFieldConfig;

                if (fieldConfig.type === 'endDate' ||
                    fieldConfig.type === 'hidden') {
                    return null;
                }

                if (fieldConfig.type === 'startDate') {
                    return (
                        <AppFormikStartAndEndDatePicker
                            startFieldName={fieldName}
                            startFieldLabel={fieldConfig.label}
                            endFieldName={fieldConfig.endFieldName}
                            endFieldLabel={fieldConfig.endFieldLabel}
                        />
                    );
                }

                return (
                    <AppFormikTextField
                        autoFocus={autofocus && index === 0}
                        key={fieldName}
                        name={fieldName}
                        label={fieldConfig.label}
                        type={fieldConfig.type}
                    />
                );
            })}
        </>
    );
};

export default AppFormikFormFields;
