using Microsoft.EntityFrameworkCore;
using backend.Models; 

namespace backend.Data; 

// Classe de contexto do Entity Framework Core para acessar o banco de dados
public class AppDbContext : DbContext 
{
    /* Construtor que recebe as opções de configuração do contexto e as passa para a classe base DbContext.
    Isso permite que o contexto seja configurado externamente, por exemplo, no arquivo de configuração 
    ou durante a inicialização da aplicação.
    O uso de DbContextOptions<AppDbContext> é uma prática comum para configurar o contexto de forma flexível, 
    permitindo a injeção de dependências e a configuração em tempo de execução.
    O construtor é essencial para a configuração do contexto, pois permite que as opções de conexão e outras 
    configurações sejam definidas fora da classe, promovendo a separação de preocupações e facilitando a manutenção do código.*/
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    // Configurações adicionais do modelo
    // O método OnModelCreating é usado para configurar o modelo de dados usando a Fluent API do Entity Framework Core.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>()
            .Property(c => c.Descricao)
            .HasMaxLength(400)
            .IsRequired();

        modelBuilder.Entity<Transacao>()
            .Property(t => t.Descricao)
            .HasMaxLength(400)
            .IsRequired();

        modelBuilder.Entity<Transacao>()
            .Property(t => t.Valor)
            .HasColumnType("decimal(18,2)");

        base.OnModelCreating(modelBuilder);
    }
}