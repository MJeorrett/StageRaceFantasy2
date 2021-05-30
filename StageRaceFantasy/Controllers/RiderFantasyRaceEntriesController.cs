using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaces.Commands;
using StageRaceFantasy.Application.FantasyRaces.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/fantasy-races/{fantasyRaceId}/rider-entries")]
    public class RiderFantasyRaceEntriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RiderFantasyRaceEntriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{riderId}")]
        public async Task<ActionResult<AppResponse<int>>> EnterRiderIntoRace(
            [FromRoute] EnterRiderIntoFantasyRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpDelete("{riderId}")]
        public async Task<ActionResult<AppResponse>> WithdrawRiderFromRace(
            [FromRoute] WithdrawRiderFromFantasyRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<List<int>>>> GetAllEnteredRiderIds(
            [FromRoute] int fantasyRaceId)
        {
            var query = new GetAllEnteredRiderIdsForFantasyRaceQuery(fantasyRaceId);
            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }
    }
}
