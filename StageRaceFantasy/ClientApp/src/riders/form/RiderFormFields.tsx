import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { useField } from 'formik';
import React from 'react';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface RiderFormFields {
    autoFocus?: boolean,
}

const RiderFormFields: React.FC<RiderFormFields> = ({
    autoFocus,
}) => {
    return (
        <>
            <AppFormikTextField name="firstName" label="First Name" autoFocus={autoFocus} />
            <AppFormikTextField name="lastName" label="Last Name" />
        </>
    );
};

export default RiderFormFields;
