import { Link, Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            TalentHub
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link to="/empleos" className="hover:text-blue-700">
              Buscar empleos
            </Link>

            <Link to="/empresas" className="hover:text-blue-700">
              Empresas
            </Link>

            <Link to="/login" className="hover:text-blue-700">
              Iniciar sesión
            </Link>

            <Link
              to="/registro"
              className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            >
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;