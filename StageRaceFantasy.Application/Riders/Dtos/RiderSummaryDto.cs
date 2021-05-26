using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.Riders.Dtos
{
    public class RiderSummaryDto : IMapFrom<RiderEntity>
    {
        public int Id { get; init; }

        public string FirstName { get; init; } = "";

        public string LastName { get; init; } = "";
    }
}
