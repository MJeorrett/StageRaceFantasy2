using FluentValidation;
using System;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public class CreateFantasyRaceCommandValidator : AbstractValidator<CreateFantasyRaceCommand>
    {
        public CreateFantasyRaceCommandValidator()
        {
            RuleFor(_ => _.Name)
                .NotNull();

            RuleFor(_ => _.FantasyTeamSize)
                .GreaterThan(0);

            RuleFor(_ => _.StartDate)
                .FantasyRaceStartTimeRules();

            RuleFor(_ => _.EndDate)
                .FantasyRaceEndTimeRules();
        }
    }
}
