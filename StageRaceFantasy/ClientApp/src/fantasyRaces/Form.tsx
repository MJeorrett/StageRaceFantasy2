import React from 'react';

import { ApiFantasyRace } from '../api/models';
import { defaultValues, validationSchema } from './formValues';
import AppFormikForm from '../components/AppForm/AppFormikForm';

export type FantasyRaceFormProps = {
    initialValues?: ApiFantasyRace.CreateUpdateDto,
    onSubmit: (values: ApiFantasyRace.CreateUpdateDto) => Promise<void>
    submitButtonText?: string,
    autofocus?: boolean,
}

const FantasyRaceForm: React.FC<FantasyRaceFormProps> = ({
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
                fantasyTeamSize: {
                    type: 'number',
                    label: 'Team Size',
                },
                startDate: {
                    type: 'startDate',
                    label: 'Start Date',
                    endFieldName: 'endDate',
                    endFieldLabel: 'End Date',
                },
                endDate: {
                    type: 'endDate',
                }
            }}
        />
    );
};

export default FantasyRaceForm;
