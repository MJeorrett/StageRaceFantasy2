using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaces.Dtos;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Queries
{
    public record GetPaginatedFantasyRacesQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<FantasyRaceSummaryDto>>
    {
    }

    public class GetAllFantasyRacesQueryHandler : AppRequestHandler<GetPaginatedFantasyRacesQuery, PaginatedList<FantasyRaceSummaryDto>>
    {
        public GetAllFantasyRacesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<FantasyRaceSummaryDto>>> Handle(
            GetPaginatedFantasyRacesQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.FantasyRaces
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyRaceSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Success(result);
        }
    }
}
