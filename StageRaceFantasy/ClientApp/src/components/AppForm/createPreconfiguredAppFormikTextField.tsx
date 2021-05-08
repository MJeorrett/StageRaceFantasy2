import React from 'react';
import AppFormikTextField, { AppFormikTextFieldProps } from './AppFormikTextField';

export type CreatePreconfiguredAppFormikTextFieldOptions = {
    name: string,
    label: string,
    type?: string,
    multiline?: boolean,
    rows?: number
    autoComplete?: 'on' | 'off',
    forceUpperCase?: boolean,
}

export type PreconfiguredAppFormikTextFieldProps = Omit<AppFormikTextFieldProps, 'name' | 'forceUpperCase'>

export const createPreconfiguredAppFormikTextField = ({
    name,
    label,
    type = 'text',
    multiline = false,
    rows,
    autoComplete = 'on',
    forceUpperCase,
}: CreatePreconfiguredAppFormikTextFieldOptions): React.FC<PreconfiguredAppFormikTextFieldProps> => {
    const PreConfiguredAppFormikTextField = (restOfProps: PreconfiguredAppFormikTextFieldProps) => (
        <AppFormikTextField
            label={label}
            {...restOfProps}
            name={name}
            type={type}
            multiline={multiline}
            rows={rows}
            autoComplete={autoComplete}
            forceUpperCase={forceUpperCase}
        />
    );

    return PreConfiguredAppFormikTextField;
};

export default createPreconfiguredAppFormikTextField;