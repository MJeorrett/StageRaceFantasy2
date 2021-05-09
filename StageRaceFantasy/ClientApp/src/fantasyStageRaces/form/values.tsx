import * as Yup from 'yup';

import { ApiFantasyStageRace } from '../../api/models';

export const defaultValues: ApiFantasyStageRace.CreateUpdateDto = {
    name: '',
    fantasyTeamSize: 6,
};

export const validationSchema: Yup.SchemaOf<ApiFantasyStageRace.CreateUpdateDto> = Yup.object().shape({
    name: Yup.string().required(),
    fantasyTeamSize: Yup.number().required().min(1),
});