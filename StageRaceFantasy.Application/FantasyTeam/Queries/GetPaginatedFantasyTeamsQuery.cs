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
        public int RaceId { get; set; }
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
            var race = await DbContext.Races
                .FirstOrDefaultAsync(_ => _.Id == query.RaceId, cancellationToken);

            if (race is null)
            {
                return BadRequest($"No fantasy race exists with id {query.RaceId}.");
            }

            var result = await DbContext.FantasyTeams
                .Where(_ => _.RaceId == query.RaceId)
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyTeamSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
