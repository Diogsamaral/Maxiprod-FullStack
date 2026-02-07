import { useEffect, useState } from "react";
import api from "../services/api";

interface Categoria {
  id?: number;
  descricao: string;
  finalidade: number; // 0: Despesa, 1: Receita, 2: Ambas
}

// Labels para exibição das finalidades
const finalidadesLabel = ["Despesa", "Receita", "Ambas"];

// Página de Categorias: Permite criar novas categorias e listar as existentes
export function Categorias() {
  // Estados para armazenar categorias, descrição e finalidade da nova categoria
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<number>(0);

  const carregarCategorias = async () => {
    const response = await api.get("/categorias");
    setCategorias(response.data);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    };

    loadData();
  }, []);

  // Função para lidar com o envio do formulário de nova categoria
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (descricao.length > 400) return alert("Máximo 400 caracteres!");

    try {
      await api.post("/categorias", { descricao, finalidade });
      setDescricao("");
      carregarCategorias();
    } catch {
      alert("Erro ao salvar categoria.");
    }
  };

  // Renderização da página de categorias
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Nova Categoria
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição (Máx 400)
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Finalidade
            </label>
            <select
              value={finalidade}
              onChange={(e) => setFinalidade(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value={0}>Despesa</option>
              <option value={1}>Receita</option>
              <option value={2}>Ambas</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Salvar Categoria
          </button>
        </form>
      </div>

      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Categorias Cadastradas</h2>
        <div className="space-y-2">
          {categorias.map((c) => (
            <div
              key={c.id}
              className="flex justify-between p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <span className="font-medium">{c.descricao}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  c.finalidade === 0
                    ? "bg-red-100 text-red-600"
                    : c.finalidade === 1
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                }`}
              >
                {finalidadesLabel[c.finalidade]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
