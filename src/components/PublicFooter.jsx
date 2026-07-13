import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-9 md:flex-row">
        <BrandLogo />

        <nav className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
          <Link to="/" className="hover:text-[#103f73]">
            Acerca de
          </Link>

          <Link to="/" className="hover:text-[#103f73]">
            Privacidad
          </Link>

          <Link to="/" className="hover:text-[#103f73]">
            Términos
          </Link>

          <Link to="/" className="hover:text-[#103f73]">
            Soporte
          </Link>
        </nav>

        <p className="text-xs text-slate-500">
          © 2026 TalentHub. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default PublicFooter;