import { ApiFantasyStageRace } from '../api/models';
import { FantasyStageRace } from '../models';

export const mapFromApiFantasyStageRaceSummary = (apiModel: ApiFantasyStageRace.Summary): FantasyStageRace.Summary => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});

export const mapFromApiFantasyStageRaceDetails = (apiModel: ApiFantasyStageRace.Details): FantasyStageRace.Details => ({
    ...apiModel,
    startDate: new Date(apiModel.startDate),
    endDate: new Date(apiModel.endDate),
});