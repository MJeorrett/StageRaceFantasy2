import React from 'react';
import { useTheme } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useField, useFormikContext } from 'formik';
import { FormikInputPropsKeys } from './common';

export interface AppFormikDatePickerProps extends
    Omit<KeyboardDatePickerProps,
    FormikInputPropsKeys |
    'helperText' |
    'error' |
    'variant' |
    'InputLabelProps' |
    'InputProps' |
    'style'> {
    name: string,
    readonly?: boolean,
    onChangeCallback?: (date: ParsableDate) => void,
}

const AppFormikDatePicker: React.FC<AppFormikDatePickerProps> = ({
    name,
    fullWidth = true,
    disabled,
    readonly,
    keyboardIcon,
    onChangeCallback,
    ...restOfProps
}) => {
    const theme = useTheme();
    const { isSubmitting } = useFormikContext();
    const [fieldProps, fieldMeta, { setValue }] = useField<ParsableDate>(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    const format = readonly ?
        !fieldProps.value ? '-' : 'do MMMM yyyy hh:mmaaa' :
        'dd/MM/yyyy';

    const handleChange = (newDate: MaterialUiPickersDate) => {
        onChangeCallback && onChangeCallback(newDate);
        setValue(newDate);
    };

    return (
        <KeyboardDatePicker
            {...restOfProps}
            {...fieldProps}
            onChange={handleChange}
            autoOk
            value={(readonly && !fieldProps.value) ? new Date() : (fieldProps.value || null)}
            format={format}
            placeholder="dd/mm/yyyy"
            helperText={helperText}
            error={isError}
            disabled={readonly || isSubmitting || disabled}
            fullWidth={fullWidth}
            InputLabelProps={{
                style: {
                    color: readonly ? theme.palette.text.secondary : undefined,
                },
            }}
            InputProps={{
                disableUnderline: readonly || undefined,
                style: {
                    color: readonly ? 'currentColor' : undefined,
                }
            }}
            keyboardIcon={keyboardIcon ? keyboardIcon : readonly ? false : undefined}
        />
    );
};

export default AppFormikDatePicker;