using AutoMapper;
using Microsoft.AspNetCore.Http;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.Common.Requests;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Riders.Commands
{
    public record CreateRiderCommand :
        IAppRequest<int>,
        IMapTo<RiderEntity>
    {
        public string FirstName { get; init; } = "";

        public string LastName { get; init; } = "";

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateRiderCommand, RiderEntity>()
                .ValidateMemberList(MemberList.Source);
        }
    }

    public class CreateRiderCommandHandler : AppRequestHandler<CreateRiderCommand, int>
    {
        public CreateRiderCommandHandler(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public override async Task<AppResponse<int>> Handle(CreateRiderCommand command, CancellationToken cancellationToken)
        {
            var riderEntity = Mapper.Map<RiderEntity>(command);

            DbContext.Riders.Add(riderEntity);
            await DbContext.SaveChangesAsync(cancellationToken);

            return Created(riderEntity.Id);
        }
    }
}
