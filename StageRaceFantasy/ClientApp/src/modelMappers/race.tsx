import { ApiRace } from '../api/models';
import { Race } from '../models';

export const mapFromApiRaceSummary = (apiModel: ApiRace.Summary): Race.Summary => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});

export const mapFromApiRaceDetails = (apiModel: ApiRace.Details): Race.Details => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});