namespace KanbanApi.Extensions;

public static class AuthExtension
{
    public static WebApplicationBuilder AddAuth(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("Authenticated", policy =>
            {
                policy.RequireAuthenticatedUser();
            });
        });


        return builder;
    }
}

