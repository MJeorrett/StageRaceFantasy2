import * as Yup from 'yup';

import { ApiRider } from '../api/models';

export const defaultValues: ApiRider.CreateUpdateDto = {
    firstName: '',
    lastName: '',
};

export const validationSchema: Yup.SchemaOf<ApiRider.CreateUpdateDto> = Yup.object().shape({
    firstName: Yup.string().required('You must enter a first name'),
    lastName: Yup.string().required('You must enter a last name'),
});
