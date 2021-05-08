using MediatR;

namespace StageRaceFantasy.Application.Common.Requests
{
    public interface IAppRequest : IRequest<AppResponse>
    {

    }

    public interface IAppRequest<T> : IRequest<AppResponse<T>>
    {
    }
}
