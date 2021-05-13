using MbhApi.Application.Common.Models;
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
    [Route("api/fantasy-race-teams")]
    public class FantasyRaceTeamsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FantasyRaceTeamsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromBody] CreateFantasyRaceTeamCommand command)
        {
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet]
        public async Task<ActionResult<AppResponse<PaginatedList<FantasyRaceTeamSummaryDto>>>> GetPaginated(
            [FromQuery] GetPaginatedFantasyRaceTeamsQuery query)
        {
            var response = await _mediator.Send(query);

            return ActionResultBuilder.Build(response);
        }
    }
}
