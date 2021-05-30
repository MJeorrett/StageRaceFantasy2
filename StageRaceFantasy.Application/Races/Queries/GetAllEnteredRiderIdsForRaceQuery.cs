using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetAllEnteredRiderIdsForRaceQuery(
        int RaceId) : IAppRequest<List<int>>
    {
    }

    public class GetAllEnteredRiderIdsForRaceQueryHandler : AppRequestHandler<GetAllEnteredRiderIdsForRaceQuery, List<int>>
    {
        public GetAllEnteredRiderIdsForRaceQueryHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<int>>> Handle(
            GetAllEnteredRiderIdsForRaceQuery query,
            CancellationToken cancellationToken)
        {
            var riderIds = await DbContext.RiderRaceEntries
                .Where(_ => _.RaceId == query.RaceId)
                .Select(_ => _.RiderId)
                .ToListAsync(cancellationToken);

            return Ok(riderIds);
        }
    }
}
