using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

// os using necessários para o controlador de categorias, incluindo o contexto do banco de dados e o modelo de categoria.

namespace backend.Controllers;

// Controlador para gerenciar as categorias, permitindo obter a lista de categorias e adicionar novas categorias ao banco de dados.
// Define as rotas e ações para o endpoint de categorias.
[Route("api/[controller]")]
// Indica que esta classe é um controlador de API, o que permite que ela responda a solicitações HTTP e retorne dados em formato JSON.
[ApiController]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }
    // GET: api/Categorias
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
    {
        return await _context.Categorias.ToListAsync();
    }

    // POST: api/Categorias
    [HttpPost]
    public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Id }, categoria);
    }
}