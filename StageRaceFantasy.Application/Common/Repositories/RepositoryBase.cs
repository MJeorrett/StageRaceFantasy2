using Microsoft.EntityFrameworkCore;
using StageRaceFantasy.Application.Common.ExternalInterfaces;
using StageRaceFantasy.Application.Common.Repositories.Intefaces;
using StageRaceFantasy.Domain.Common;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Repositories
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class, IEntity
    {
        protected readonly IApplicationDbContext DbContext;

        protected abstract DbSet<T> DbSet { get; }

        protected RepositoryBase(IApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<T?> GetById(int id, CancellationToken cancellationToken)
        {
            var entity = await DbSet
                .FirstOrDefaultAsync(_ => _.Id == id, cancellationToken);

            return entity;
        }

        public async Task<bool> AnyExistWithId(int id, CancellationToken cancellationToken)
        {
            var exists = await DbSet
                .AnyAsync(_ => _.Id == id, cancellationToken);

            return exists;
        }
    }
}
