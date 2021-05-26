import * as Yup from 'yup';

import { ApiFantasyRaceTeam } from '../../api/models';

export const defaultValues: ApiFantasyRaceTeam.CreateUpdateDto = {
    name: '',
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required(),
});