import { useEffect, useState } from "react";
import api from "../services/api";
import { AxiosError } from "axios";

// Interfaces para tipagem
interface Pessoa {
  id: number;
  nome: string;
}
interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
}
interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: number; // 0: Despesa, 1: Receita
  categoriaId: number;
  pessoaId: number;
  categoria?: Categoria;
  pessoa?: Pessoa;
}

// Página de Transações: Permite criar novas transações e listar as existentes
export function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [pessoaId, setPessoaId] = useState<number>(0);

  useEffect(() => {
    // Carrega tudo ao entrar na página
    api.get("/transacoes").then((r) => setTransacoes(r.data));
    api.get("/pessoas").then((r) => setPessoas(r.data));
    api.get("/categorias").then((r) => setCategorias(r.data));
  }, []);

  // Função para salvar nova transação
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (valor <= 0) return alert("O valor deve ser positivo!");

    try {
      await api.post("/transacoes", {
        descricao,
        valor,
        tipo,
        categoriaId,
        pessoaId,
      });
      alert("Transação realizada!");
      // Reset e Recarregar
      setDescricao("");
      setValor(0);
      api.get("/transacoes").then((r) => setTransacoes(r.data));
    } catch (error) {
      // Aqui o React exibe o erro que o C# enviou (ex: Categoria incompatível)
      const axiosError = error as AxiosError;
      alert(axiosError.response?.data || "Erro ao salvar transação.");
    }
  };

  // Renderização da página de transações
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">
          Nova Transação
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="border p-2 rounded"
            required
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value))}
            className="border p-2 rounded bg-white"
          >
            <option value={0}>Despesa</option>
            <option value={1}>Receita</option>
          </select>

          <select
            value={pessoaId}
            onChange={(e) => setPessoaId(Number(e.target.value))}
            className="border p-2 rounded bg-white"
            required
          >
            <option value="">Selecione a Pessoa</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            className="border p-2 rounded bg-white"
            required
          >
            <option value="">Selecione a Categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700"
          >
            Lançar Transação
          </button>
        </form>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Pessoa</th>
              <th className="px-4 py-2 text-left">Categoria</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.descricao}</td>
                <td className="px-4 py-2">{t.pessoa?.nome}</td>
                <td className="px-4 py-2">{t.categoria?.descricao}</td>
                <td
                  className={`px-4 py-2 font-bold ${t.tipo === 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {t.tipo === 0 ? "-" : "+"} R$ {t.valor.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
