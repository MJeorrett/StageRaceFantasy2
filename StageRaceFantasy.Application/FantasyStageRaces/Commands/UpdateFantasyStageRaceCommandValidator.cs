using FluentValidation;

namespace StageRaceFantasy.Application.FantasyStageRaces.Commands
{
    public class UpdateFantasyStageRaceCommandValidator : AbstractValidator<UpdateFantasyStageRaceCommand>
    {
        public UpdateFantasyStageRaceCommandValidator()
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
