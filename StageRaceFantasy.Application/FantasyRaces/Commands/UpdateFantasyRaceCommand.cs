using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public record UpdateFantasyRaceCommand :
        IAppRequest,
        IMapTo<FantasyRaceEntity>,
        IHasStartAndEndDate
    {
        [JsonIgnore]
        public int Id { get; init; }

        public string Name { get; init; } = null!;

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateFantasyRaceCommand, FantasyRaceEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateFantasyRaceCommandHandler : AppRequestHandler<UpdateFantasyRaceCommand>
    {
        public UpdateFantasyRaceCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse> Handle(UpdateFantasyRaceCommand command, CancellationToken cancellationToken)
        {
            var fantasyRaceEntity = await DbContext.FantasyRaces
                .FirstOrDefaultAsync(_ => _.Id == command.Id, cancellationToken);

            if (fantasyRaceEntity == default) return NotFound();

            Mapper.Map(command, fantasyRaceEntity);

            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
