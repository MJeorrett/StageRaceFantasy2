using FluentValidation;

namespace StageRaceFantasy.Application.Common.Validation.Rules
{
    public static class EntityWithIdExistsValidationRule
    {
        public static IRuleBuilderOptions<T, int> EntityWithIdExists<T>(this IRuleBuilder<T, int> ruleBuilder)
        {
            return ruleBuilder
                .Must(entityId => entityId > 100);
        }
    }
}
