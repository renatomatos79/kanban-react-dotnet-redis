using KanbanApi.Models;

namespace KanbanApi.Services.Logger;

public interface ILoggerService
{
    void AddLoginInfo(string message);
    void AddCardInfo(CardModel card, string transaction);
    void AddEnvInfo(string variable, string key);
    void AddEnvInfo(string variable, string key, string value);
    void AddEnvError(string variable, string key, Exception ex);
}