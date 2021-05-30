using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Commands;
using StageRaceFantasy.Application.Races.Dtos;
using StageRaceFantasy.Application.Races.Queries;
using StageRaceFantasy.Application.Riders.Dtos;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/races/{raceId}")]
    public class RiderRaceEntriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RiderRaceEntriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("riders/{riderId}")]
        public async Task<ActionResult<AppResponse<int>>> EnterRiderIntoRace(
            [FromRoute] EnterRiderIntoRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpDelete("riders/{riderId}")]
        public async Task<ActionResult<AppResponse>> WithdrawRiderFromRace(
            [FromRoute] WithdrawRiderFromRaceCommand command)
        {
            var result = await _mediator.Send(command);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet("riders")]
        public async Task<ActionResult<AppResponse<PaginatedList<RiderSummaryDto>>>> GetPaginatedEnteredRiders(
            [FromQuery] GetPaginatedRidersEnteredInRaceQuery query,
            [FromRoute] int raceId)
        {
            query.RaceId = raceId;
            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }

        [HttpGet("rider-ids")]
        public async Task<ActionResult<AppResponse<List<int>>>> GetAllEnteredRiderIds(
            [FromRoute] GetAllIdsOfRidersEnteredInRaceQuery query)
        {
            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }
    }
}
