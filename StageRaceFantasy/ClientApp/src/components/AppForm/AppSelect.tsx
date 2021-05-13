import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@material-ui/core';
import React from 'react';
import AppLoader from '../AppLoader';

export type AppSelectOption = {
    value: number,
    label: string,
}

export interface AppSelectProps extends SelectProps {
    options: AppSelectOption[],
    helperText?: string,
    showPleaseSelect?: boolean,
    pleaseSelectText?: string,
    readonly?: boolean,
    isLoading?: boolean,
    onChangeCallback?: (optionValue: number) => void,
}

const AppSelect: React.FC<AppSelectProps> = ({
    label,
    options,
    helperText,
    error,
    showPleaseSelect = true,
    pleaseSelectText = '-- Please Select --',
    disabled,
    readonly,
    fullWidth = true,
    isLoading,
    onChangeCallback,
    onChange,
    ...restOfProps
}) => {
    const isDisabled = disabled || readonly;
    
    if (isLoading) {
        return (
            <AppLoader />
        );
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, child: React.ReactNode) => {
        onChangeCallback && onChangeCallback(event.target.value as number);
        onChange && onChange(event, child);
    };
    
    return (
        <FormControl fullWidth={fullWidth}>
            {label && (
                <InputLabel>{label}</InputLabel>
            )}
            <Select
                {...restOfProps}
                onChange={handleChange}
                disabled={isDisabled}
                fullWidth={fullWidth}
                error={error}
            >
                {showPleaseSelect && (
                    <MenuItem value={-1}>
                        {pleaseSelectText}
                    </MenuItem>
                )}
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default AppSelect;