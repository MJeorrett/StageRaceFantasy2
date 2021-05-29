import * as Yup from 'yup';

import { ApiFantasyTeam } from '../api/models';

export const defaultValues: ApiFantasyTeam.CreateUpdateDto = {
    name: '',
    fantasyRaceId: -1,
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required(),
});