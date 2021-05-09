using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.FantasyStageRaces.Queries
{
    public record GetFantasyStageRaceByIdQuery(
        int Id)
        : IAppRequest<FantasyStageRaceDetailsDto>
    {
    }

    public class GetFantasyStageRaceByIdQueryHandler : AppRequestHandler<GetFantasyStageRaceByIdQuery, FantasyStageRaceDetailsDto>
    {
        public GetFantasyStageRaceByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<FantasyStageRaceDetailsDto>> Handle(
            GetFantasyStageRaceByIdQuery query,
            CancellationToken cancellationToken)
        {
            var raceEntity = await DbContext.FantasyStageRaces
                .FirstOrDefaultAsync(_ => _.Id == query.Id, cancellationToken);

            if (raceEntity == default)
            {
                return NotFound();
            }

            var raceDto = Mapper.Map<FantasyStageRaceDetailsDto>(raceEntity);

            return Success(raceDto);
        }
    }
}
