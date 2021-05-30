using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.Races.Commands;
using StageRaceFantasy.Application.Races.Dtos;
using StageRaceFantasy.Application.Races.Queries;
using StageRaceFantasy.Application.FantasyTeam.Dtos;
using StageRaceFantasy.Application.FantasyTeam.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/races")]
    public class RacesController : ControllerBase
    {
        private readonly ISender _mediator;

        public RacesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromBody] CreateRaceCommand command)
        {
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpPut("{raceId}")]
        public async Task<ActionResult<AppResponse>> Update(
            [FromRoute] int raceId,
            [FromBody] UpdateRaceCommand command)
        {
            var response = await _mediator.Send(command with { Id = raceId });

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("/api/race-names")]
        public async Task<ActionResult<AppResponse<List<RaceNameDto>>>> GetAllNames(
            [FromQuery] GetAllRaceNamesQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<RaceSummaryDto>>>> GetPaginated(
            [FromQuery] GetPaginatedRacesQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("{raceId}")]
        public async Task<ActionResult<AppResponse<RaceDetailsDto>>> GetById(
            [FromRoute] int raceId)
        {
            var query = new GetRaceByIdQuery(raceId);
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("{raceId}/fantasy-teams")]
        public async Task<ActionResult<AppResponse<PaginatedList<FantasyTeamSummaryDto>>>> GetPaginatedRaceTeams(
            [FromRoute] int raceId,
            [FromQuery] GetPaginatedFantasyTeamsQuery query)
        {
            query.RaceId = raceId;

            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }
    }
}
