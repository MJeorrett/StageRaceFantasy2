using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.Races.Queries
{
    public class GetAllEnteredRiderIdsForRaceQueryValidator : AbstractValidator<GetAllEnteredRiderIdsForRaceQuery>
    {
        public GetAllEnteredRiderIdsForRaceQueryValidator(IRacesRepository racesRepository)
        {
            RuleFor(_ => _.RaceId)
                .EntityWithIdExists(racesRepository)
                    .WithMessage(query => $"No race exists with id {query.RaceId}.");
        }
    }
}
