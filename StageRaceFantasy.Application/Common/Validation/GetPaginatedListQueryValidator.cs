using FluentValidation;
using StageRaceFantasy.Application.Common.Requests;

namespace StageRaceFantasy.Application.Common.Validation
{
    public class GetPaginatedListQueryValidator<T> : AbstractValidator<T> where T : GetPaginatedListQuery
    {
        public GetPaginatedListQueryValidator()
        {
            RuleFor(_ => _.PageNumber)
                .GreaterThanOrEqualTo(1);

            RuleFor(_ => _.PageSize)
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(100);
        }
    }
}
