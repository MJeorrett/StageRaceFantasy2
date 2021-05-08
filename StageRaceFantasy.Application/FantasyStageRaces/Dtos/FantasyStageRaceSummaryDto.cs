using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.FantasyStageRaces.Dtos
{
    public class FantasyStageRaceSummaryDto : IMapFrom<FantasyStageRaceEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";
    }
}
