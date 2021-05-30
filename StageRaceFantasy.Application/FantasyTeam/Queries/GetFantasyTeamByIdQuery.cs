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

    public class GetFantasyTeamByIdQueryHandler : AppRequestHandler<GetFantasyTeamByIdQuery, FantasyTeamDetailsDto>
    {
        public GetFantasyTeamByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<FantasyTeamDetailsDto>> Handle(
            GetFantasyTeamByIdQuery query,
            CancellationToken cancellationToken)
        {
            var fantasyTeamEntity = await DbContext.FantasyTeams
                .FirstOrDefaultAsync(_ => _.Id == query.Id, cancellationToken);

            if (fantasyTeamEntity is null)
            {
                return NotFound();
            }

            var fantasyTeamDto = Mapper.Map<FantasyTeamDetailsDto>(fantasyTeamEntity);

            return Ok(fantasyTeamDto);
        }
    }
}
