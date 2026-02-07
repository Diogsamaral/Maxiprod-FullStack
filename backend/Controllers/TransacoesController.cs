using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

/* Controlador para gerenciar as transações financeiras, incluindo a lógica de validação de categorias e tipos de transação. 
Ele permite listar todas as transações e criar novas transações, garantindo que as regras de negócio sejam respeitadas.*/

namespace backend.Controllers;

// Rota base para o controlador de transações
[Route("api/[controller]")]
[ApiController]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    // Injeção de dependência do contexto do banco de dados
    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    // LISTAR: GET api/transacoes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        // Usando .Include para trazer os dados da Pessoa e Categoria junto
        return await _context.Transacoes
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .ToListAsync();
    }

    // CRIAR: POST api/transacoes
    [HttpPost]
    public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
    {
        // 1. Buscar a categoria no banco para validar a Finalidade
        var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
        
        if (categoria == null)
            return BadRequest("Categoria não encontrada.");

        // 2. REGRA DE NEGÓCIO: Validação de Tipo vs Finalidade
        if (transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade == Finalidade.Receita)
        {
            return BadRequest("Esta categoria é exclusiva para RECEITAS e não aceita despesas.");
        }

        if (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade == Finalidade.Despesa)
        {
            return BadRequest("Esta categoria é exclusiva para DESPESAS e não aceita receitas.");
        }

        // 3. Salvar se passar na validação
        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
    }
}