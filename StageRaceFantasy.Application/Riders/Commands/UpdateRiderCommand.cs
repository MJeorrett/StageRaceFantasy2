using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Riders.Commands
{
    public record UpdateRiderCommand :
        IAppRequest,
        IMapTo<RiderEntity>
    {
        [JsonIgnore]
        public int Id { get; set; }

        public string FirstName { get; init; } = "";

        public string LastName { get; init; } = "";

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateRiderCommand, RiderEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class UpdateRiderCommandHandler : AppRequestHandler<UpdateRiderCommand>
    {
        public UpdateRiderCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse> Handle(UpdateRiderCommand command, CancellationToken cancellationToken)
        {
            var riderEntity = await DbContext.Riders
                .FirstOrDefaultAsync(_ => _.Id == command.Id, cancellationToken);

            if (riderEntity is null) return NotFound();

            Mapper.Map(command, riderEntity);

            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
