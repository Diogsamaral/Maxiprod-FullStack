import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen">
      {/* Esse navbar é uma base para minimizar volume de codigo */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src="./logo.png" alt="Logo" className="h-10 w-10 " />
          <div className="space-x-6">
            <Link to="/" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/pessoas" className="hover:underline">
              Pessoas
            </Link>
            <Link to="/categorias" className="hover:underline">
              Categorias
            </Link>
            <Link to="/transacoes" className="hover:underline">
              Transações
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* O Outlet representa o espaço onde as páginas serão renderizadas */}
        <Outlet />
      </main>
    </div>
  );
}
