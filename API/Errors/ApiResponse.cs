namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public ApiResponse()
        {
        }


        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "400 Bad Request",
                401 => "401 Unauthorized",
                404 => "404 Not Found",
                500 => "500 Internal Server Error",
                _ => null
            };
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

    }
}