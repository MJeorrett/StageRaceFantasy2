using FluentValidation;
using StageRaceFantasy.Application.Common.Requests;

namespace StageRaceFantasy.Application.Common.Validation
{
    public abstract class GetPaginatedListQueryValidator<T> : AbstractValidator<T> where T : GetPaginatedListQuery
    {
        protected virtual bool AllAllowed { get; } = false;

        public GetPaginatedListQueryValidator()
        {
            RuleFor(_ => _.PageNumber)
                .GreaterThanOrEqualTo(1);

            if (AllAllowed)
            {
                RuleFor(_ => _.PageSize)
                    .Must(pageNumber => pageNumber == -1 || pageNumber >= 1)
                        .WithMessage("Must be -1 (indicating return all items on one page) or greater than 0.")
                    .LessThanOrEqualTo(100);
            }
            else
            {
                RuleFor(_ => _.PageSize)
                    .InclusiveBetween(1, 100);
            }
        }
    }
}
