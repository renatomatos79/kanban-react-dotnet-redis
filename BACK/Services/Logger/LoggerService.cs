using KanbanApi.Models;

namespace KanbanApi.Services.Logger;

public class LoggerService : ILoggerService
{
    private readonly ILogger<LoggerService> _logger;

    public LoggerService(ILogger<LoggerService> logger)
    {
        _logger = logger;
    }

    public void AddLoginInfo(string message)
    {
        _logger.LogInformation("{Timestamp} - Login - {Message}",
           DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
           message);
    }

    public void AddCardInfo(CardModel card, string transaction)
    {
        _logger.LogInformation("{Timestamp} - Card {Id} - {Title} - {Event}",
           DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
           card.Id.ToString(),
           card.Titulo,
           transaction);
    }

    public void AddEnvInfo(string variable, string key)
    {
        _logger.LogInformation("{Timestamp} - ENV: {variableName} SetKey: {settingsKey}",
               DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
               variable,
               key);
    }

    public void AddEnvInfo(string variable, string key, string value)
    {
        _logger.LogInformation("{Timestamp} - ENV: {variableName} SetKey: {settingsKey} Value: {Value}",
               DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
               variable,
               key,
               value);
    }

    public void AddEnvError(string variable, string key, Exception ex)
    {
        _logger.LogError("{Timestamp} - ENV: {variableName} SetKey: {settingsKey} ERROR: {Exception}",
               DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
               variable,
               key,
               ex.ToString());
    }
}