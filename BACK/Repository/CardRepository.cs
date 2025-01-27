using KanbanApi.Dtos.Requests;
using KanbanApi.Models;
using Newtonsoft.Json;
using ServiceStack;
using StackExchange.Redis;

namespace KanbanApi.Repository;

public class CardRepository
{
    private readonly IDatabase _db;
    private string RedisKey = GlobalConstants.REDIS_CARDS_KEY;

    public CardRepository(IDatabase database)
    {
        _db = database;
    }

    // Create or Update Card
    public async Task AddOrUpdateCardAsync(CardModel card)
    {
        string serializedCard = JsonConvert.SerializeObject(card);
        await _db.HashSetAsync(RedisKey, card.Id, serializedCard);
    }

    // Get Card by ID
    public async Task<CardModel?> GetCardAsync(string cardId)
    {
        var serializedCard = await _db.HashGetAsync(RedisKey, cardId);
        return serializedCard.IsNullOrEmpty ? null : JsonConvert.DeserializeObject<CardModel>(serializedCard.ToString());
    }

    // Get All Cards
    public async Task<List<CardModel?>> GetAllCardsAsync()
    {
        var allCards = await _db.HashGetAllAsync(RedisKey);
        return allCards.Select(x => JsonConvert.DeserializeObject<CardModel>(x.Value.ToString())).ToList();
    }

    // Delete Card
    public async Task<bool> DeleteCardAsync(string cardId)
    {
        return await _db.HashDeleteAsync(RedisKey, cardId);
    }
}

