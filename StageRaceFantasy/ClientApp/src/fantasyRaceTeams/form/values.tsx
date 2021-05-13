import * as Yup from 'yup';

import { ApiFantasyRaceTeam } from '../../api/models';

export const defaultValues: ApiFantasyRaceTeam.CreateUpdateDto = {
    name: '',
    fantasyRaceId: -1,
};

export const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).required(),
    fantasyRaceId: Yup.number().min(1, 'You must select a race.'),
});