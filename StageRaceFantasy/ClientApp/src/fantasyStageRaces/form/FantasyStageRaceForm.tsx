import React from 'react';
import { Form } from 'formik';

import * as Fields from './Fields';
import AppForm from '../../components/AppForm';
import { AppFormikSubmitButton } from '../../components/AppForm';

const FantasyStageRaceForm: React.FC = () => {
    return (
        <Form>
            <AppForm>
                <Fields.Name />
                <Fields.FantasyTeamSize />
                <AppFormikSubmitButton>Create</AppFormikSubmitButton>
            </AppForm>
        </Form>
    );
};

export default FantasyStageRaceForm;
