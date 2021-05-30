using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Commands
{
    public record WithdrawRiderFromRaceCommand : IAppRequest
    {
        public int RiderId { get; init; }

        public int RaceId { get; set; }
    }

    public class WithdrawRiderFromRaceCommandHandler : AppRequestHandler<WithdrawRiderFromRaceCommand>
    {
        private readonly IRacesRepository _racesRepository;
        public WithdrawRiderFromRaceCommandHandler(
            IHttpContextAccessor httpContextAccessor,
            IRacesRepository racesRepository) :
            base(httpContextAccessor)
        {
            _racesRepository = racesRepository;
        }

        public override async Task<AppResponse> Handle(
            WithdrawRiderFromRaceCommand command,
            CancellationToken cancellationToken)
        {
            var existingEntryEntity = await _racesRepository
                .GetRaceEntryForRiderOrDefault(command.RaceId, command.RiderId);

            if (existingEntryEntity is null)
            {
                return NoContent();
            }

            DbContext.RiderRaceEntries.Remove(existingEntryEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
