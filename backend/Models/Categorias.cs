using System.ComponentModel.DataAnnotations;
namespace backend.Models;

/* Enum para definir a finalidade de uma categoria, que pode ser uma despesa, 
receita ou ambas. Isso ajuda a categorizar as transações financeiras de forma 
mais precisa, permitindo que o sistema saiba se uma categoria é usada para 
registrar despesas, receitas ou ambos os tipos de transações.*/
public enum Finalidade { Despesa, Receita, Ambas }


/* Modelo de categoria, representando as categorias de transações financeiras no sistema. 
Cada categoria tem um ID, uma descrição e uma finalidade (despesa, receita ou ambas). 
A descrição tem um limite de 400 caracteres. Este modelo é usado para armazenar e gerenciar 
as categorias no banco de dados, permitindo que os usuários organizem suas transações de forma eficiente.*/
public class Categoria {
    
    public int Id { get; set; }
    [MaxLength(400)]
    
    public string Descricao { get; set; } = string.Empty;
    
    public Finalidade Finalidade { get; set; }
}