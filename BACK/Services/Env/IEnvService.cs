namespace KanbanApi.Services.Env;

public interface IEnvService
{
    string GetSecretKey(WebApplicationBuilder builder);
    string GetSecretIssuer(WebApplicationBuilder builder);
    string GetSecretAudience(WebApplicationBuilder builder);
    string GetRedisHost(WebApplicationBuilder builder);
    string GetUsernameLoginApi();
    string GetPasswordLoginApi();
}