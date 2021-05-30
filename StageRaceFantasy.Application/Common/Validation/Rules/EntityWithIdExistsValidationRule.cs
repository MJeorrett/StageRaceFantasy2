using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Domain.Common;

namespace StageRaceFantasy.Application.Common.Validation.Rules
{
    public static class EntityWithIdExistsValidationRule
    {
        public static IRuleBuilderOptions<T, int> EntityWithIdExists<T, TEntity>(
            this IRuleBuilder<T, int> ruleBuilder,
            IRepositoryBase<TEntity> repository)
            where TEntity : class, IEntity
        {
            return ruleBuilder
                .MustAsync((entityId, cancellationToken) => repository.AnyExistWithId(entityId, cancellationToken));
        }
    }
}
