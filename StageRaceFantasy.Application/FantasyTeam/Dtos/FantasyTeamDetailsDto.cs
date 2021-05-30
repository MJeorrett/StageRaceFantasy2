using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.FantasyTeam.Dtos
{
    public record FantasyTeamDetailsDto : IMapFrom<FantasyTeamEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";
    }
}
