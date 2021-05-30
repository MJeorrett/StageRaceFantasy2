using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Dtos;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetPaginatedRidersEnteredInRaceQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<RiderRaceEntryDto>>
    {
        [JsonIgnore]
        public int RaceId { get; set; }
    }

    public class GetPaginatedRidersEnteredInRaceQueryHandler : AppRequestHandler<GetPaginatedRidersEnteredInRaceQuery, PaginatedList<RiderRaceEntryDto>>
    {
        public GetPaginatedRidersEnteredInRaceQueryHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<RiderRaceEntryDto>>> Handle(
            GetPaginatedRidersEnteredInRaceQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.RiderRaceEntries
                .Include(_ => _.Rider)
                .Where(_ => _.RaceId == query.RaceId)
                .ProjectTo<RiderRaceEntryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
