namespace KanbanApi.Dtos.Requests;

public class LoginRequest
{
    public string login { get; set; }
    public string senha { get; set; }

    public LoginRequest()
    {
        login = string.Empty;
        senha = string.Empty;
    }

    public bool isValid()
    {
        return !string.IsNullOrEmpty(login) && !string.IsNullOrEmpty(senha);
    }
}