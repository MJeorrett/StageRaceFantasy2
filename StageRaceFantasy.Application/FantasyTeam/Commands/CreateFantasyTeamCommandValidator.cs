using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.FantasyTeam.Commands
{
    public class CreateFantasyTeamCommandValidator : AbstractValidator<CreateFantasyTeamCommand>
    {
        public CreateFantasyTeamCommandValidator(IFantasyRacesRepository fantasyRacesRepository)
        {
            RuleFor(_ => _.FantasyRaceId)
                .EntityWithIdExists(fantasyRacesRepository)
                    .WithMessage(command => $"No fantasy race exists with id {command.FantasyRaceId}.");
        }
    }
}
