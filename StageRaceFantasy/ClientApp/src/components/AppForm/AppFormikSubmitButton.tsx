import React from 'react';
import { FormikProps, useFormikContext } from 'formik';
import AppButton, { AppButtonProps } from '../AppButton';

export interface AppFormikSubmitButtonProps extends AppButtonProps {
    formikProps?: FormikProps<unknown>
}
 
const AppFormikSubmitButton: React.FC<AppFormikSubmitButtonProps> = ({
    formikProps, // Passed in when used outside of formik context.
    showSpinner,
    disabled,
    ...restOfProps
}) => {
    const contextFormikProps = useFormikContext();
    const guaranteedFormikProps = formikProps || contextFormikProps;
    const { isSubmitting } = guaranteedFormikProps;

    return (
        <AppButton
            {...restOfProps}
            type="submit"
            showSpinner={showSpinner || isSubmitting}
            disabled={disabled || isSubmitting}
        />
    );
};
 
export default AppFormikSubmitButton;