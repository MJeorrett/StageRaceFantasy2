using AutoMapper;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
using StageRaceFantasy.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyStageRaces.Commands
{
    public record CreateFantasyStageRaceCommand :
        IAppRequest<FantasyStageRaceSummaryDto>,
        IMapTo<FantasyStageRaceEntity>,
        IHasStartAndEndDate
    {
        public string Name { get; init; } = null!;

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateFantasyStageRaceCommand, FantasyStageRaceEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateFantasyStageRaceCommandHandler : AppRequestHandler<CreateFantasyStageRaceCommand, FantasyStageRaceSummaryDto>
    {
        public CreateFantasyStageRaceCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<FantasyStageRaceSummaryDto>> Handle(
            CreateFantasyStageRaceCommand command,
            CancellationToken cancellationToken)
        {
            var fantasyStageRaceEntity = Mapper.Map<FantasyStageRaceEntity>(command);

            DbContext.FantasyStageRaces.Add(fantasyStageRaceEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            var fantasyStageRaceSummaryDto = Mapper.Map<FantasyStageRaceSummaryDto>(fantasyStageRaceEntity);

            return Success(fantasyStageRaceSummaryDto);
        }
    }
}
