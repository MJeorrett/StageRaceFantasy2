import React from 'react';
import { ApiFantasyRaceTeam } from '../api/models';
import AppFormikForm from '../components/AppForm/AppFormikForm';
import { defaultValues, validationSchema } from './formValues';

export interface FantasyRacesFormProps {
    initialValues?: ApiFantasyRaceTeam.CreateUpdateDto,
    onSubmit: (values: ApiFantasyRaceTeam.CreateUpdateDto) => Promise<void>,
}
 
const FantasyRacesForm: React.FC<FantasyRacesFormProps> = ({
    initialValues = defaultValues,
    onSubmit
}) => {
    return (
        <AppFormikForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
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