import React from 'react';
import { useField, useFormikContext } from 'formik';
import { ChangeEventHandler } from 'react';
import AppTextField, { AppTextFieldProps } from './AppTextField';
import { FormikInputPropsKeys } from './common';

export interface AppFormikTextFieldProps extends
    Omit<AppTextFieldProps,
    FormikInputPropsKeys |
    'helperText' |
    'error'> {
    name: string,
    readonly?: boolean,
    forceUpperCase?: boolean,
}

const AppFormikTextField: React.FC<AppFormikTextFieldProps> = ({
    name,
    disabled,
    readonly,
    forceUpperCase,
    ...restOfProps
}) => {
    const { isSubmitting } = useFormikContext();
    const [fieldProps, fieldMeta, { setValue }] = useField(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    const handleChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = event => {
        const { value } = event.target;

        if (forceUpperCase) {
            setValue(value ? value.toUpperCase() : value);
        }
        else {
            setValue(value);
        }
    };

    return (
        <AppTextField
            {...restOfProps}
            {...fieldProps}
            onChange={handleChange}
            value={readonly ? (fieldProps.value || '-') : fieldProps.value}
            readonly={readonly}
            helperText={helperText}
            error={isError}
            disabled={readonly || isSubmitting || disabled}
        />
    );
};

export default AppFormikTextField;