using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyTeam.Dtos;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyTeam.Queries
{
    public record GetPaginatedFantasyTeamsQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<FantasyTeamSummaryDto>>
    {
        [JsonIgnore]
        public int FantasyRaceId { get; set; }
    }

    public class GetPaginatedFantasyTeamsQueryHandler : AppRequestHandler<GetPaginatedFantasyTeamsQuery, PaginatedList<FantasyTeamSummaryDto>>
    {
        public GetPaginatedFantasyTeamsQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<FantasyTeamSummaryDto>>> Handle(
            GetPaginatedFantasyTeamsQuery query,
            CancellationToken cancellationToken)
        {
            var fantasyRace = await DbContext.FantasyRaces
                .FirstOrDefaultAsync(_ => _.Id == query.FantasyRaceId, cancellationToken);

            if (fantasyRace is null)
            {
                return BadRequest($"No fantasy race exists with id {query.FantasyRaceId}.");
            }

            var result = await DbContext.FantasyRaceTeams
                .Where(_ => _.FantasyRaceId == query.FantasyRaceId)
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyTeamSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
