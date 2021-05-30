using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.ExternalInterfaces
{
    public interface IApplicationDbContext
    {
        DbSet<RiderEntity> Riders { get; }
        DbSet<RiderRaceEntryEntity> RiderRaceEntries { get; }
        DbSet<RaceEntity> Races { get; }
        DbSet<FantasyTeamEntity> FantasyTeams { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
