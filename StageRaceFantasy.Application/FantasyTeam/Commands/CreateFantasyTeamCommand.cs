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
        IMapTo<FantasyRaceTeamEntity>
    {
        public string Name { get; init; } = "";

        public int FantasyRaceId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateFantasyTeamCommand, FantasyRaceTeamEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateFantasyTeamCommandHandler : AppRequestHandler<CreateFantasyTeamCommand, int>
    {
        public CreateFantasyTeamCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(CreateFantasyTeamCommand command, CancellationToken cancellationToken)
        {
            var fantasyRaceTeamEntity = Mapper.Map<FantasyRaceTeamEntity>(command);
            fantasyRaceTeamEntity.FantasyRaceId = command.FantasyRaceId;
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(fantasyRaceTeamEntity.Id);
        }
    }
}
