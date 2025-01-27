using KanbanApi.Dtos.Requests;
using KanbanApi.Dtos.Responses;
using KanbanApi.Models;
using KanbanApi.Services.Env;
using KanbanApi.Services.Logger;
using KanbanApi.Services.Token;
using Microsoft.AspNetCore.Mvc;

namespace KanbanApi.Controllers;

[ApiController]
public class LoginController : ControllerBase
{
    private readonly ITokenService tokenService;
    private readonly ILoggerService logger;
    private readonly IEnvService env;

    private List<UserModel> GetUsers()
    {
        return new List<UserModel>
        {
            new UserModel()
            {
                Id = Guid.NewGuid().ToString(),
                Username = env.GetUsernameLoginApi(),
                Name = "Username",
                Password = env.GetPasswordLoginApi(),
                Role = "Admin"
            }
        };
    }

    public LoginController(ITokenService tokenService, ILoggerService logger, IEnvService env)
    {
        this.tokenService = tokenService;
        this.logger = logger;
        this.env = env;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Token([FromBody] LoginRequest request)
    {
        if (request == null || !request.isValid())
        {
            throw new ArgumentNullException("Request is not valid.");
        }

        logger.AddLoginInfo($"Default credentials: {env.GetUsernameLoginApi()}/{env.GetPasswordLoginApi()}");

        var user = GetUsers().FirstOrDefault(u => u.Username == request.login && u.Password == request.senha);
        if (user == null)
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        return await Task.FromResult(Ok(new LoginResponse(tokenService.GenerateToken(user.Id, user.Name, user.Role), user.Name)));
    }
}
