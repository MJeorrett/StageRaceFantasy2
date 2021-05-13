using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaceTeam.Dtos;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaceTeam.Queries
{
    public record GetPaginatedFantasyRaceTeamsQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<FantasyRaceTeamSummaryDto>>
    {
    }

    public class GetPaginatedFantasyRaceTeamsQueryHandler : AppRequestHandler<GetPaginatedFantasyRaceTeamsQuery, PaginatedList<FantasyRaceTeamSummaryDto>>
    {
        public GetPaginatedFantasyRaceTeamsQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<FantasyRaceTeamSummaryDto>>> Handle(
            GetPaginatedFantasyRaceTeamsQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.FantasyRaces
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyRaceTeamSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
