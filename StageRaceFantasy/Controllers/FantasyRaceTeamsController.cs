﻿using MbhApi.Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyRaceTeam.Commands;
using StageRaceFantasy.Application.FantasyRaceTeam.Dtos;
using StageRaceFantasy.Application.FantasyRaceTeam.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/fantasy-races/{fantasyRaceId}/fantasy-teams")]
    public class FantasyRaceTeamsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FantasyRaceTeamsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromRoute] int fantasyRaceId,
            [FromBody] CreateFantasyRaceTeamCommand command)
        {
            command.FantasyRaceId = fantasyRaceId;
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<FantasyRaceTeamSummaryDto>>>> GetPaginated(
            [FromRoute] int fantasyRaceId,
            [FromQuery] GetPaginatedFantasyRaceTeamsQuery query)
        {
            query.FantasyRaceId = fantasyRaceId;
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }
    }
}