using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.FantasyRaces.Dtos
{
    public class FantasyRaceNameDto : IMapFrom<FantasyRaceEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";
    }
}
