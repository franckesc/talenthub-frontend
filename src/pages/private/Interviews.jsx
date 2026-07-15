import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiMapPin,
  FiSearch,
  FiUser,
  FiVideo,
  FiXCircle,
} from "react-icons/fi";

const interviewsData = [
  {
    id: 1,
    jobId: 1,
    title: "Entrevista técnica",
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc.",
    interviewer: "Laura Martínez",
    date: "15 de julio de 2026",
    time: "10:00 AM",
    duration: "45 minutos",
    modality: "Virtual",
    status: "confirmada",
    meetingUrl: "https://meet.google.com/",
    location: null,
    notes:
      "Revisión de conocimientos en React, TypeScript, arquitectura frontend y resolución de problemas.",
  },
  {
    id: 2,
    jobId: 2,
    title: "Entrevista de recursos humanos",
    jobTitle: "Product Designer (UI/UX)",
    company: "Innovate Solutions",
    interviewer: "Carlos Méndez",
    date: "18 de julio de 2026",
    time: "2:30 PM",
    duration: "30 minutos",
    modality: "Virtual",
    status: "programada",
    meetingUrl: "https://meet.google.com/",
    location: null,
    notes:
      "Conversación sobre experiencia profesional, disponibilidad y expectativas laborales.",
  },
  {
    id: 3,
    jobId: 4,
    title: "Entrevista presencial",
    jobTitle: "Junior Web Developer",
    company: "Digital Start",
    interviewer: "María López",
    date: "20 de julio de 2026",
    time: "9:00 AM",
    duration: "60 minutos",
    modality: "Presencial",
    status: "programada",
    meetingUrl: null,
    location: "Managua, Nicaragua",
    notes:
      "Presentarse 15 minutos antes y llevar una copia del currículum.",
  },
  {
    id: 4,
    jobId: 3,
    title: "Entrevista inicial",
    jobTitle: "Frontend Developer",
    company: "WebTech Agency",
    interviewer: "Daniel Ruiz",
    date: "2 de julio de 2026",
    time: "11:00 AM",
    duration: "30 minutos",
    modality: "Virtual",
    status: "completada",
    meetingUrl: null,
    location: null,
    notes: "Entrevista inicial completada correctamente.",
  },
  {
    id: 5,
    jobId: 5,
    title: "Entrevista técnica",
    jobTitle: "Backend Node.js Developer",
    company: "Cloud Systems",
    interviewer: "Andrea Torres",
    date: "28 de junio de 2026",
    time: "3:00 PM",
    duration: "45 minutos",
    modality: "Virtual",
    status: "cancelada",
    meetingUrl: null,
    location: null,
    notes: "La empresa canceló la entrevista y cerró el proceso.",
  },
];

const statusConfig = {
  confirmada: {
    label: "Confirmada",
    classes: "border-green-200 bg-green-50 text-green-700",
    icon: FiCheckCircle,
  },
  programada: {
    label: "Programada",
    classes: "border-blue-200 bg-blue-50 text-blue-700",
    icon: FiCalendar,
  },
  completada: {
    label: "Completada",
    classes: "border-slate-300 bg-slate-100 text-slate-600",
    icon: FiCheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    classes: "border-red-200 bg-red-50 text-red-700",
    icon: FiXCircle,
  },
};

