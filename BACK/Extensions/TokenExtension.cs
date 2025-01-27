using KanbanApi.Services.Env;
using KanbanApi.Services.Token;

namespace KanbanApi.Extensions;

public static class TokenExtension
{
    public static WebApplicationBuilder AddToken(this WebApplicationBuilder builder)
    {
        // Add services to the container.
        builder.Services.AddSingleton<ITokenService, TokenService>(sp =>
        {
            var env = sp.GetRequiredService<IEnvService>();
            return new TokenService(
                secretKey: env.GetSecretKey(builder),
                issuer: env.GetSecretIssuer(builder),
                audience: env.GetSecretAudience(builder)
            );
        });

        return builder;
    }
}

