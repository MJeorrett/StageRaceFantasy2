using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.FantasyRaceTeam.Dtos
{
    public record FantasyRaceTeamSummaryDto : IMapFrom<FantasyRaceTeamEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";
    }
}
