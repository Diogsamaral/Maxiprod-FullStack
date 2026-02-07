using System.ComponentModel.DataAnnotations;
namespace backend.Models;

/* Enumeração para definir os tipos de transação, que podem ser despesas ou receitas. 
Isso ajuda a categorizar as transações financeiras de forma clara e consistente*/
public enum TipoTransacao { Despesa, Receita }

// Modelo de transação, representando uma transação financeira com propriedades como descrição, valor, tipo, categoria e pessoa associada.
public class Transacao {
    public int Id { get; set; }
    [MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;
    
    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo")]
    public decimal Valor { get; set; }
    
    public TipoTransacao Tipo { get; set; }
    
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }

    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}