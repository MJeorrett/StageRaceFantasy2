using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.Races.Dtos
{
    public class RaceNameDto : IMapFrom<RaceEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";
    }
}
