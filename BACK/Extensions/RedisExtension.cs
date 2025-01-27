using KanbanApi.Repository;
using KanbanApi.Services.Env;
using StackExchange.Redis;

namespace KanbanApi.Extensions;

public static class RedisExtension
{
    public static WebApplicationBuilder AddRedis(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped(sp =>
        {
            var env = sp.GetRequiredService<IEnvService>();
            var host = env.GetRedisHost(builder);
            var connectionMultiplexer = ConnectionMultiplexer.Connect(host);
            IDatabase db = connectionMultiplexer.GetDatabase();
            return new CardRepository(db);
        });

        return builder;
    }
}

