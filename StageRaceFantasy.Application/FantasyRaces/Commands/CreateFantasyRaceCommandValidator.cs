using FluentValidation;

namespace StageRaceFantasy.Application.FantasyRaces.Commands
{
    public class CreateFantasyRaceCommandValidator : AbstractValidator<CreateFantasyRaceCommand>
    {
        public CreateFantasyRaceCommandValidator()
        {
            RuleFor(_ => _.Name).FantasyRaceNameRules();
            RuleFor(_ => _.FantasyTeamSize).FantasyRaceTeamSizeRules();
            RuleFor(_ => _.StartDate).FantasyRaceStartTimeRules();
            RuleFor(_ => _.EndDate).FantasyRaceEndTimeRules();
        }
    }
}
