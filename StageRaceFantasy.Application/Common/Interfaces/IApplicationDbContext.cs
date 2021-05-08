using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<FantasyStageRaceEntity> FantasyStageRaces { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
