import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBookmark,
  FiBriefcase,
  FiCalendar,
  FiFileText,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

const navigationItems = [
  {
    label: "Inicio",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    label: "Buscar empleo",
    path: "/empleos",
    icon: FiSearch,
  },
  {
    label: "Mis postulaciones",
    path: "/mis-postulaciones",
    icon: FiFileText,
  },
  {
    label: "Guardados",
    path: "/guardados",
    icon: FiBookmark,
  },
  {
    label: "Entrevistas",
    path: "/entrevistas",
    icon: FiCalendar,
  },
  {
    label: "Mensajes",
    path: "/mensajes",
    icon: FiMessageSquare,
  },
  {
    label: "Notificaciones",
    path: "/notificaciones",
    icon: FiBell,
  },
  {
    label: "Mi perfil",
    path: "/perfil",
    icon: FiUser,
  },
];

function PrivateLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nombreCompleto =
    `${user?.nombre ?? ""} ${user?.apellido ?? ""}`.trim() ||
    "Usuario TalentHub";

  const iniciales = `${user?.nombre?.[0] ?? ""}${user?.apellido?.[0] ?? ""}`
    .toUpperCase()
    .slice(0, 2) || "TH";

  const tituloProfesional =
    user?.titulo_profesional ||
    (user?.rol === "reclutador"
      ? "Empresa / Reclutador"
      : "Profesional TalentHub");

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="flex h-[50px] items-center gap-6 px-5 lg:px-16">
          <BrandLogo to="/dashboard" />

          <div className="mx-auto hidden w-full max-w-[440px] md:block">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={15}
              />

              <input
                type="search"
                placeholder="Buscar empleos, empresas o contactos..."
                className="h-8 w-full rounded-md border-0 bg-slate-100 pl-9 pr-3 text-xs outline-none transition focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-5 text-slate-500">
            <Link
              to="/notificaciones"
              className="relative transition hover:text-[#103f73]"
              aria-label="Notificaciones"
            >
              <FiBell size={18} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border border-white bg-red-500" />
            </Link>

            <Link
              to="/mensajes"
              className="transition hover:text-[#103f73]"
              aria-label="Mensajes"
            >
              <FiMessageSquare size={18} />
            </Link>

            <Link
              to="/perfil"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white"
              title={nombreCompleto}
            >
              {iniciales}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-50px)] max-w-[1240px]">
        <aside className="hidden w-[225px] shrink-0 border-r border-slate-200 bg-[#f5f8fc] px-4 py-5 md:flex md:flex-col">
          <section className="rounded-md border border-slate-300 bg-white px-5 py-4 text-center">
            <Link
              to="/perfil"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white"
            >
              {iniciales}
            </Link>

            <h2 className="mt-3 text-sm font-semibold text-slate-950">
              {nombreCompleto}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {tituloProfesional}
            </p>

            <Link
              to="/perfil"
              className="mt-3 inline-block text-xs font-semibold text-[#103f73] hover:underline"
            >
              Ver perfil
            </Link>
          </section>

          <nav className="mt-4 flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition",
                      isActive
                        ? "bg-slate-200 text-[#103f73]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                    ].join(" ")
                  }
                >
                  <Icon size={17} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-slate-300 pt-4">
            <NavLink
              to="/configuracion"
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition",
                  isActive
                    ? "bg-slate-200 text-[#103f73]"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")
              }
            >
              <FiSettings size={17} />
              Configuración
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <FiLogOut size={17} />
              Cerrar sesión
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-5 lg:px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;