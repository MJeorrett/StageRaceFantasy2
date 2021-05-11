using FluentValidation;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using System;

namespace StageRaceFantasy.Application.FantasyRaces
{
    public static class ValidationExtensions
    {
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
