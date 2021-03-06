using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MbhApi.Application.Common.Models
{
    public record PaginatedList<T>(
        List<T> Items,
        int TotalCount,
        int TotalPages,
        int PageNumber,
        int PageSize)
    {
        public bool HasPreviousPage => PageNumber > 1;

        public bool HasNextPage => PageNumber < TotalPages;

        public static async Task<PaginatedList<T>> CreateAsync(
            IQueryable<T> source,
            int pageNumber,
            int pageSize,
            CancellationToken cancellationToken)
        {
            if (pageSize == -1)
            {
                return await CreateAllOnOnePageAsync(source, cancellationToken);
            }

            var totalCount = await source.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            var flooredPageNumber = Math.Min(pageNumber, totalPages == 0 ? 1 : totalPages);
            var items = totalCount == 0 ?
                new List<T>() :
                await source
                    .Skip((flooredPageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync(cancellationToken);

            return new PaginatedList<T>(items, totalCount, totalPages, flooredPageNumber, pageSize);
        }

        private static async Task<PaginatedList<T>> CreateAllOnOnePageAsync(
           IQueryable<T> source,
           CancellationToken cancellationToken)
        {
            var items = await source.ToListAsync(cancellationToken);

            return new PaginatedList<T>(items, TotalCount: items.Count, TotalPages: 1, PageNumber: 1, PageSize: items.Count);
        }
    }
}
