using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetAllRaceNamesQuery : IAppRequest<List<RaceNameDto>>
    {
    }

    public class GetAllRaceNamesQueryHandler : AppRequestHandler<GetAllRaceNamesQuery, List<RaceNameDto>>
    {
        public GetAllRaceNamesQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<List<RaceNameDto>>> Handle(
            GetAllRaceNamesQuery query,
            CancellationToken cancellationToken)
        {
            var result = await DbContext.Races
                .OrderBy(_ => _.Name)
                .ProjectTo<RaceNameDto>(Mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(result);
        }
    }
}
