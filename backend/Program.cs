using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Adicionando os serviços ao container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Esta linha impede o erro de "loop" (uma pessoa tem transações, que tem uma pessoa...)
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Configuração do SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do CORS para o React (Porta 5173) conseguir acessar
builder.Services.AddCors(options =>
{
    options.AddPolicy("LiberarGeral", policy =>
    {
        policy.AllowAnyOrigin() // Permite qualquer site (Vercel, Localhost, etc)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    // Isso garante que o banco de dados seja criado e as migrações aplicadas
    context.Database.Migrate(); 
}

// Configuração do pipeline de requisições HTTP.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("LiberarGeral");

app.UseAuthorization();

app.MapControllers();

app.Run();