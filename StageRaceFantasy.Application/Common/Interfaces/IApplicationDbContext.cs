using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
