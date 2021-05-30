import React from 'react';

import { ApiRace } from '../api/models';
import { defaultValues, validationSchema } from './formValues';
import AppFormikForm from '../components/AppForm/AppFormikForm';

export type RaceFormProps = {
    initialValues?: ApiRace.CreateUpdateDto,
    onSubmit: (values: ApiRace.CreateUpdateDto) => Promise<void>
    submitButtonText?: string,
    autofocus?: boolean,
}

const RaceForm: React.FC<RaceFormProps> = ({
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

export default RaceForm;
