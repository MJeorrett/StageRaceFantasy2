using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Queries
{
    public record GetAllEnteredRiderIdsForFantasyRaceQuery(
        int FantasyRaceId) : IAppRequest<List<int>>
    {
    }

    public class GetAllEnteredRiderIdsForFantasyRaceQueryHandler : AppRequestHandler<GetAllEnteredRiderIdsForFantasyRaceQuery, List<int>>
    {
        public GetAllEnteredRiderIdsForFantasyRaceQueryHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<int>>> Handle(
            GetAllEnteredRiderIdsForFantasyRaceQuery query,
            CancellationToken cancellationToken)
        {
            var riderIds = await DbContext.RiderFantasyRaceEntries
                .Select(_ => _.RiderId)
                .ToListAsync(cancellationToken);

            return Ok(riderIds);
        }
    }
}
