import { Link, Outlet } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import PublicFooter from "../components/PublicFooter";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[50px] max-w-7xl items-center justify-between px-6">
          <BrandLogo />

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-500 md:flex">
            <Link to="/empleos" className="hover:text-[#103f73]">
              Buscar empleo
            </Link>

            <Link to="/empresas" className="hover:text-[#103f73]">
              Empresas
            </Link>
          </nav>

          <div className="flex items-center gap-5 text-xs font-semibold">
            <Link to="/login" className="text-slate-800 hover:text-[#103f73]">
              Iniciar sesión
            </Link>

            <Link
              to="/registro"
              className="rounded bg-[#103f73] px-4 py-2 text-white transition hover:bg-[#0b315d]"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}

export default PublicLayout;