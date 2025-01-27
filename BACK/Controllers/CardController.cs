using KanbanApi.Dtos.Requests;
using KanbanApi.Models;
using KanbanApi.Repository;
using KanbanApi.Services.Logger;
using KanbanApi.Services.Token;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KanbanApi.Controllers;

[Authorize]
[ApiController]
public class CardController : ControllerBase
{
    private readonly ITokenService tokenService;
    private readonly CardRepository cardRepository;
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ILoggerService logger;

    public CardController(ITokenService tokenService, CardRepository cardRepository, IHttpContextAccessor httpContextAccessor, ILoggerService logger)
    {
        this.tokenService = tokenService;
        this.cardRepository = cardRepository;
        this.httpContextAccessor = httpContextAccessor;
        this.logger = logger;
    }

    [HttpGet("cards")]
    public async Task<IActionResult> GetAll()
    {
        var cards = await cardRepository.GetAllCardsAsync();
        var result = new List<CardResponse>();
        if (cards.Any())
        {
            // conver internal cache to ResponseDto
            result = cards.Select(s => s.ToCardResponse()).ToList();

            // track the event
            cards.ForEach(model => logger.AddCardInfo(model, "Listed"));    
        }

        return await Task.FromResult(Ok(result));
    }

    [HttpPost("cards")]
    public async Task<IActionResult> Create([FromBody] CardRequest request)
    {
        if (request == null || !request.IsValid())
        {
          throw new ArgumentNullException("Request is null or invalid.");            
        }

        // cast the input object
        var model = CardModel.FromCardRequest(request);

        // append to cache
        await this.cardRepository.AddOrUpdateCardAsync(model);

        // track the event
        logger.AddCardInfo(model, "Created");

        // return the object
        return await Task.FromResult(Ok(model.ToCardResponse()));
    }

    [HttpPut("cards/{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] CardRequest request)
    {
        if (string.IsNullOrEmpty(id))
        {
            throw new ArgumentNullException("Id is null or invalid.");
        }

        if (request == null || !request.IsValid())
        {
            throw new ArgumentNullException("Request is null or invalid.");
        }

        // Check if the card ID is valid
        var card = await cardRepository.GetCardAsync(id);
        if (card is null)
        {
            return await Task.FromResult(NotFound());
        }

        // convert the input card
        var model = CardModel.FromCardRequest(request, id);

        // update cache
        await this.cardRepository.AddOrUpdateCardAsync(model);

        // track the event
        logger.AddCardInfo(model, "Updated");

        // returns the selected event
        return await Task.FromResult(Ok(model.ToCardResponse()));
    }

    [HttpDelete("cards/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            throw new ArgumentNullException("Id is null or invalid.");
        }

        // Check if the card ID is valid
        var card = await cardRepository.GetCardAsync(id);
        if (card is null)
        {
            return await Task.FromResult(NotFound());
        }

        // track the event
        logger.AddCardInfo(card, "Deleted");

        // delete from cache
        await this.cardRepository.DeleteCardAsync(id);

        // returns the selected event
        return await Task.FromResult(NoContent());
    }
}
