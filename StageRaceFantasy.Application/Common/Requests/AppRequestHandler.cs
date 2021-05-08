using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StageRaceFantasy.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Requests
{
    public abstract class AppRequestHandler<TRequest> : IRequestHandler<TRequest, AppResponse>
        where TRequest : IRequest<AppResponse>
    {
        public abstract Task<AppResponse> Handle(TRequest request, CancellationToken cancellationToken);

        protected AppResponse Success()
        {
            return AppResponse.Success();
        }

        protected AppResponse BadRequest(string message)
        {
            return AppResponse.BadRequest(message);
        }

        protected AppResponse NotFound()
        {
            return AppResponse.NotFound();
        }
    }

    public abstract class AppRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, AppResponse<TResponse>>
        where TRequest : IRequest<AppResponse<TResponse>>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IApplicationDbContext? _dbContext;
        private IMapper? _mapper;

        protected AppRequestHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected IApplicationDbContext DbContext =>
            _dbContext ??= _httpContextAccessor.HttpContext!.RequestServices.GetRequiredService<IApplicationDbContext>();

        protected IMapper Mapper =>
            _mapper ??= _httpContextAccessor.HttpContext!.RequestServices.GetRequiredService<IMapper>();

        public abstract Task<AppResponse<TResponse>> Handle(TRequest request, CancellationToken cancellationToken);

        protected AppResponse<TResponse> Success(TResponse response)
        {
            return AppResponse.Success(response);
        }

        protected AppResponse<TResponse> BadRequest(string message)
        {
            return AppResponse.BadRequest<TResponse>(message);
        }

        protected AppResponse<TResponse> NotFound()
        {
            return AppResponse.NotFound<TResponse>();
        }
    }
}
