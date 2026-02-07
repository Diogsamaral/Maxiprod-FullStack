using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

// Os using necessários para o controlador do dashboard.

namespace backend.Controllers;

// Controlador para gerenciar os dados do dashboard, permitindo obter resumos e totais relacionados às pessoas e suas transações.
// Define as rotas e ações para o endpoint do dashboard.
[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;
    // Injeção do contexto do banco de dados para acesso aos dados.
    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("totais-por-pessoa")]
    public async Task<IActionResult> GetTotaisPorPessoa()
    {
        try 
        {
            // Buscando os dados brutos e fazendo o cálculo de forma isolada
            var pessoasNoBanco = await _context.Pessoas.ToListAsync();
            
            // Para cada pessoa, calcula o total de receitas, despesas e saldo
            var resumoPessoas = pessoasNoBanco.Select(p => {
                var transacoesPessoa = _context.Transacoes.Where(t => t.PessoaId == p.Id).ToList();
                
                // Cálculo dos totais de receitas e despesas para a pessoa
                var receitas = transacoesPessoa
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);
                
                var despesas = transacoesPessoa
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                // Retorna um objeto anônimo com os dados da pessoa e seus totais
                return new {
                    p.Id,
                    p.Nome,
                    p.Idade,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };
            }).ToList();

            // Cálculo dos totais gerais para o dashboard
            var resumoGeral = new {
                DadosPorPessoa = resumoPessoas,
                TotalGeralPessoas = resumoPessoas.Count,
                TotalGeralReceitas = resumoPessoas.Sum(x => x.TotalReceitas),
                TotalGeralDespesas = resumoPessoas.Sum(x => x.TotalDespesas),
                SaldoLiquidoGeral = resumoPessoas.Sum(x => x.Saldo)
            };

            return Ok(resumoGeral);
        }
        catch (Exception ex)
        {
            // Isso vai imprimir o erro real no terminal se algo falhar
            Console.WriteLine("ERRO NO DASHBOARD: " + ex.Message);
            return StatusCode(500, "Erro interno ao calcular dashboard: " + ex.Message);
        }
    }
}