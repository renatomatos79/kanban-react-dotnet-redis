namespace KanbanApi;

public class CardResponse
{
    public string Id { get; set; }
    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public string Lista { get; set; }
    
    public CardResponse()
    {
        this.Id = string.Empty;    
        this.Titulo = string.Empty;    
        this.Conteudo = string.Empty;    
        this.Lista = string.Empty;
    }
}
