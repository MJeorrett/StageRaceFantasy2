using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Riders.Dtos;
using StageRaceFantasy.Domain.Entities;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Riders.Queries
{
    public record GetPaginatedRidersQuery() : GetPaginatedListQuery, IAppRequest<PaginatedList<RiderSummaryDto>>
    {
        public string? NameFilter { get; init; }
    }

    public class GetPaginatedRidersQueryHandler : AppRequestHandler<GetPaginatedRidersQuery, PaginatedList<RiderSummaryDto>>
    {
        public GetPaginatedRidersQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<RiderSummaryDto>>> Handle(
            GetPaginatedRidersQuery query,
            CancellationToken cancellationToken)
        {
            IQueryable<RiderEntity> ridersQuery = string.IsNullOrEmpty(query.NameFilter) ?
                DbContext.Riders :
                DbContext.Riders
                    .Where(rider =>
                        rider.FirstName.Contains(query.NameFilter) ||
                        rider.LastName.Contains(query.NameFilter));

            var result = await ridersQuery
                .OrderBy(_ => _.LastName)
                .ProjectTo<RiderSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Ok(result);
        }
    }
}
