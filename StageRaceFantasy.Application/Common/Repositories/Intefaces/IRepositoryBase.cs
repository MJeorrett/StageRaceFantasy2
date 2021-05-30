using StageRaceFantasy.Domain.Common;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories.Intefaces
{
    public interface IRepositoryBase<T> where T : class, IEntity
    {
        Task<T?> GetById(int id, CancellationToken cancellationToken);
        
        Task<bool> AnyExistWithId(int id, CancellationToken cancellationToken);
    }
}