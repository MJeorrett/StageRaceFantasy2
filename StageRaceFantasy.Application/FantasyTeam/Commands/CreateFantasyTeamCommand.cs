using AutoMapper;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyTeam.Commands
{
    public record CreateFantasyTeamCommand :
        IAppRequest<int>,
        IMapTo<FantasyTeamEntity>
    {
        public string Name { get; init; } = "";

        public int RaceId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateFantasyTeamCommand, FantasyTeamEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateFantasyTeamCommandHandler : AppRequestHandler<CreateFantasyTeamCommand, int>
    {
        public CreateFantasyTeamCommandHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(
            CreateFantasyTeamCommand command,
            CancellationToken cancellationToken)
        {
            var fantasyTeamEntity = Mapper.Map<FantasyTeamEntity>(command);
            fantasyTeamEntity.RaceId = command.RaceId;

            DbContext.FantasyTeams.Add(fantasyTeamEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(fantasyTeamEntity.Id);
        }
    }
}
