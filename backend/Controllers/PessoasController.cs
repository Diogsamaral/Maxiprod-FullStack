using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

// Controlador para gerenciar as pessoas, permitindo obter a lista de pessoas e adicionar novas pessoas ao banco de dados.
// Define as rotas e ações para o endpoint de pessoas.

[Route("api/[controller]")]
[ApiController]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;

    // Injeção do contexto do banco de dados para acesso aos dados.
    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/pessoas
    // Retorna a lista de todas as pessoas cadastradas no banco de dados.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
    {
        return await _context.Pessoas.ToListAsync();
    }

    // POST: api/pessoas
    // Adiciona uma nova pessoa ao banco de dados.
    [HttpPost]
    public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
    }
}