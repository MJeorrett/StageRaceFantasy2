using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.ExternalInterfaces;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Domain.Entities;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories
{
    public class RacesRepository : RepositoryBase<RaceEntity>, IRacesRepository
    {
        protected override DbSet<RaceEntity> DbSet => DbContext.Races;

        public RacesRepository(IApplicationDbContext dbContext) :
            base(dbContext)
        {
        }

        public async Task<RiderRaceEntryEntity?> GetRaceEntryForRiderOrDefault(int raceId, int riderId)
        {
            return await DbContext.RiderRaceEntries
                .FirstOrDefaultAsync(_ =>
                    _.RaceId == raceId &&
                    _.RiderId == riderId);
        }
    }
}
