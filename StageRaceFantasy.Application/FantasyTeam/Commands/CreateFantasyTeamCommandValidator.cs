using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.FantasyTeam.Commands
{
    public class CreateFantasyTeamCommandValidator : AbstractValidator<CreateFantasyTeamCommand>
    {
        public CreateFantasyTeamCommandValidator(IRacesRepository rcesRepository)
        {
            RuleFor(_ => _.RaceId)
                .EntityWithIdExists(rcesRepository)
                    .WithMessage(command => $"No race exists with id {command.RaceId}.");
        }
    }
}
