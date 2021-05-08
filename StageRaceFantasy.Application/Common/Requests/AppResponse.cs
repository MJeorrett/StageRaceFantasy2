namespace StageRaceFantasy.Application.Common.Requests
{
    public record AppResponse(
        int StatusCode,
        string Message = "")
    {
        public bool IsOk => StatusCode >= 200 && StatusCode <= 299;

        public static AppResponse Success(string message = "") =>
            new(200, message);

        public static AppResponse BadRequest(string message) =>
            new(400, message);

        public static AppResponse NotFound(string message = "") =>
            new(404, message);

        public static AppResponse<T> Success<T>(T content, string message = "") =>
            new(200, content, message);

        public static AppResponse<T> BadRequest<T>(string message) =>
            new(400, default, message);

        public static AppResponse<T> NotFound<T>(string message = "") =>
            new(404, default, message);
    }

    public record AppResponse<T>(
        int StatusCode,
        T? Content,
        string Message = "")
    {
    }
}
