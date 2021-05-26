using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Riders.Dtos;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Riders.Queries
{
    public record GetRiderByIdQuery(
        int Id) 
        : IAppRequest<RiderDetailsDto>
    {
    }

    public class GetRiderByIdQueryHandler : AppRequestHandler<GetRiderByIdQuery, RiderDetailsDto>
    {
        public GetRiderByIdQueryHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<RiderDetailsDto>> Handle(
            GetRiderByIdQuery query,
            CancellationToken cancellationToken)
        {
            var riderEntity = await DbContext.Riders
                .FirstOrDefaultAsync(_ => _.Id == query.Id);

            if (riderEntity is null)
            {
                return NotFound();
            }

            var riderDetailsDto = Mapper.Map<RiderDetailsDto>(riderEntity);

            return Ok(riderDetailsDto);
        }
    }
}
