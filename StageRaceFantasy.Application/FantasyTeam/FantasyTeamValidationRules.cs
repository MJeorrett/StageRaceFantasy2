using FluentValidation;

namespace StageRaceFantasy.Application.FantasyTeam
{
    public static class FantasyTeamValidationRules
    {
        public static IRuleBuilder<T, string> FantasyTeamNameRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder
                .NotNull()
                .NotEmpty()
                .MaximumLength(100);

            return ruleBuilder;
        }
    }
}
