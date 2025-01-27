using KanbanApi;
using KanbanApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();

// Custom extensions
builder.AddLogger();
builder.AddToken();
builder.AddCors();
builder.AddRedis();
builder.AddSwagger();
builder.AddAuth();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.AddSwaggerDoc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpExceptionHandler();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(CorsExtension.ALLOW_ANY_REQUEST);
app.MapControllers();

app.Run();
