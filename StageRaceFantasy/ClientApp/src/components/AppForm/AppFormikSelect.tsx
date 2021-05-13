import React from 'react';
import { useField } from 'formik';

import { FormikInputPropsKeys } from './common';
import AppSelect, { AppSelectProps } from './AppSelect';

export type AppSelectOption = {
    value: number,
    label: string,
}

export interface AppFormikSelectProps extends Omit<AppSelectProps, FormikInputPropsKeys> {
    name: string,
}

const AppFormikSelect: React.FC<AppFormikSelectProps> = ({
    name,
    ...restOfProps
}) => {
    const [inputProps, fieldMeta] = useField(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    return (
        <AppSelect
            {...restOfProps}
            {...inputProps}
            helperText={helperText}
            error={isError}
        />
    );
};

export default AppFormikSelect;