using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyStageRaces.Commands;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
using StageRaceFantasy.Application.FantasyStageRaces.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/fantasy-stage-races")]
    public class FantasyStageRacesController : ControllerBase
    {
        private readonly ISender _mediator;

        public FantasyStageRacesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<FantasyStageRaceSummaryDto>>> Create(
            [FromBody] CreateFantasyStageRaceCommand command)
        {
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppResponse>> Update(
            [FromRoute] int id,
            [FromBody] UpdateFantasyStageRaceCommand command)
        {
            var response = await _mediator.Send(command with { Id = id });

            return ActionResultBuilder.Build(response);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<FantasyStageRaceSummaryDto>>>> GetPaginatedList(
            [FromQuery] GetPaginatedFantasyStageRacesQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppResponse<FantasyStageRaceDetailsDto>>> GetById(
            [FromRoute] int id)
        {
            var query = new GetFantasyStageRaceByIdQuery(id);
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }
    }
}
