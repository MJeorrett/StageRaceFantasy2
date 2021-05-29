using FluentValidation;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.FantasyTeam.Commands
{
    public class CreateFantasyTeamCommandValidator : AbstractValidator<CreateFantasyTeamCommand>
    {
        public CreateFantasyTeamCommandValidator()
        {
            RuleFor(_ => _.FantasyRaceId)
                .EntityWithIdExists()
                    .WithMessage(command => $"No fantasy race exists with id {command.FantasyRaceId}.");
        }
    }
}
