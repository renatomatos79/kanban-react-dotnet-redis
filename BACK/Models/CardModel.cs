using KanbanApi.Dtos.Requests;

namespace KanbanApi.Models;

public class CardModel
{
    public string Id { get; set; }
    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public string Lista { get; set; }

    public CardModel(string id, string titulo, string conteudo, string lista)
    {
        this.Id = string.IsNullOrEmpty(id) ? Guid.NewGuid().ToString() : id;
        this.Titulo = titulo;
        this.Conteudo = conteudo;
        this.Lista = lista;
    }

    public static CardModel FromCardRequest(CardRequest cardRequest, string id = null)
    {
        return new CardModel(id, cardRequest.Titulo, cardRequest.Conteudo, cardRequest.Lista);
    }

    public CardResponse ToCardResponse()
    {
        return new CardResponse
        {
            Id = this.Id,
            Titulo = this.Titulo,
            Conteudo = this.Conteudo,
            Lista = this.Lista,
        };
    }
}
