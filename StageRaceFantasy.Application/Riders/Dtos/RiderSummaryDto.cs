using AutoMapper;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.Riders.Dtos
{
    public class RiderSummaryDto : IMapFrom<RiderEntity>
    {
        public int Id { get; init; }

        public string FirstName { get; init; } = "";

        public string LastName { get; init; } = "";

        public void Mapping(Profile profile)
        {
            profile.CreateMap<RiderEntity, RiderSummaryDto>();
            profile.CreateMap<RiderRaceEntryEntity, RiderSummaryDto>()
                .ForMember(_ => _.FirstName, options => options.MapFrom(_ => _.Rider.FirstName))
                .ForMember(_ => _.LastName, options => options.MapFrom(_ => _.Rider.LastName));
        }
    }
}
