using KanbanApi.Services.Env;
using KanbanApi.Services.Token;

namespace KanbanApi.Extensions;

public static class CorsExtension
{
    public static string ALLOW_ANY_REQUEST = "ALLOW_ALL";

    public static WebApplicationBuilder AddCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            // TODO: instead of "*" trying to use an ENV VAR
            options.AddPolicy(ALLOW_ANY_REQUEST, builder =>
            {
                builder.WithOrigins("*").AllowAnyHeader().WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            });
        });

        return builder;
    }
}

