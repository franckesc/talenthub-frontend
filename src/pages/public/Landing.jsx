import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
      <div>
        <p className="mb-4 font-semibold text-blue-700">
          Conecta con nuevas oportunidades
        </p>

        <h1 className="text-5xl font-bold leading-tight text-slate-950">
          Encuentra el empleo que impulsa tu futuro profesional
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-600">
          Descubre vacantes, crea tu perfil profesional y conecta con empresas
          que buscan personas como tú.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/empleos"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white"
          >
            Buscar empleos
          </Link>

          <Link
            to="/registro"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold"
          >
            Crear perfil gratis
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
        <p className="text-center text-slate-500">
          Aquí colocaremos la ilustración principal del diseño de Figma.
        </p>
      </div>
    </section>
  );
}

export default Landing;