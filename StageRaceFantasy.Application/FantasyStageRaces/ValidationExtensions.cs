using FluentValidation;
using StageRaceFantasy.Application.Common.InternalInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyStageRaces
{
    public static class ValidationExtensions
    {
        public static IRuleBuilder<T, DateTime> FantasyStageRaceStartTimeRules<T>(this IRuleBuilder<T, DateTime> ruleBuilder)
        {
            ruleBuilder
                .NotEqual(default(DateTime))
                    .WithMessage("You must provide an StartTime.");

            return ruleBuilder;
        }

        public static IRuleBuilder<T, DateTime> FantasyStageRaceEndTimeRules<T>(this IRuleBuilder<T, DateTime> ruleBuilder)
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
