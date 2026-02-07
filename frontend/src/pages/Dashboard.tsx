import { useEffect, useState } from "react";
import api from "../services/api";

// Interfaces para os dados do dashboard
interface TotaisPorPessoa {
  id: number;
  nome: string;
  idade: number;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

// Resumo geral do dashboard, incluindo totais e dados por pessoa
interface ResumoGeral {
  dadosPorPessoa: TotaisPorPessoa[];
  totalGeralPessoas: number;
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

// Página de Dashboard: Exibe um resumo geral e uma tabela detalhada por pessoa
export function Dashboard() {
  const [resumo, setResumo] = useState<ResumoGeral | null>(null);

  useEffect(() => {
    api
      .get("/dashboard/totais-por-pessoa")
      .then((response) => setResumo(response.data))
      .catch(() => alert("Erro ao carregar dashboard"));
  }, []);

  if (!resumo)
    return <div className="p-8 text-center">Carregando dados...</div>;

  // Renderização do dashboard com cards de resumo e tabela detalhada
  return (
    <div className="space-y-8">
      {/* CARDS DE RESUMO GERAL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          title="Total de Pessoas"
          value={resumo.totalGeralPessoas}
          color="blue"
        />
        <Card
          title="Receitas Totais"
          value={`R$ ${resumo.totalGeralReceitas.toFixed(2)}`}
          color="green"
        />
        <Card
          title="Despesas Totais"
          value={`R$ ${resumo.totalGeralDespesas.toFixed(2)}`}
          color="red"
        />
        <Card
          title="Saldo Líquido"
          value={`R$ ${resumo.saldoLiquidoGeral.toFixed(2)}`}
          color="indigo"
        />
      </div>

      {/* TABELA DE SALDOS POR PESSOA */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Saldos por Pessoa
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pessoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Receitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Despesas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resumo.dadosPorPessoa.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {item.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">
                    R$ {item.totalReceitas.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">
                    R$ {item.totalDespesas.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap font-bold ${item.saldo >= 0 ? "text-green-700" : "text-red-700"}`}
                  >
                    R$ {item.saldo.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para os Cards
function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
    indigo: "border-indigo-500 text-indigo-600",
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow border-l-4 ${colors[color]}`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
        {title}
      </p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
