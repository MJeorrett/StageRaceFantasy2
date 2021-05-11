using FluentValidation;
using System;

namespace StageRaceFantasy.Application.FantasyStageRaces.Commands
{
    public class CreateFantasyStageRaceCommandValidator : AbstractValidator<CreateFantasyStageRaceCommand>
    {
        public CreateFantasyStageRaceCommandValidator()
        {
            RuleFor(_ => _.Name)
                .NotNull();

            RuleFor(_ => _.FantasyTeamSize)
                .GreaterThan(0);

            RuleFor(_ => _.StartDate)
                .FantasyStageRaceStartTimeRules();

            RuleFor(_ => _.EndDate)
                .FantasyStageRaceEndTimeRules();
        }
    }
}
