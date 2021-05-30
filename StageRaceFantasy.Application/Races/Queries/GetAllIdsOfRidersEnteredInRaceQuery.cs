using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetAllIdsOfRidersEnteredInRaceQuery(
        int RaceId) : IAppRequest<List<int>>
    {
    }

    public class GetAllIdsOfRidersEnteredInRaceQueryHandler : AppRequestHandler<GetAllIdsOfRidersEnteredInRaceQuery, List<int>>
    {
        public GetAllIdsOfRidersEnteredInRaceQueryHandler(IHttpContextAccessor httpContextAccessor) :
            base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<int>>> Handle(
            GetAllIdsOfRidersEnteredInRaceQuery query,
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
