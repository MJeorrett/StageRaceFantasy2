using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Commands;
using StageRaceFantasy.Application.Races.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/races/{raceId}/rider-entries")]
    public class RiderRaceEntriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RiderRaceEntriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{riderId}")]
        public async Task<ActionResult<AppResponse<int>>> EnterRiderIntoRace(
            [FromRoute] EnterRiderIntoRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpDelete("{riderId}")]
        public async Task<ActionResult<AppResponse>> WithdrawRiderFromRace(
            [FromRoute] WithdrawRiderFromRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<List<int>>>> GetAllEnteredRiders(
            [FromRoute] int raceId)
        {
            var query = new GetAllEnteredRiderIdsForRaceQuery(raceId);
            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }
    }
}
