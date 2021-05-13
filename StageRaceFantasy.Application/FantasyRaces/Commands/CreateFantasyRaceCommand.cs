using AutoMapper;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public record CreateFantasyRaceCommand :
        IAppRequest<int>,
        IMapTo<FantasyRaceEntity>,
        IHasStartAndEndDate
    {
        public string Name { get; init; } = null!;

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateFantasyRaceCommand, FantasyRaceEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateFantasyRaceCommandHandler : AppRequestHandler<CreateFantasyRaceCommand, int>
    {
        public CreateFantasyRaceCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(
            CreateFantasyRaceCommand command,
            CancellationToken cancellationToken)
        {
            var fantasyRaceEntity = Mapper.Map<FantasyRaceEntity>(command);

            DbContext.FantasyRaces.Add(fantasyRaceEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(fantasyRaceEntity.Id);
        }
    }
}
