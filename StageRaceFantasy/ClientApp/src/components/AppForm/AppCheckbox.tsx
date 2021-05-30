import React from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';
import AppLoader from '../AppLoader';

export interface AppCheckboxProps extends CheckboxProps {
    label?: string;
    readonly?: boolean;
    isLoading?: boolean,
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
    label,
    disabled,
    readonly,
    color = 'primary',
    isLoading,
    ...restOfProps
}) => {
    return (
        <FormControlLabel
            disabled={disabled || readonly}
            control={isLoading ?
                <AppLoader /> :
                <Checkbox
                    {...restOfProps}
                    disabled={disabled || readonly}
                    color={color}
                />
            }
            label={label}
        />
    );
};

export default AppCheckbox;
