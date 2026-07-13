import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiMapPin,
  FiSearch,
  FiStar,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { applications as initialApplications } from "../../data/applications";

const tabs = [
  {
    value: "todas",
    label: "Todas",
  },
  {
    value: "enviada",
    label: "Enviadas",
  },
  {
    value: "revision",
    label: "En revisión",
  },
  {
    value: "entrevista",
    label: "Entrevistas",
  },
  {
    value: "oferta",
    label: "Ofertas",
  },
  {
    value: "rechazada",
    label: "Finalizadas",
  },
];

const statusConfig = {
  enviada: {
    classes: "border-blue-200 bg-blue-50 text-blue-700",
    icon: FiFileText,
  },
  revision: {
    classes: "border-amber-200 bg-amber-50 text-amber-700",
    icon: FiClock,
  },
  entrevista: {
    classes: "border-violet-200 bg-violet-50 text-violet-700",
    icon: FiCalendar,
  },
  oferta: {
    classes: "border-green-200 bg-green-50 text-green-700",
    icon: FiStar,
  },
  rechazada: {
    classes: "border-slate-300 bg-slate-100 text-slate-600",
    icon: FiXCircle,
  },
};

function Applications() {
  const [applications, setApplications] = useState(initialApplications);
  const [activeTab, setActiveTab] = useState("todas");
  const [search, setSearch] = useState("");
  const [applicationToRemove, setApplicationToRemove] = useState(null);

  const filteredApplications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesTab =
        activeTab === "todas" || application.status === activeTab;

      const matchesSearch =
        !normalizedSearch ||
        application.title.toLowerCase().includes(normalizedSearch) ||
        application.company.toLowerCase().includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [applications, activeTab, search]);

  const counters = useMemo(
    () => ({
      total: applications.length,
      revision: applications.filter(
        (application) =>
          application.status === "revision" ||
          application.status === "enviada",
      ).length,
      interviews: applications.filter(
        (application) => application.status === "entrevista",
      ).length,
      offers: applications.filter(
        (application) => application.status === "oferta",
      ).length,
    }),
    [applications],
  );

  const confirmRemoveApplication = () => {
    if (!applicationToRemove) {
      return;
    }

    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationToRemove.id,
      ),
    );

    setApplicationToRemove(null);
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Mis postulaciones
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Consulta y administra el progreso de tus candidaturas.
            </p>
          </div>

          <Link
            to="/empleos"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
          >
            Buscar más empleos
            <FiArrowRight />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={FiFileText}
            label="Postulaciones"
            value={counters.total}
          />

          <SummaryCard
            icon={FiClock}
            label="En proceso"
            value={counters.revision}
          />

          <SummaryCard
            icon={FiCalendar}
            label="Entrevistas"
            value={counters.interviews}
          />

          <SummaryCard
            icon={FiStar}
            label="Ofertas"
            value={counters.offers}
          />
        </div>

        <div className="mt-6 rounded-lg border border-slate-300 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 pt-4">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={[
                    "shrink-0 border-b-2 px-4 pb-3 text-xs font-semibold transition",
                    activeTab === tab.value
                      ? "border-[#103f73] text-[#103f73]"
                      : "border-transparent text-slate-500 hover:text-slate-900",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="relative max-w-md">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por puesto o empresa..."
                className="h-10 w-full rounded-md border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-[#103f73] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onRemove={() => setApplicationToRemove(application)}
              />
            ))
          ) : (
            <div className="rounded-lg border border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiFileText size={24} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                No encontramos postulaciones
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                No tienes candidaturas que coincidan con esta búsqueda o
                estado.
              </p>

              <Link
                to="/empleos"
                className="mt-6 inline-flex rounded-md bg-[#103f73] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explorar empleos
              </Link>
            </div>
          )}
        </div>
      </section>

      {applicationToRemove && (
        <RemoveApplicationModal
          application={applicationToRemove}
          onCancel={() => setApplicationToRemove(null)}
          onConfirm={confirmRemoveApplication}
        />
      )}
    </>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#103f73]">
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

function ApplicationCard({ application, onRemove }) {
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  const progress = getApplicationProgress(application.status);

  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-500">
          <FiBriefcase size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to={`/empleos/${application.jobId}`}
                className="text-base font-semibold text-slate-950 transition hover:text-[#103f73]"
              >
                {application.title}
              </Link>

              <p className="mt-1 text-xs font-semibold text-slate-700">
                {application.company}
              </p>
            </div>

            <span
              className={[
                "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold",
                status.classes,
              ].join(" ")}
            >
              <StatusIcon />
              {application.statusLabel}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin />
              {application.location}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <FiBriefcase />
              {application.modality}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <FiCalendar />
              Postulado el {application.appliedAt}
            </span>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold text-slate-800">
                Progreso de la candidatura
              </p>

              <span className="text-xs font-semibold text-[#103f73]">
                {progress.percentage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#103f73] transition-all"
                style={{
                  width: `${progress.percentage}%`,
                }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span>Enviada</span>
              <span>Revisión</span>
              <span>Entrevista</span>
              <span>Oferta</span>
            </div>
          </div>

          <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold text-slate-800">
              Próximo paso
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {application.nextStep}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              Última actualización: {application.lastUpdate}
            </p>

            <div className="flex gap-2">
              {application.status === "entrevista" && (
                <Link
                  to="/entrevistas"
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-[#103f73] px-4 text-xs font-semibold text-white transition hover:bg-[#0b315d]"
                >
                  <FiCalendar />
                  Ver entrevista
                </Link>
              )}

              <Link
                to={`/empleos/${application.jobId}`}
                className="inline-flex h-9 items-center rounded-md border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver empleo
              </Link>

              {!["oferta", "rechazada"].includes(application.status) && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <FiTrash2 />
                  Retirar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function getApplicationProgress(status) {
  const progressMap = {
    enviada: 25,
    revision: 50,
    entrevista: 75,
    oferta: 100,
    rechazada: 50,
  };

  return {
    percentage: progressMap[status] ?? 25,
  };
}

function RemoveApplicationModal({
  application,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-5">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <FiTrash2 size={21} />
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-950">
          Retirar postulación
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Estás por retirar tu candidatura para{" "}
          <strong className="text-slate-800">
            {application.title}
          </strong>{" "}
          en {application.company}. Esta acción no se podrá deshacer.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Retirar postulación
          </button>
        </div>
      </div>
    </div>
  );
}

export default Applications;