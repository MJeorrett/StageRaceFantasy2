using FluentValidation;

namespace StageRaceFantasy.Application.Races.Commands
{
    public class UpdateRaceCommandValidator : AbstractValidator<UpdateRaceCommand>
    {
        public UpdateRaceCommandValidator()
        {
            RuleFor(_ => _.Name).RaceNameRules();
            RuleFor(_ => _.FantasyTeamSize).RaceTeamSizeRules();
            RuleFor(_ => _.StartDate).RaceStartTimeRules();
            RuleFor(_ => _.EndDate).RaceEndTimeRules();
        }
    }
}
