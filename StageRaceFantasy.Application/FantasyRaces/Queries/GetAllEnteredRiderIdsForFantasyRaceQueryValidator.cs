using FluentValidation;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Application.Common.Validation.Rules;

namespace StageRaceFantasy.Application.FantasyRaces.Queries
{
    public class GetAllEnteredRiderIdsForFantasyRaceQueryValidator : AbstractValidator<GetAllEnteredRiderIdsForFantasyRaceQuery>
    {
        public GetAllEnteredRiderIdsForFantasyRaceQueryValidator(IFantasyRacesRepository fantasyRacesRepository)
        {
            RuleFor(_ => _.FantasyRaceId)
                .EntityWithIdExists(fantasyRacesRepository)
                    .WithMessage(query => $"No fantasy race exists with id {query.FantasyRaceId}.");
        }
    }
}
