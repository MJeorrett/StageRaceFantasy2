import React from 'react';
import AppFormikSelect, { AppSelectProps } from './AppFormikSelect';

export type CreatePreconfiguredAppFormikSelectOptions = {
    name: string,
    label: string,
    showPleaseSelect?: boolean,
    pleaseSelectText?: string,
}

export type PreconfiguredAppFormikSelectProps = Omit<AppSelectProps, 'name'>

export const createPreconfiguredAppFormikSelect = ({
    name,
    label,
    showPleaseSelect,
    pleaseSelectText
}: CreatePreconfiguredAppFormikSelectOptions): React.FC<PreconfiguredAppFormikSelectProps> => {
    const PreConfiguredAppFormikSelect = (restOfProps: PreconfiguredAppFormikSelectProps) => (
        <AppFormikSelect label={label} showPleaseSelect={showPleaseSelect} pleaseSelectText={pleaseSelectText} {...restOfProps} name={name} />
    );

    return PreConfiguredAppFormikSelect;
};

export default createPreconfiguredAppFormikSelect;