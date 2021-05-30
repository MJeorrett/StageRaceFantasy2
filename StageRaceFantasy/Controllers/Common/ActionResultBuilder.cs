using Microsoft.AspNetCore.Mvc;
using StageRaceFantasy.Application.Common.Requests;

namespace StageRaceFantasy.Controllers.Common
{
    public static class ActionResultBuilder
    {
        public static ActionResult<AppResponse> Build(AppResponse responseModel)
        {
            ActionResult<AppResponse> result = responseModel.StatusCode switch
            {
                200 => new OkObjectResult(responseModel),
                201 => new ObjectResult(responseModel) { StatusCode = 201 },
                204 => new NoContentResult(),
                400 => new BadRequestObjectResult(responseModel),
                401 => new UnauthorizedResult(),
                403 => new ForbidResult(),
                404 => new NotFoundObjectResult(responseModel),
                _ => new ObjectResult(responseModel) { StatusCode = responseModel.StatusCode },
            };

            return result;
        }

        public static ActionResult<AppResponse<T>> Build<T>(AppResponse<T> responseModel)
        {
            ActionResult<AppResponse<T>> result = responseModel.StatusCode switch
            {
                200 => new OkObjectResult(responseModel),
                201 => new ObjectResult(responseModel) { StatusCode = 201 },
                204 => new NoContentResult(),
                400 => new BadRequestObjectResult(responseModel),
                401 => new UnauthorizedResult(),
                403 => new ForbidResult(),
                404 => new NotFoundObjectResult(responseModel),
                _ => new ObjectResult(responseModel) { StatusCode = responseModel.StatusCode },
            };

            return result;
        }
    }
}
