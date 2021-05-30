import React from 'react';
import { ApiFantasyTeam as ApiFantasyTeam } from '../api/models';
import AppFormikForm from '../components/AppForm/AppFormikForm';
import { defaultValues, validationSchema } from './formValues';

export interface FantasyTeamFormProps {
    initialValues?: ApiFantasyTeam.CreateUpdateDto,
    onSubmit: (values: ApiFantasyTeam.CreateUpdateDto) => Promise<void>,
    submitButtonText?: string,
    autofocus?: boolean,
}
 
const FantasyTeamForm: React.FC<FantasyTeamFormProps> = ({
    initialValues = defaultValues,
    onSubmit,
    submitButtonText,
    autofocus,
}) => {
    return (
        <AppFormikForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
            autofocus={autofocus}
            config={{
                name: {
                    type: 'string',
                    label: 'Name',
                },
                raceId: {
                    type: 'hidden',
                }
            }}
        />
    );
};
 
export default FantasyTeamForm;