function Interviews() {
  const [activeTab, setActiveTab] = useState("proximas");
  const [search, setSearch] = useState("");
  const [selectedInterview, setSelectedInterview] = useState(null);

  const filteredInterviews = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return interviewsData.filter((interview) => {
      const isUpcoming = ["confirmada", "programada"].includes(
        interview.status,
      );

      const matchesTab =
        activeTab === "todas" ||
        (activeTab === "proximas" && isUpcoming) ||
        (activeTab === "anteriores" && !isUpcoming);

      const matchesSearch =
        !normalizedSearch ||
        interview.jobTitle.toLowerCase().includes(normalizedSearch) ||
        interview.company.toLowerCase().includes(normalizedSearch) ||
        interview.interviewer.toLowerCase().includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const upcomingCount = interviewsData.filter((interview) =>
    ["confirmada", "programada"].includes(interview.status),
  ).length;

  const completedCount = interviewsData.filter(
    (interview) => interview.status === "completada",
  ).length;

  return (
    <>
      <section>
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Entrevistas
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Consulta tus próximas entrevistas y el historial de procesos.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <SummaryCard
            icon={FiCalendar}
            label="Próximas entrevistas"
            value={upcomingCount}
          />

          <SummaryCard
            icon={FiCheckCircle}
            label="Completadas"
            value={completedCount}
          />

          <SummaryCard
            icon={FiClock}
            label="Total"
            value={interviewsData.length}
          />
        </div>

        <div className="mt-6 rounded-lg border border-slate-300 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1">
              {[
                { value: "proximas", label: "Próximas" },
                { value: "anteriores", label: "Anteriores" },
                { value: "todas", label: "Todas" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={[
                    "rounded-md px-4 py-2 text-xs font-semibold transition",
                    activeTab === tab.value
                      ? "bg-[#103f73] text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:max-w-xs">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar empresa o puesto..."
                className="h-10 w-full rounded-md border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-[#103f73] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onViewDetails={() => setSelectedInterview(interview)}
              />
            ))
          ) : (
            <div className="rounded-lg border border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiCalendar size={24} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                No encontramos entrevistas
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                No tienes entrevistas que coincidan con esta búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedInterview && (
        <InterviewModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#103f73]">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-950">
          {value}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {label}
        </p>
      </div>
    </article>
  );
}

function InterviewCard({ interview, onViewDetails }) {
  const status = statusConfig[interview.status];
  const StatusIcon = status.icon;

  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#103f73]">
          {interview.modality === "Virtual" ? (
            <FiVideo size={22} />
          ) : (
            <FiMapPin size={22} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                {interview.title}
              </h2>

              <Link
                to={`/empleos/${interview.jobId}`}
                className="mt-1 block text-sm font-semibold text-[#103f73] hover:underline"
              >
                {interview.jobTitle}
              </Link>

              <p className="mt-1 text-xs text-slate-600">
                {interview.company}
              </p>
            </div>

            <span
              className={[
                "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold",
                status.classes,
              ].join(" ")}
            >
              <StatusIcon />
              {status.label}
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-xs text-slate-500 sm:grid-cols-2 xl:grid-cols-4">
            <span className="inline-flex items-center gap-2">
              <FiCalendar className="text-[#103f73]" />
              {interview.date}
            </span>

            <span className="inline-flex items-center gap-2">
              <FiClock className="text-[#103f73]" />
              {interview.time}
            </span>

            <span className="inline-flex items-center gap-2">
              <FiVideo className="text-[#103f73]" />
              {interview.modality}
            </span>

            <span className="inline-flex items-center gap-2">
              <FiUser className="text-[#103f73]" />
              {interview.interviewer}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Duración estimada: {interview.duration}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onViewDetails}
                className="h-9 rounded-md border border-slate-300 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver detalles
              </button>

              {interview.meetingUrl &&
                ["confirmada", "programada"].includes(
                  interview.status,
                ) && (
                  <a
                    href={interview.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-[#103f73] px-4 text-xs font-semibold text-white transition hover:bg-[#0b315d]"
                  >
                    <FiVideo />
                    Unirse a la llamada
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function InterviewModal({ interview, onClose }) {
  const status = statusConfig[interview.status];
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-5 py-8">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              {interview.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {interview.company}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-slate-800"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-6">
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
              status.classes,
            ].join(" ")}
          >
            <StatusIcon />
            {status.label}
          </span>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              icon={FiBriefcase}
              label="Puesto"
              value={interview.jobTitle}
            />

            <DetailItem
              icon={FiUser}
              label="Entrevistador"
              value={interview.interviewer}
            />

            <DetailItem
              icon={FiCalendar}
              label="Fecha"
              value={interview.date}
            />

            <DetailItem
              icon={FiClock}
              label="Horario"
              value={`${interview.time} · ${interview.duration}`}
            />

            <DetailItem
              icon={FiVideo}
              label="Modalidad"
              value={interview.modality}
            />

            <DetailItem
              icon={FiMapPin}
              label="Ubicación"
              value={interview.location || "Reunión en línea"}
            />
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-900">
              Indicaciones
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {interview.notes}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cerrar
            </button>

            {interview.meetingUrl &&
              ["confirmada", "programada"].includes(
                interview.status,
              ) && (
                <a
                  href={interview.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white hover:bg-[#0b315d]"
                >
                  <FiExternalLink />
                  Abrir reunión
                </a>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Icon className="text-[#103f73]" />
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default Interviews;