namespace KanbanApi;

public static class RegisterHttpExceptionHandler
{
    public static IApplicationBuilder UseHttpExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<CustomHttpExceptionHandler>();
    }
}