using FluentValidation;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public class UpdateFantasyRaceCommandValidator : AbstractValidator<UpdateFantasyRaceCommand>
    {
        public UpdateFantasyRaceCommandValidator()
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
