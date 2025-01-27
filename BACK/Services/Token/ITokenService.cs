using System.Security.Claims;


namespace KanbanApi.Services.Token;

public interface ITokenService
{
    string GenerateToken(string userId, string userName, string role);
    string GetUserName(ClaimsPrincipal user);
}