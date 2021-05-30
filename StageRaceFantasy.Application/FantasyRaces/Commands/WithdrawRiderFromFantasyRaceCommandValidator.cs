using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public class WithdrawRiderFromFantasyRaceCommandValidator : AbstractValidator<WithdrawRiderFromFantasyRaceCommand>
    {
        public WithdrawRiderFromFantasyRaceCommandValidator(
            IRidersRepository ridersRepository,
            IFantasyRacesRepository fantasyRacesRepository)
        {
            RuleFor(_ => _.RiderId)
                .EntityWithIdExists(ridersRepository)
                    .WithMessage(command => $"No rider with id {command.RiderId} exists.");

            RuleFor(_ => _.FantasyRaceId)
                .EntityWithIdExists(fantasyRacesRepository)
                    .WithMessage(command => $"No fantasy race with id {command.FantasyRaceId}.");
        }
    }
}
