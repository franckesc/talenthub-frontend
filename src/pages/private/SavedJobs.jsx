import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { jobs } from "../../data/jobs";
import useSavedJobs from "../../hooks/useSavedJobs";

function SavedJobs() {
  const {
    savedJobIds,
    removeJob,
    clearSavedJobs,
  } = useSavedJobs();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [jobToRemove, setJobToRemove] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  const savedJobs = useMemo(
    () =>
      jobs.filter((job) =>
        savedJobIds.includes(job.id),
      ),
    [savedJobIds],
  );

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = savedJobs.filter((job) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.location.toLowerCase().includes(normalizedSearch) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        )
      );
    });

    if (sortBy === "salary") {
      return [...result].sort(
        (firstJob, secondJob) =>
          secondJob.salaryMax - firstJob.salaryMax,
      );
    }

    if (sortBy === "title") {
      return [...result].sort((firstJob, secondJob) =>
        firstJob.title.localeCompare(secondJob.title),
      );
    }

    if (sortBy === "company") {
      return [...result].sort((firstJob, secondJob) =>
        firstJob.company.localeCompare(secondJob.company),
      );
    }

    return result;
  }, [savedJobs, search, sortBy]);

  const confirmRemove = () => {
    if (!jobToRemove) {
      return;
    }

    removeJob(jobToRemove.id);
    setJobToRemove(null);
  };

  const confirmClear = () => {
    clearSavedJobs();
    setShowClearModal(false);
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Empleos guardados
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Administra las oportunidades que deseas revisar más adelante.
            </p>
          </div>

          <Link
            to="/empleos"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
          >
            <FiSearch />
            Buscar más empleos
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <SummaryCard
            icon={FiBookmark}
            value={savedJobs.length}
            label="Empleos guardados"
          />

          <SummaryCard
            icon={FiBriefcase}
            value={
              savedJobs.filter(
                (job) => job.contractType === "Full-time",
              ).length
            }
            label="Vacantes de tiempo completo"
          />
        </div>

        {savedJobs.length > 0 && (
          <div className="mt-6 rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Buscar puesto, empresa o habilidad..."
                  className="h-10 w-full rounded-md border border-slate-300 bg-slate-50 pl-9 pr-10 text-sm outline-none transition focus:border-[#103f73] focus:ring-2 focus:ring-blue-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label="Limpiar búsqueda"
                  >
                    <FiX />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="h-10 rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-[#103f73]"
                >
                  <option value="recent">
                    Más recientes
                  </option>

                  <option value="salary">
                    Mayor salario
                  </option>

                  <option value="title">
                    Nombre del puesto
                  </option>

                  <option value="company">
                    Empresa
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowClearModal(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <FiTrash2 />
                  Vaciar guardados
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  onRemove={() => setJobToRemove(job)}
                />
              ))}
            </div>
          ) : savedJobs.length > 0 ? (
            <NoSearchResults
              onClearSearch={() => setSearch("")}
            />
          ) : (
            <EmptySavedJobs />
          )}
        </div>
      </section>

      {jobToRemove && (
        <RemoveSavedJobModal
          job={jobToRemove}
          onCancel={() => setJobToRemove(null)}
          onConfirm={confirmRemove}
        />
      )}

      {showClearModal && (
        <ClearSavedJobsModal
          count={savedJobs.length}
          onCancel={() => setShowClearModal(false)}
          onConfirm={confirmClear}
        />
      )}
    </>
  );
}

function SummaryCard({ icon: Icon, value, label }) {
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

function SavedJobCard({ job, onRemove }) {
  const formattedSalary =
    `${job.currency} ` +
    `${job.salaryMin.toLocaleString()} - ` +
    `${job.salaryMax.toLocaleString()}`;

  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-500">
          <FiBriefcase size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to={`/empleos/${job.id}`}
                className="text-base font-semibold text-slate-950 transition hover:text-[#103f73]"
              >
                {job.title}
              </Link>

              <p className="mt-1 text-sm font-semibold text-[#103f73]">
                {job.company}
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-[#103f73]">
              {job.modality}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
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

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {job.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              <FiTrash2 />
              Eliminar de guardados
            </button>

            <Link
              to={`/empleos/${job.id}`}
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#103f73] px-5 text-xs font-semibold text-white transition hover:bg-[#0b315d]"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptySavedJobs() {
  return (
    <div className="rounded-lg border border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#103f73]">
        <FiBookmark size={27} />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-slate-950">
        Todavía no tienes empleos guardados
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Guarda las oportunidades que te interesen para poder revisarlas
        nuevamente desde esta sección.
      </p>

      <Link
        to="/empleos"
        className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
      >
        <FiSearch />
        Explorar empleos
      </Link>
    </div>
  );
}

function NoSearchResults({ onClearSearch }) {
  return (
    <div className="rounded-lg border border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <FiSearch
        className="mx-auto text-slate-400"
        size={26}
      />

      <h2 className="mt-4 text-lg font-semibold text-slate-950">
        No encontramos coincidencias
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Prueba con otro puesto, empresa o habilidad.
      </p>

      <button
        type="button"
        onClick={onClearSearch}
        className="mt-5 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Limpiar búsqueda
      </button>
    </div>
  );
}

function RemoveSavedJobModal({
  job,
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
          Eliminar empleo guardado
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          ¿Deseas eliminar{" "}
          <strong className="text-slate-800">
            {job.title}
          </strong>{" "}
          de tus empleos guardados?
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
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function ClearSavedJobsModal({
  count,
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
          Vaciar empleos guardados
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Se eliminarán los {count} empleos guardados de esta lista.
          Esta acción no afecta tus postulaciones.
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
            Vaciar guardados
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;