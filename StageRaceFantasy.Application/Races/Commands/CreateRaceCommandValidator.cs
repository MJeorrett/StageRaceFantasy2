using FluentValidation;

namespace StageRaceFantasy.Application.Races.Commands
{
    public class CreateRaceCommandValidator : AbstractValidator<CreateRaceCommand>
    {
        public CreateRaceCommandValidator()
        {
            RuleFor(_ => _.Name).RaceNameRules();
            RuleFor(_ => _.FantasyTeamSize).RaceTeamSizeRules();
            RuleFor(_ => _.StartDate).RaceStartTimeRules();
            RuleFor(_ => _.EndDate).RaceEndTimeRules();
        }
    }
}
