using System.Text.Json.Serialization;

namespace StageRaceFantasy.Application.Common.Requests
{
    public record AppResponse
    {
        [JsonIgnore]
        public int StatusCode { get; set; }
        
        public string Message { get; set; }

        [JsonIgnore]
        public bool IsOk => StatusCode >= 200 && StatusCode <= 299;

        public AppResponse(int statusCode, string message = "")
        {
            StatusCode = statusCode;
            Message = message;
        }

        public static AppResponse Ok(string message = "") =>
            new(200, message);

        public static AppResponse Created(string message = "") =>
            new(201, message);

        public static AppResponse BadRequest(string message) =>
            new(400, message);

        public static AppResponse NotFound(string message = "") =>
            new(404, message);

        public static AppResponse<T> Ok<T>(T content, string message = "") =>
            new(200, content, message);

        public static AppResponse<T> Created<T>(T content, string message = "") =>
            new(201, content, message);

        public static AppResponse<T> BadRequest<T>(string message) =>
            new(400, default, message);

        public static AppResponse<T> NotFound<T>(string message = "") =>
            new(404, default, message);
    }

    public record AppResponse<T>
    {
        [JsonIgnore]
        public int StatusCode { get; set; }

        public T? Content { get; set; }

        public string Message { get; set; }

        [JsonIgnore]
        public bool IsOk => StatusCode >= 200 && StatusCode <= 299;

        public AppResponse(int statusCode, T? content, string message = "")
        {
            StatusCode = statusCode;
            Content = content;
            Message = message;
        }
    }
}
