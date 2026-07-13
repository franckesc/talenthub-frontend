import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookmark,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiExternalLink,
  FiMapPin,
  FiShare2,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { jobs } from "../../data/jobs";

const detailsByJobId = {
  1: {
    companyDescription:
      "TechCorp Inc. desarrolla productos digitales utilizados por empresas de diferentes industrias. Su equipo trabaja de forma remota y utiliza tecnologías modernas.",
    responsibilities: [
      "Desarrollar y mantener interfaces web utilizando React.",
      "Participar en decisiones de arquitectura frontend.",
      "Colaborar con diseño, producto y backend.",
      "Revisar código y apoyar a otros desarrolladores.",
      "Mejorar el rendimiento y la accesibilidad de la plataforma.",
    ],
    requirements: [
      "Experiencia profesional desarrollando aplicaciones con React.",
      "Conocimientos sólidos de JavaScript o TypeScript.",
      "Experiencia consumiendo APIs REST.",
      "Manejo de Git y metodologías ágiles.",
      "Capacidad para trabajar en equipos remotos.",
    ],
    benefits: [
      "Trabajo completamente remoto.",
      "Horario flexible.",
      "Presupuesto para formación.",
      "Equipo de trabajo proporcionado por la empresa.",
    ],
    companySize: "201–500 empleados",
    industry: "Tecnología y software",
  },
  2: {
    companyDescription:
      "Innovate Solutions crea productos digitales centrados en el usuario para compañías europeas y latinoamericanas.",
    responsibilities: [
      "Diseñar flujos, wireframes y prototipos de alta fidelidad.",
      "Realizar investigación y pruebas con usuarios.",
      "Mantener y ampliar el sistema de diseño.",
      "Colaborar con desarrolladores y product managers.",
    ],
    requirements: [
      "Portafolio profesional de diseño UI/UX.",
      "Dominio de Figma.",
      "Conocimiento de diseño responsive y accesibilidad.",
      "Capacidad para justificar decisiones de diseño.",
    ],
    benefits: [
      "Modelo híbrido.",
      "Seguro médico.",
      "Formación profesional.",
      "Horario flexible.",
    ],
    companySize: "51–200 empleados",
    industry: "Consultoría digital",
  },
  3: {
    companyDescription:
      "WebTech Agency desarrolla sitios web, plataformas corporativas y soluciones de comercio electrónico para clientes internacionales.",
    responsibilities: [
      "Convertir diseños en interfaces responsive.",
      "Construir componentes reutilizables.",
      "Integrar servicios y APIs.",
      "Corregir errores y mejorar el rendimiento.",
    ],
    requirements: [
      "Experiencia con JavaScript, React, HTML y CSS.",
      "Conocimiento de diseño responsive.",
      "Uso de Git.",
      "Capacidad para trabajar con varios proyectos.",
    ],
    benefits: [
      "Plan de carrera.",
      "Capacitaciones internas.",
      "Eventos de equipo.",
      "Jornada flexible.",
    ],
    companySize: "51–200 empleados",
    industry: "Desarrollo web",
  },
  4: {
    companyDescription:
      "Digital Start ayuda a pequeñas empresas a modernizar sus procesos mediante páginas web y herramientas digitales.",
    responsibilities: [
      "Apoyar en la creación de páginas web.",
      "Realizar cambios visuales y funcionales.",
      "Documentar el trabajo realizado.",
      "Participar en reuniones de seguimiento.",
    ],
    requirements: [
      "Conocimientos básicos de HTML, CSS y JavaScript.",
      "Interés por aprender React.",
      "Conocimiento básico de Git.",
      "Disponibilidad para trabajo híbrido.",
    ],
    benefits: [
      "Mentoría técnica.",
      "Horario compatible con estudios.",
      "Experiencia en proyectos reales.",
      "Posibilidad de contratación.",
    ],
    companySize: "11–50 empleados",
    industry: "Servicios digitales",
  },
  5: {
    companyDescription:
      "Cloud Systems construye servicios backend, infraestructura y soluciones empresariales alojadas en la nube.",
    responsibilities: [
      "Diseñar y desarrollar APIs REST.",
      "Crear servicios seguros y escalables.",
      "Optimizar consultas y procedimientos SQL.",
      "Implementar autenticación y autorización.",
      "Participar en revisiones técnicas.",
    ],
    requirements: [
      "Experiencia con Node.js y Express.",
      "Conocimiento de SQL Server.",
      "Experiencia con JWT y seguridad de APIs.",
      "Conocimiento de arquitectura backend.",
    ],
    benefits: [
      "Trabajo remoto.",
      "Pagos internacionales.",
      "Horario flexible.",
      "Proyectos de largo plazo.",
    ],
    companySize: "51–200 empleados",
    industry: "Servicios en la nube",
  },
  6: {
    companyDescription:
      "Creative Studio desarrolla campañas, identidades visuales, interfaces y contenidos para marcas de diferentes sectores.",
    responsibilities: [
      "Apoyar en el diseño de interfaces y publicaciones.",
      "Crear prototipos y presentaciones.",
      "Organizar recursos gráficos.",
      "Colaborar con el equipo creativo.",
    ],
    requirements: [
      "Conocimientos básicos de Figma y Canva.",
      "Interés por UI/UX y diseño digital.",
      "Creatividad y atención al detalle.",
      "Disponibilidad presencial.",
    ],
    benefits: [
      "Mentoría de diseñadores.",
      "Certificado de prácticas.",
      "Portafolio con proyectos reales.",
      "Ambiente creativo.",
    ],
    companySize: "11–50 empleados",
    industry: "Diseño y publicidad",
  },
};

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const job = useMemo(
    () => jobs.find((currentJob) => currentJob.id === Number(id)),
    [id],
  );

  const details = detailsByJobId[Number(id)];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);

      window.setTimeout(() => {
        setShared(false);
      }, 2500);
    } catch {
      setShared(false);
    }
  };

  const handleApplicationSubmit = (event) => {
    event.preventDefault();

    setApplicationSent(true);
    setShowApplicationModal(false);
    setCoverLetter("");
  };

  if (!job) {
    return (
      <section className="rounded-lg border border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FiBriefcase size={24} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-950">
          Empleo no encontrado
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          La vacante que estás buscando no existe o ya no está disponible.
        </p>

        <Link
          to="/empleos"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#103f73] px-5 py-2.5 text-sm font-semibold text-white"
        >
          <FiArrowLeft />
          Volver a empleos
        </Link>
      </section>
    );
  }

  const formattedSalary = `${job.currency} ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}`;

  return (
    <>
      <section>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#103f73]"
        >
          <FiArrowLeft />
          Volver a empleos
        </button>

        {applicationSent && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <FiCheckCircle className="mt-0.5 shrink-0" />
            <p>
              Tu postulación fue registrada correctamente. Más adelante
              conectaremos esta acción con SQL Server.
            </p>
          </div>
        )}

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
          <div className="space-y-5">
            <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-500">
                  <FiBriefcase size={29} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-950">
                        {job.title}
                      </h1>

                      <p className="mt-2 text-sm font-semibold text-[#103f73]">
                        {job.company}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-blue-500 px-3 py-1.5 text-[11px] font-semibold text-white">
                      {job.modality}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FiMapPin />
                      {job.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <FiBriefcase />
                      {job.contractType}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <FiDollarSign />
                      {formattedSalary}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <FiClock />
                      {job.publishedAt}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setShowApplicationModal(true)}
                      disabled={applicationSent}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#103f73] px-6 text-sm font-semibold text-white transition hover:bg-[#0b315d] disabled:cursor-not-allowed disabled:bg-green-600"
                    >
                      {applicationSent ? "Postulación enviada" : "Aplicar ahora"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSaved((current) => !current)}
                      className={[
                        "inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition",
                        saved
                          ? "border-[#103f73] bg-blue-50 text-[#103f73]"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {saved ? <FiCheckCircle /> : <FiBookmark />}
                      {saved ? "Guardado" : "Guardar"}
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {shared ? <FiCheck /> : <FiShare2 />}
                      {shared ? "Enlace copiado" : "Compartir"}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <ContentSection title="Descripción del puesto">
              <p>{job.description}</p>

              <p className="mt-4">
                Esta posición ofrece la oportunidad de trabajar con un equipo
                profesional, participar en proyectos relevantes y continuar
                desarrollando tus habilidades.
              </p>
            </ContentSection>

            <ContentSection title="Responsabilidades">
              <BulletList items={details?.responsibilities ?? []} />
            </ContentSection>

            <ContentSection title="Requisitos">
              <BulletList items={details?.requirements ?? []} />
            </ContentSection>

            <ContentSection title="Habilidades requeridas">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ContentSection>

            <ContentSection title="Beneficios">
              <BulletList items={details?.benefits ?? []} />
            </ContentSection>
          </div>

          <aside className="space-y-5">
            <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <FiBriefcase size={25} />
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-950">
                {job.company}
              </h2>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                {details?.companyDescription}
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-[#103f73]" />
                  {details?.companySize}
                </div>

                <div className="flex items-center gap-2">
                  <FiBriefcase className="text-[#103f73]" />
                  {details?.industry}
                </div>

                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#103f73]" />
                  {job.location}
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-300 text-xs font-semibold text-[#103f73] transition hover:bg-slate-50"
              >
                Ver empresa
                <FiExternalLink />
              </button>
            </section>

            <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">
                Resumen de la vacante
              </h2>

              <div className="mt-4 space-y-4">
                <SummaryItem
                  label="Modalidad"
                  value={job.modality}
                />

                <SummaryItem
                  label="Contrato"
                  value={job.contractType}
                />

                <SummaryItem
                  label="Experiencia"
                  value={job.experienceLevel}
                />

                <SummaryItem
                  label="Salario"
                  value={formattedSalary}
                />
              </div>
            </section>
          </aside>
        </div>
      </section>

      {showApplicationModal && (
        <ApplicationModal
          job={job}
          coverLetter={coverLetter}
          onCoverLetterChange={setCoverLetter}
          onClose={() => setShowApplicationModal(false)}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </>
  );
}

function ContentSection({ title, children }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-base font-semibold text-slate-950">
        {title}
      </h2>

      <div className="mt-4 text-sm leading-7 text-slate-600">
        {children}
      </div>
    </article>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <FiCheckCircle
            className="mt-1 shrink-0 text-[#103f73]"
            size={16}
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function ApplicationModal({
  job,
  coverLetter,
  onCoverLetterChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-5 py-8">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Postular a {job.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {job.company}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-slate-800"
            aria-label="Cerrar"
          >
            <FiX size={21} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <label
            htmlFor="coverLetter"
            className="text-sm font-semibold text-slate-900"
          >
            Mensaje para el reclutador
          </label>

          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(event) =>
              onCoverLetterChange(event.target.value)
            }
            rows={6}
            placeholder="Cuéntale brevemente a la empresa por qué eres una buena opción para el puesto..."
            className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-[#103f73] focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold text-slate-800">
              Currículum del perfil
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Posteriormente utilizaremos el CV almacenado en tu perfil.
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="h-10 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
            >
              Enviar postulación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobDetail;