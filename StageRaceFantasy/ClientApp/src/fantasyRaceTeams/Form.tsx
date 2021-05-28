import React from 'react';
import { ApiFantasyRaceTeam } from '../api/models';
import AppFormikForm from '../components/AppForm/AppFormikForm';
import { defaultValues, validationSchema } from './formValues';

export interface FantasyRacesFormProps {
    initialValues?: ApiFantasyRaceTeam.CreateUpdateDto,
    onSubmit: (values: ApiFantasyRaceTeam.CreateUpdateDto) => Promise<void>,
    submitButtonText?: string,
}
 
const FantasyRacesForm: React.FC<FantasyRacesFormProps> = ({
    initialValues = defaultValues,
    onSubmit,
    submitButtonText,
}) => {
    return (
        <AppFormikForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
            config={{
                name: {
                    type: 'string',
                    label: 'Name',
                }
            }}
        />
    );
};
 
export default FantasyRacesForm;