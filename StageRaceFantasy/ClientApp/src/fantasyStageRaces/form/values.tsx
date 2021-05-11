import * as Yup from 'yup';

import { ApiFantasyStageRace } from '../../api/models';

export const defaultValues: ApiFantasyStageRace.CreateUpdateDto = {
    name: '',
    fantasyTeamSize: 6,
    startDate: new Date(),
    endDate: new Date(),
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    fantasyTeamSize: Yup.number().required().min(1),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
});