import * as Yup from 'yup';

import { ApiFantasyRace } from '../../api/models';

export const defaultValues: ApiFantasyRace.CreateUpdateDto = {
    name: '',
    fantasyTeamSize: 6,
    startDate: new Date(),
    endDate: new Date(),
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required(),
    fantasyTeamSize: Yup.number().required().min(1),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
});