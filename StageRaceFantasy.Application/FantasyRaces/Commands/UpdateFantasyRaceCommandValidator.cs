using FluentValidation;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public class UpdateFantasyRaceCommandValidator : AbstractValidator<UpdateFantasyRaceCommand>
    {
        public UpdateFantasyRaceCommandValidator()
        {
            RuleFor(_ => _.Name).FantasyRaceNameRules();
            RuleFor(_ => _.FantasyTeamSize).FantasyRaceTeamSizeRules();
            RuleFor(_ => _.StartDate).FantasyRaceStartTimeRules();
            RuleFor(_ => _.EndDate).FantasyRaceEndTimeRules();
        }
    }
}
