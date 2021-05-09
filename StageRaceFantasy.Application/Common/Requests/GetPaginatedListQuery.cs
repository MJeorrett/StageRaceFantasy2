namespace StageRaceFantasy.Application.Common.Requests
{
    public record GetPaginatedListQuery
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
    }
}
