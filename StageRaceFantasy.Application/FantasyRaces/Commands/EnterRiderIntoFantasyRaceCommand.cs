using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public record EnterRiderIntoFantasyRaceCommand : IAppRequest<int>
    {
        public int RiderId { get; init; }

        public int FantasyRaceId { get; set; }
    }

    public class EnterRiderIntoFantasyRaceCommandHandler : AppRequestHandler<EnterRiderIntoFantasyRaceCommand, int>
    {
        public EnterRiderIntoFantasyRaceCommandHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(
            EnterRiderIntoFantasyRaceCommand command,
            CancellationToken cancellationToken)
        {
            var riderFantasyRaceEntryEntity = new RiderFantasyRaceEntryEntity()
            {
                RiderId = command.RiderId,
                FantasyRaceId = command.FantasyRaceId,
            };

            DbContext.RiderFantasyRaceEntries.Add(riderFantasyRaceEntryEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok(riderFantasyRaceEntryEntity.Id);
        }
    }
}
