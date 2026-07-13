import { Link, NavLink, Outlet } from "react-router-dom";

const navigationItems = [
  { label: "Inicio", path: "/dashboard" },
  { label: "Buscar empleo", path: "/empleos" },
  { label: "Mis postulaciones", path: "/mis-postulaciones" },
  { label: "Guardados", path: "/guardados" },
  { label: "Entrevistas", path: "/entrevistas" },
  { label: "Mensajes", path: "/mensajes" },
  { label: "Notificaciones", path: "/notificaciones" },
  { label: "Mi perfil", path: "/perfil" },
  { label: "Configuración", path: "/configuracion" },
];

function PrivateLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between px-6">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-700">
            TalentHub
          </Link>

          <Link
            to="/perfil"
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium"
          >
            Mi perfil
          </Link>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;