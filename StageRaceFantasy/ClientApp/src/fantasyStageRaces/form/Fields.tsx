import { createPreconfiguredAppFormikTextField } from '../../components/AppForm';

export const Name = createPreconfiguredAppFormikTextField({ name: 'name', label: 'Name' });
export const FantasyTeamSize = createPreconfiguredAppFormikTextField({ type: 'number', name: 'fantasyTeamSize', label: 'Team Size' });