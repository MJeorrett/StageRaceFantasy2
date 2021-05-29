using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyTeam.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyTeam.Queries
{
    public record GetFantasyTeamByIdQuery(
        int Id) :
        IAppRequest<FantasyTeamDetailsDto>
    {
    }

    public class GetFantasyRaceTeamByIdQueryHandler : AppRequestHandler<GetFantasyTeamByIdQuery, FantasyTeamDetailsDto>
    {
        public GetFantasyRaceTeamByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<FantasyTeamDetailsDto>> Handle(
            GetFantasyTeamByIdQuery query,
            CancellationToken cancellationToken)
        {
            var fantasyRaceTeamEntity = await DbContext.FantasyRaceTeams
                .FirstOrDefaultAsync(_ => _.Id == query.Id, cancellationToken);

            if (fantasyRaceTeamEntity is null)
            {
                return NotFound();
            }

            var fantasyRaceTeamDto = Mapper.Map<FantasyTeamDetailsDto>(fantasyRaceTeamEntity);

            return Ok(fantasyRaceTeamDto);
        }
    }
}
