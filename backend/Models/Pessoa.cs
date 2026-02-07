using System.ComponentModel.DataAnnotations;
namespace backend.Models;

/* Modelo de pessoa, representando uma entidade com propriedades como 
Id, Nome e Idade. A propriedade Nome é obrigatória, conforme indicado 
pelo atributo [Required]. Este modelo pode ser usado para armazenar informações 
sobre pessoas em um banco de dados ou para transferir dados entre camadas da aplicação.*/
public class Pessoa {
    public int Id { get; set; }
    [Required]
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
}