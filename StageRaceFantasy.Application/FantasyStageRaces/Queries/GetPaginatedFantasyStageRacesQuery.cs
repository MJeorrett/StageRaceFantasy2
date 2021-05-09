using AutoMapper.QueryableExtensions;
using MbhApi.Application.Common.Models;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyStageRaces.Queries
{
    public record GetPaginatedFantasyStageRacesQuery : GetPaginatedListQuery, IAppRequest<PaginatedList<FantasyStageRaceSummaryDto>>
    {
    }

    public class GetAllFantasyStageRacesQueryHandler : AppRequestHandler<GetPaginatedFantasyStageRacesQuery, PaginatedList<FantasyStageRaceSummaryDto>>
    {
        public GetAllFantasyStageRacesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<PaginatedList<FantasyStageRaceSummaryDto>>> Handle(
            GetPaginatedFantasyStageRacesQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.FantasyStageRaces
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyStageRaceSummaryDto>(Mapper.ConfigurationProvider)
                .ToPaginatedListAsync(query, cancellationToken);

            return Success(result);
        }
    }
}
