using FluentValidation;

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
        }
    }
}
