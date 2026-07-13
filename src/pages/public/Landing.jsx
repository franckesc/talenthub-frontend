import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiSearch,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "1.",
    title: "Crea tu perfil",
    description: "Destaca tus habilidades y experiencia.",
    icon: FiUsers,
  },
  {
    number: "2.",
    title: "Explora",
    description: "Encuentra empleos que se ajusten a ti.",
    icon: FiSearch,
  },
  {
    number: "3.",
    title: "Postula",
    description: "Aplica con un solo clic a las mejores empresas.",
    icon: FiCheckCircle,
  },
  {
    number: "4.",
    title: "Sé contratado",
    description: "Realiza entrevistas y consigue el puesto.",
    icon: FiBriefcase,
  },
];

const metrics = [
  { value: "+50K", label: "Empleos activos" },
  { value: "+10K", label: "Empresas" },
  { value: "+2M", label: "Usuarios" },
  { value: "98%", label: "Satisfacción" },
];

function Landing() {
  return (
    <>
      <section className="relative min-h-[490px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#0d3d70]/90" />

        <div className="relative mx-auto flex min-h-[490px] max-w-7xl items-center justify-center px-6 py-20 text-center text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Impulsa tu carrera.
              <br />
              Encuentra el trabajo de tus sueños.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-6 text-blue-50">
              Únete a la red profesional más confiable. Conecta con empresas
              líderes, postula a oportunidades exclusivas y lleva tu
              trayectoria al siguiente nivel.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/empleos"
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-[#103f73] transition hover:bg-slate-100"
              >
                <FiSearch size={18} />
                Buscar empleos
              </Link>

              <Link
                to="/registro"
                className="inline-flex min-w-44 items-center justify-center rounded border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Crear perfil gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f7f9fc]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              ¿Cómo funciona TalentHub?
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Cuatro pasos simples para conectar con tu próxima gran
              oportunidad profesional.
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="text-center">
                  <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-xl bg-slate-100 text-[#103f73]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {step.number} {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f1f5fa]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Confianza y seguridad en cada conexión
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500">
              Más de 10,000 empresas confían en TalentHub para encontrar el
              mejor talento. Únete a la comunidad de profesionales en
              crecimiento.
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <FiShield className="text-[#103f73]" size={18} />
                Perfiles verificados y empresas reales.
              </div>

              <div className="flex items-center gap-3 text-sm font-medium">
                <FiUser className="text-[#103f73]" size={18} />
                Conexiones directas con reclutadores.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-lg border border-slate-200 bg-white px-6 py-7 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-[#103f73]">
                  {metric.value}
                </p>

                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {metric.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿Listo para tu próximo desafío?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500">
            Regístrate hoy mismo y comienza a explorar miles de oportunidades
            diseñadas para tu perfil profesional.
          </p>

          <Link
            to="/registro"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#103f73] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
          >
            Comenzar ahora
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Landing;