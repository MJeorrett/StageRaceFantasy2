using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.Races.Commands
{
    public class WithdrawRiderFromRaceCommandValidator : AbstractValidator<WithdrawRiderFromRaceCommand>
    {
        public WithdrawRiderFromRaceCommandValidator(
            IRidersRepository ridersRepository,
            IRacesRepository racesRepository)
        {
            RuleFor(_ => _.RiderId)
                .EntityWithIdExists(ridersRepository)
                    .WithMessage(command => $"No rider with id {command.RiderId} exists.");

            RuleFor(_ => _.RaceId)
                .EntityWithIdExists(racesRepository)
                    .WithMessage(command => $"No fantasy race with id {command.RaceId}.");
        }
    }
}
