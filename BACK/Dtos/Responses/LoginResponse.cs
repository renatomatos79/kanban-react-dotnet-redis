namespace KanbanApi.Dtos.Responses;

public class LoginResponse
{
    public string Token { get; set; }
    public string Username { get; set; }

    public LoginResponse(string token, string userName)
    {
        Token = token;
        Username = userName;
    }
}