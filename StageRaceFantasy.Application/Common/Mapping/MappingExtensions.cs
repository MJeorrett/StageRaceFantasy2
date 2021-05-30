using MbhApi.Application.Common.Models;
using StageRaceFantasy.Application.Common.Requests;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StageRaceFantasy.Application.Common.Mapping
{
    public static class MappingExtensions
    {
        public static Task<PaginatedList<T>> ToPaginatedListAsync<T>(
            this IQueryable<T> queryable,
            GetPaginatedListQuery query,
            CancellationToken cancellationToken)
        {
            return PaginatedList<T>.CreateAsync(queryable, query.PageNumber, query.PageSize, cancellationToken);
        }
    }
}
