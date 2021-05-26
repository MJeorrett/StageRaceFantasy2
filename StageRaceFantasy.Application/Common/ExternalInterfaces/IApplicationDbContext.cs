using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.ExternalInterfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<RiderEntity> Riders { get; }
        public DbSet<FantasyRaceEntity> FantasyRaces { get; }
        public DbSet<FantasyRaceTeamEntity> FantasyRaceTeams { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
