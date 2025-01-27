using KanbanApi.Services.Env;
using KanbanApi.Services.Logger;

namespace KanbanApi.Extensions;

public static class LoggerExtension
{
    public static WebApplicationBuilder AddLogger(this WebApplicationBuilder builder)
    {
        // Logging
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();
        builder.Logging.SetMinimumLevel(LogLevel.Information);

        // Add custom logger
        builder.Services.AddSingleton<ILoggerService, LoggerService>();

        // Add custom env support
        builder.Services.AddSingleton<IEnvService, EnvService>();

        return builder;
    }
}

