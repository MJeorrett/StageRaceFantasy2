using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.ExternalInterfaces
{
    public interface IApplicationDbContext
    {
        DbSet<RiderEntity> Riders { get; }
        DbSet<RiderFantasyRaceEntryEntity> RiderFantasyRaceEntries { get; }
        DbSet<FantasyRaceEntity> FantasyRaces { get; }
        DbSet<FantasyRaceTeamEntity> FantasyRaceTeams { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
