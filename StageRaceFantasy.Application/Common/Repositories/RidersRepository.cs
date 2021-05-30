using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.ExternalInterfaces;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Application.Common.Repositories
{
    public class RidersRepository : RepositoryBase<RiderEntity>, IRidersRepository
    {
        protected override DbSet<RiderEntity> DbSet => DbContext.Riders;

        public RidersRepository(IApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
