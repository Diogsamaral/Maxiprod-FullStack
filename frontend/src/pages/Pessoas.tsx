import { useEffect, useState } from "react";
import api from "../services/api";

// Interface para os dados de pessoa
interface Pessoa {
  id?: number;
  nome: string;
  idade: number;
}

// Página de Pessoas: Permite criar novas pessoas e listar as existentes
export function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);

  // Função para carregar a lista do banco
  const carregarPessoas = async () => {
    const response = await api.get("/pessoas");
    setPessoas(response.data);
  };

  // Carrega os dados ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("/pessoas");
      setPessoas(response.data);
    };

    loadData();
  }, []);

  // Função para salvar nova pessoa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/pessoas", { nome, idade });
      setNome("");
      setIdade(0);
      carregarPessoas(); // Atualiza a lista após salvar
      alert("Pessoa cadastrada com sucesso!");
    } catch {
      alert("Erro ao cadastrar pessoa.");
    }
  };

  // Renderização da página de pessoas
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* FORMULÁRIO */}
      <div className="bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Nova Pessoa
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idade
            </label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Salvar Pessoa
          </button>
        </form>
      </div>

      {/* LISTAGEM */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Pessoas Cadastradas
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Idade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pessoas.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {p.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.idade}
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
