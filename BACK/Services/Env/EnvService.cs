using KanbanApi.Services.Logger;

namespace KanbanApi.Services.Env;

public class EnvService : IEnvService {

    private readonly ILoggerService logger;

    public EnvService(ILoggerService logger)
    { 
        this.logger = logger;
    }

    private string GetValue(WebApplicationBuilder builder, string variableName, string settingsKey, string defaultValue = "")
    {
        logger.AddEnvInfo(variableName, settingsKey);
        try 
        {
            var value = Environment.GetEnvironmentVariable(variableName) ?? builder.Configuration[settingsKey] ?? defaultValue;
            logger.AddEnvInfo(variableName, settingsKey, value);
            return value;
        } 
        catch (Exception ex) 
        {
            Console.WriteLine($"GetValue VariableName: {variableName} SettingsKey: {settingsKey} Error: {ex}");
            logger.AddEnvError(variableName, settingsKey, ex);
        }
        return defaultValue;
        
    }

    public string GetSecretKey(WebApplicationBuilder builder)
    {
        return GetValue(builder, "JWT_SECRET_KEY", "JWT:SecretKey", "");
    }

    public string GetSecretIssuer(WebApplicationBuilder builder)
    {
        return GetValue(builder, "JWT_ISSUER", "JWT:Issuer", "");
    }

    public string GetSecretAudience(WebApplicationBuilder builder)
    {
        return GetValue(builder, "JWT_AUDIENCE", "JWT:Audience", "");
    }

    public string GetRedisHost(WebApplicationBuilder builder)
    {
        return GetValue(builder, "REDIS_HOST", "Redis:Host", "redisserver:6379");
    }

    public string GetUsernameLoginApi()
    {
        return Environment.GetEnvironmentVariable("LOGIN_API_USERNAME") ?? string.Empty;
    }

    public string GetPasswordLoginApi()
    {
        return Environment.GetEnvironmentVariable("LOGIN_API_PASSWORD") ?? string.Empty;
    }
}