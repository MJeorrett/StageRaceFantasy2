using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyStageRaces.Queries
{
    public record GetAllFantasyStageRacesQuery : IAppRequest<List<FantasyStageRaceSummaryDto>>
    {
    }

    public class GetAllFantasyStageRacesQueryHandler : AppRequestHandler<GetAllFantasyStageRacesQuery, List<FantasyStageRaceSummaryDto>>
    {
        public GetAllFantasyStageRacesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<FantasyStageRaceSummaryDto>>> Handle(GetAllFantasyStageRacesQuery request, CancellationToken cancellationToken)
        {
            var result = await DbContext.FantasyStageRaces
                .ProjectTo<FantasyStageRaceSummaryDto>(Mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Success(result);
        }
    }
}
