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

namespace StageRaceFantasy.Application.Races.Commands
{
    public record UpdateRaceCommand :
        IAppRequest,
        IMapTo<RaceEntity>,
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
            profile.CreateMap<UpdateRaceCommand, RaceEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateRaceCommandHandler : AppRequestHandler<UpdateRaceCommand>
    {
        public UpdateRaceCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse> Handle(UpdateRaceCommand command, CancellationToken cancellationToken)
        {
            var raceEntity = await DbContext.Races
                .FirstOrDefaultAsync(_ => _.Id == command.Id, cancellationToken);

            if (raceEntity == default) return NotFound();

            Mapper.Map(command, raceEntity);

            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
