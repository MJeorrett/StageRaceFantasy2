import { ApiFantasyRace } from '../api/models';
import { FantasyRace } from '../models';

export const mapFromApiFantasyRaceSummary = (apiModel: ApiFantasyRace.Summary): FantasyRace.Summary => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});

export const mapFromApiFantasyRaceDetails = (apiModel: ApiFantasyRace.Details): FantasyRace.Details => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});