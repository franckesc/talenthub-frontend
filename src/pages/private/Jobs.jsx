import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiMapPin,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { jobs } from "../../data/jobs";

const modalityOptions = ["Remoto", "Híbrido", "Presencial"];

const contractOptions = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Prácticas",
];

const experienceOptions = [
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
];

function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortBy, setSortBy] = useState("recent");

  const filteredJobs = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    const result = jobs.filter((job) => {
      const matchesKeyword =
        !normalizedKeyword ||
        job.title.toLowerCase().includes(normalizedKeyword) ||
        job.company.toLowerCase().includes(normalizedKeyword) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedKeyword),
        );

      const matchesLocation =
        !normalizedLocation ||
        job.location.toLowerCase().includes(normalizedLocation) ||
        job.city.toLowerCase().includes(normalizedLocation);

      const matchesModality =
        selectedModalities.length === 0 ||
        selectedModalities.includes(job.modality);

      const matchesContract =
        selectedContracts.length === 0 ||
        selectedContracts.includes(job.contractType);

      const matchesExperience =
        selectedExperiences.length === 0 ||
        selectedExperiences.includes(job.experienceLevel);

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesModality &&
        matchesContract &&
        matchesExperience
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

    return result;
  }, [
    keyword,
    location,
    selectedModalities,
    selectedContracts,
    selectedExperiences,
    sortBy,
  ]);

  const toggleFilter = (value, setter) => {
    setter((currentValues) =>
      currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value],
    );
  };

  const toggleSavedJob = (jobId) => {
    setSavedJobs((currentJobs) =>
      currentJobs.includes(jobId)
        ? currentJobs.filter((id) => id !== jobId)
        : [...currentJobs, jobId],
    );
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setSelectedModalities([]);
    setSelectedContracts([]);
    setSelectedExperiences([]);
    setSortBy("recent");
  };

  const activeFiltersCount =
    selectedModalities.length +
    selectedContracts.length +
    selectedExperiences.length +
    Number(Boolean(keyword.trim())) +
    Number(Boolean(location.trim()));

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-slate-950">
        Buscar empleo
      </h1>

      <div className="rounded-lg border border-slate-300 bg-white p-2 shadow-sm">
        <div className="grid gap-2 lg:grid-cols-[1fr_1fr_105px]">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />

            <input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Cargo, habilidad o empresa"
              className="h-11 w-full rounded-md border-0 bg-slate-100 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <FiMapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />

            <input
              type="search"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Ciudad o modalidad"
              className="h-11 w-full rounded-md border-0 bg-slate-100 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            className="h-11 rounded-md bg-[#103f73] text-sm font-semibold text-white transition hover:bg-[#0b315d]"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[205px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <FiFilter />
              Filtros
            </h2>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600"
              >
                <FiX />
                Limpiar
              </button>
            )}
          </div>

          <FilterGroup
            title="Modalidad"
            options={modalityOptions}
            selectedValues={selectedModalities}
            onToggle={(value) =>
              toggleFilter(value, setSelectedModalities)
            }
          />

          <FilterGroup
            title="Tipo de contrato"
            options={contractOptions}
            selectedValues={selectedContracts}
            onToggle={(value) =>
              toggleFilter(value, setSelectedContracts)
            }
          />

          <FilterGroup
            title="Experiencia"
            options={experienceOptions}
            selectedValues={selectedExperiences}
            onToggle={(value) =>
              toggleFilter(value, setSelectedExperiences)
            }
          />
        </aside>

        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Mostrando{" "}
              <strong className="text-[#103f73]">
                {filteredJobs.length}
              </strong>{" "}
              empleos encontrados
            </p>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-[#103f73]"
            >
              <option value="recent">Más recientes</option>
              <option value="salary">Mayor salario</option>
              <option value="title">Orden alfabético</option>
            </select>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={savedJobs.includes(job.id)}
                  onToggleSaved={() => toggleSavedJob(job.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <FiSearch size={23} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                No encontramos empleos
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Prueba con otras palabras, ubicaciones o elimina algunos
                filtros.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-md bg-[#103f73] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  title,
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <fieldset className="mt-5 border-t border-slate-200 pt-4">
      <legend className="mb-3 text-xs font-semibold text-slate-900">
        {title}
      </legend>

      <div className="space-y-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => onToggle(option)}
              className="h-3.5 w-3.5 accent-[#103f73]"
            />

            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function JobCard({ job, saved, onToggleSaved }) {
  const formattedSalary = `${job.currency} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`;

  return (
    <article className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm transition hover:border-slate-400 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-50 text-slate-500">
          <FiBriefcase size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to={`/empleos/${job.id}`}
                className="text-base font-semibold text-slate-950 transition hover:text-[#103f73]"
              >
                {job.title}
              </Link>

              <p className="mt-1 text-xs font-medium text-slate-800">
                {job.company}
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-500 px-3 py-1 text-[10px] font-semibold text-white">
              {job.modality}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <FiMapPin />
              {job.location}
            </span>

            <span className="inline-flex items-center gap-1">
              <FiBriefcase />
              {job.contractType}
            </span>

            <span>{formattedSalary}</span>

            <span className="inline-flex items-center gap-1">
              <FiClock />
              {job.publishedAt}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {job.description}
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={onToggleSaved}
                className={[
                  "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition",
                  saved
                    ? "border-[#103f73] bg-blue-50 text-[#103f73]"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {saved ? <FiCheckCircle /> : <FiBookmark />}
                {saved ? "Guardado" : "Guardar"}
              </button>

              <Link
                to={`/empleos/${job.id}`}
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#103f73] px-4 text-xs font-semibold text-white transition hover:bg-[#0b315d]"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Jobs;