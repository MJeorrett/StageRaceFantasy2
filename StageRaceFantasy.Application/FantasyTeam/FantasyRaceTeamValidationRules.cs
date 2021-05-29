using FluentValidation;

namespace StageRaceFantasy.Application.FantasyTeam
{
    public static class FantasyRaceTeamValidationRules
    {
        public static IRuleBuilder<T, string> FantasyRaceTeamNameRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder
                .NotNull()
                .NotEmpty()
                .MaximumLength(100);

            return ruleBuilder;
        }
    }
}
