using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaceTeam.Dtos;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaceTeam.Queries
{
    public record GetPaginatedFantasyRaceTeamsQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<FantasyRaceTeamSummaryDto>>
    {
        [JsonIgnore]
        public int FantasyRaceId { get; set; }
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
            var fantasyRace = await DbContext.FantasyRaces
                .FirstOrDefaultAsync(_ => _.Id == query.FantasyRaceId, cancellationToken);

            if (fantasyRace is null)
            {
                return BadRequest($"No fantasy race exists with id {query.FantasyRaceId}.");
            }

            var result = await DbContext.FantasyRaceTeams
                .Where(_ => _.FantasyRaceId == query.FantasyRaceId)
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyRaceTeamSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
