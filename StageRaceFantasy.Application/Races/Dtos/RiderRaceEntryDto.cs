using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.Races.Dtos
{
    public record RiderRaceEntryDto : IMapFrom<RiderRaceEntryEntity>
    {
        public int RiderId { get; set; }
        public string RiderFirstName { get; set; } = "";
        public string RiderLastName { get; set; } = "";
    }
}
