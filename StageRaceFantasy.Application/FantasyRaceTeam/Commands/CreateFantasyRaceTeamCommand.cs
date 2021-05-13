using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaceTeam.Commands
{
    public record CreateFantasyRaceTeamCommand :
        IAppRequest<int>,
        IMapTo<FantasyRaceTeamEntity>
    {
        public string Name { get; init; } = "";

        public int FantasyRaceId { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateFantasyRaceTeamCommand, FantasyRaceTeamEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateFantasyRaceTeamCommandHandler : AppRequestHandler<CreateFantasyRaceTeamCommand, int>
    {
        public CreateFantasyRaceTeamCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(CreateFantasyRaceTeamCommand command, CancellationToken cancellationToken)
        {
            var fantasyRaceEntity = await DbContext.FantasyRaces
                .FirstOrDefaultAsync(_ => _.Id == command.FantasyRaceId, cancellationToken);

            if (fantasyRaceEntity is null)
            {
                return BadRequest($"No fantasy race exists with id {command.FantasyRaceId}.");
            }

            var fantasyRaceTeamEntity = Mapper.Map<FantasyRaceTeamEntity>(command);

            fantasyRaceEntity.FantasyTeams.Add(fantasyRaceTeamEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(fantasyRaceTeamEntity.Id);
        }
    }
}
