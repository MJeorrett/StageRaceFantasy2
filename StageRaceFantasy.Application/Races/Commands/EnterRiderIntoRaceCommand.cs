using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Commands
{
    public record EnterRiderIntoRaceCommand : IAppRequest<int>
    {
        public int RiderId { get; init; }

        public int RaceId { get; set; }
    }

    public class EnterRiderIntoRaceCommandHandler : AppRequestHandler<EnterRiderIntoRaceCommand, int>
    {
        public EnterRiderIntoRaceCommandHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(
            EnterRiderIntoRaceCommand command,
            CancellationToken cancellationToken)
        {
            var riderRaceEntryEntity = new RiderRaceEntryEntity()
            {
                RiderId = command.RiderId,
                RaceId = command.RaceId,
            };

            DbContext.RiderRaceEntries.Add(riderRaceEntryEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok(riderRaceEntryEntity.Id);
        }
    }
}
