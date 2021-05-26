using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Riders.Commands;
using StageRaceFantasy.Application.Riders.Dtos;
using StageRaceFantasy.Application.Riders.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/riders")]
    public class RidersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RidersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromBody] CreateRiderCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpPut("{riderId}")]
        public async Task<ActionResult<AppResponse>> Update(
            [FromRoute] int riderId,
           [FromBody] UpdateRiderCommand command)
        {
            command.Id = riderId;
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<RiderSummaryDto>>>> GetPaginated(
            [FromQuery] GetPaginatedRidersQuery query)
        {
            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet("{riderId}")]
        public async Task<ActionResult<AppResponse<RiderDetailsDto>>> GetById(
            [FromRoute] int riderId)
        {
            var query = new GetRiderByIdQuery(riderId);

            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }
    }
}
