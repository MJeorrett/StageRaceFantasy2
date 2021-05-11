using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaces.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyRaces.Queries
{
    public record GetFantasyRaceByIdQuery(
        int Id)
        : IAppRequest<FantasyRaceDetailsDto>
    {
    }

    public class GetFantasyRaceByIdQueryHandler : AppRequestHandler<GetFantasyRaceByIdQuery, FantasyRaceDetailsDto>
    {
        public GetFantasyRaceByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<FantasyRaceDetailsDto>> Handle(
            GetFantasyRaceByIdQuery query,
            CancellationToken cancellationToken)
        {
            var raceEntity = await DbContext.FantasyRaces
                .FirstOrDefaultAsync(_ => _.Id == query.Id, cancellationToken);

            if (raceEntity == default)
            {
                return NotFound();
            }

            var raceDto = Mapper.Map<FantasyRaceDetailsDto>(raceEntity);

            return Success(raceDto);
        }
    }
}
