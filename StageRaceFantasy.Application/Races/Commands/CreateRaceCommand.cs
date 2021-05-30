using AutoMapper;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Commands
{
    public record CreateRaceCommand :
        IAppRequest<int>,
        IMapTo<RaceEntity>,
        IHasStartAndEndDate
    {
        public string Name { get; init; } = null!;

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateRaceCommand, RaceEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateRaceCommandHandler : AppRequestHandler<CreateRaceCommand, int>
    {
        public CreateRaceCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(
            CreateRaceCommand command,
            CancellationToken cancellationToken)
        {
            var raceEntity = Mapper.Map<RaceEntity>(command);

            DbContext.Races.Add(raceEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(raceEntity.Id);
        }
    }
}
