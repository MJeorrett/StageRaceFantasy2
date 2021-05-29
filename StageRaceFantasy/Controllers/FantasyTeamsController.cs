using MediatR;
using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Application.FantasyTeam.Commands;
using StageRaceFantasy.Application.FantasyTeam.Dtos;
using StageRaceFantasy.Application.FantasyTeam.Queries;
using StageRaceFantasy.Controllers.Common;
using System.Threading.Tasks;

namespace StageRaceFantasy.Controllers
{
    [ApiController]
    [Route("api/fantasy-teams")]
    public class FantasyTeamsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FantasyTeamsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AppResponse<int>>> Create(
            [FromBody] CreateFantasyTeamCommand command)
        {
            var response = await _mediator.Send(command);

            return ActionResultBuilder.Build(response);
        }

        [HttpGet("{fantasyTeamId}")]
        public async Task<ActionResult<AppResponse<FantasyTeamDetailsDto>>> GetById(
            [FromRoute] int fantasyTeamId)
        {
            var query = new GetFantasyTeamByIdQuery(fantasyTeamId);

            var result = await _mediator.Send(query);

            return ActionResultBuilder.Build(result);
        }
    }
}
