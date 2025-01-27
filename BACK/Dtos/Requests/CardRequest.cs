namespace KanbanApi.Dtos.Requests;

public class CardRequest
{
    private static string[] VALID_VALUES = new string[] { "Novo", "ToDo", "Doing", "Done" };

    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public string Lista { get; set; }
    
    public CardRequest()
    {
        this.Titulo = string.Empty;    
        this.Conteudo = string.Empty;    
        this.Lista = string.Empty;
    }

    /// <summary>
    /// Validations:
    /// Titulo: not null and len <= 20
    /// Conteudo: empty or len <= 255
    /// List: only these values:  "Novo", "ToDo", "Doing", "Done"
    /// <returns></returns>
    public bool IsValid()
    {
        return 
            !string.IsNullOrEmpty(Titulo) &&
            this.Titulo.Length <= 30 &&
            (Conteudo ?? string.Empty).Length <= 255 &&
            !string.IsNullOrEmpty(Lista) &&
            VALID_VALUES.Any(s => s.Contains(Lista));
    }
}
