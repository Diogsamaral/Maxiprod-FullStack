import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Pessoas } from "./pages/Pessoas";
import { Categorias } from "./pages/Categorias";
import { Dashboard } from "./pages/Dashboard";
import { Transacoes } from "./pages/Transacoes";

export default function App() {
  // O BrowserRouter é o componente que envolve toda a aplicação e permite o uso do roteamento.
  // O Routes é o componente que define as rotas da aplicação.
  // O Route é o componente que define cada rota, onde o path é a URL e o element é o componente a ser renderizado.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pessoas" element={<Pessoas />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="transacoes" element={<Transacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
