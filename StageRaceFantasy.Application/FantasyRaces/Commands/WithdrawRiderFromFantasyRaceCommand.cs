using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public record WithdrawRiderFromFantasyRaceCommand : IAppRequest
    {
        public int RiderId { get; init; }

        public int FantasyRaceId { get; set; }
    }

    public class WithdrawRiderFromFantasyRaceCommandHandler : AppRequestHandler<WithdrawRiderFromFantasyRaceCommand>
    {
        private readonly IFantasyRacesRepository _fantasyRacesRepository;
        public WithdrawRiderFromFantasyRaceCommandHandler(
            IHttpContextAccessor httpContextAccessor,
            IFantasyRacesRepository fantasyRacesRepository) :
            base(httpContextAccessor)
        {
            _fantasyRacesRepository = fantasyRacesRepository;
        }

        public override async Task<AppResponse> Handle(
            WithdrawRiderFromFantasyRaceCommand command,
            CancellationToken cancellationToken)
        {
            var existingEntryEntity = await _fantasyRacesRepository
                .GetRaceEntryForRiderOrDefault(command.FantasyRaceId, command.RiderId);

            if (existingEntryEntity is null)
            {
                return NoContent();
            }

            DbContext.RiderFantasyRaceEntries.Remove(existingEntryEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
