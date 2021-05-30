using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Races.Queries
{
    public record GetRaceByIdQuery(
        int Id)
        : IAppRequest<RaceDetailsDto>
    {
    }

    public class GetRaceByIdQueryHandler : AppRequestHandler<GetRaceByIdQuery, RaceDetailsDto>
    {
        public GetRaceByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<RaceDetailsDto>> Handle(
            GetRaceByIdQuery query,
            CancellationToken cancellationToken)
        {
            var raceEntity = await DbContext.Races
                .FirstOrDefaultAsync(_ => _.Id == query.Id, cancellationToken);

            if (raceEntity == null)
            {
                return NotFound();
            }

            var raceDto = Mapper.Map<RaceDetailsDto>(raceEntity);

            return Ok(raceDto);
        }
    }
}
