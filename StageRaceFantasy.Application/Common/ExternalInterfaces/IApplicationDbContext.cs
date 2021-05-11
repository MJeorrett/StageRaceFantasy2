using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.ExternalInterfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<FantasyRaceEntity> FantasyRaces { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
