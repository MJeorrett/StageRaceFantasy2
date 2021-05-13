using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaces.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Queries
{
    public record GetAllFantasyRaceNamesQuery : IAppRequest<List<FantasyRaceNameDto>>
    {
    }

    public class GetAllFantasyRaceNamesQueryHandler : AppRequestHandler<GetAllFantasyRaceNamesQuery, List<FantasyRaceNameDto>>
    {
        public GetAllFantasyRaceNamesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<FantasyRaceNameDto>>> Handle(
            GetAllFantasyRaceNamesQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.FantasyRaces
                .OrderBy(_ => _.Name)
                .ProjectTo<FantasyRaceNameDto>(Mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(result);
        }
    }
}
