using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaces.Commands;
using StageRaceFantasy.Application.FantasyRaces.Dtos;
using StageRaceFantasy.Application.FantasyRaces.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/fantasy-races")]
    public class FantasyRacesController : ControllerBase
    {
        private readonly ISender _mediator;

        public FantasyRacesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromBody] CreateFantasyRaceCommand command)
        {
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppResponse>> Update(
            [FromRoute] int id,
            [FromBody] UpdateFantasyRaceCommand command)
        {
            var response = await _mediator.Send(command with { Id = id });

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("/api/fantasy-race-names")]
        public async Task<ActionResult<AppResponse<List<FantasyRaceNameDto>>>> GetAllNames(
            [FromQuery] GetAllFantasyRaceNamesQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<FantasyRaceSummaryDto>>>> GetPaginated(
            [FromQuery] GetPaginatedFantasyRacesQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppResponse<FantasyRaceDetailsDto>>> GetById(
            [FromRoute] int id)
        {
            var query = new GetFantasyRaceByIdQuery(id);
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }
    }
}
