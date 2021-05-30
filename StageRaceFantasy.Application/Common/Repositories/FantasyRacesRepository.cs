using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.ExternalInterfaces;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Domain.Entities;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories
{
    public class FantasyRacesRepository : RepositoryBase<FantasyRaceEntity>, IFantasyRacesRepository
    {
        protected override DbSet<FantasyRaceEntity> DbSet => DbContext.FantasyRaces;

        public FantasyRacesRepository(IApplicationDbContext dbContext) :
            base(dbContext)
        {
        }

        public async Task<RiderFantasyRaceEntryEntity?> GetRaceEntryForRiderOrDefault(int fantasyRaceId, int riderId)
        {
            return await DbContext.RiderFantasyRaceEntries
                .FirstOrDefaultAsync(_ =>
                    _.FantasyRaceId == fantasyRaceId &&
                    _.RiderId == riderId);
        }
    }
}
