using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Dtos;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetPaginatedRacesQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<RaceSummaryDto>>
    {
    }

    public class GetPaginatedRacesQueryHandler : AppRequestHandler<GetPaginatedRacesQuery, PaginatedList<RaceSummaryDto>>
    {
        public GetPaginatedRacesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<RaceSummaryDto>>> Handle(
            GetPaginatedRacesQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.Races
                .OrderBy(_ => _.Name)
                .ProjectTo<RaceSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
