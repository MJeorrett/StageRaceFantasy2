using FluentValidation;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using System;

namespace StageRaceFantasy.Application.FantasyRaces
{
    public static class FantasyRaceValidationRules
    {
        public static IRuleBuilder<T, string> FantasyRaceNameRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            ruleBuilder
                .NotNull()
                .NotEmpty()
                .MaximumLength(100);

            return ruleBuilder;
        }

        public static IRuleBuilder<T, int> FantasyRaceTeamSizeRules<T>(this IRuleBuilder<T, int> ruleBuilder)
        {
            ruleBuilder
                .InclusiveBetween(1, 10);

            return ruleBuilder;
        }

        public static IRuleBuilder<T, DateTime> FantasyRaceStartTimeRules<T>(this IRuleBuilder<T, DateTime> ruleBuilder)
        {
            ruleBuilder
                .NotEqual(default(DateTime))
                    .WithMessage("You must provide an StartTime.");

            return ruleBuilder;
        }

        public static IRuleBuilder<T, DateTime> FantasyRaceEndTimeRules<T>(this IRuleBuilder<T, DateTime> ruleBuilder)
            where T : IHasStartAndEndDate
        {
            ruleBuilder
                .NotEqual(default(DateTime))
                        .WithMessage("You must provide an EndDate.")
                    .GreaterThanOrEqualTo(_ => _.StartDate)
                        .WithMessage("Must be the same as or later than StartDate.");

            return ruleBuilder;
        }
    }
}
