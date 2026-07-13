import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookmark,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiFileText,
  FiMapPin,
  FiSend,
  FiVideo,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    location: "Remoto",
    modality: "Full-time",
    published: "Hace 2 horas",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Innovate Solutions",
    location: "Madrid, España",
    modality: "Híbrido",
    published: "Hace 5 horas",
  },
  {
    id: 3,
    title: "UI/UX Designer & Developer",
    company: "Creative Studio",
    location: "Barcelona, España",
    modality: "Presencial",
    published: "Hace 1 día",
  },
];

function Dashboard() {
  const { user } = useAuth();

  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const initials = useMemo(() => {
    const firstInitial = user?.nombre?.[0] ?? "";
    const lastInitial = user?.apellido?.[0] ?? "";

    return `${firstInitial}${lastInitial}`.toUpperCase() || "TH";
  }, [user]);

  const handlePublish = (event) => {
    event.preventDefault();

    const content = postContent.trim();

    if (!content) {
      return;
    }

    const newPost = {
      id: Date.now(),
      content,
      createdAt: "Ahora",
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPostContent("");
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs((currentSavedJobs) => {
      const isSaved = currentSavedJobs.includes(jobId);

      if (isSaved) {
        return currentSavedJobs.filter((id) => id !== jobId);
      }

      return [...currentSavedJobs, jobId];
    });
  };

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold text-slate-950">
        Inicio
      </h1>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_315px]">
        <div className="min-w-0">
          <form
            onSubmit={handlePublish}
            className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <textarea
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
                  placeholder="Comparte una actualización o artículo..."
                  rows={1}
                  className="min-h-10 w-full resize-none rounded-full border-0 bg-slate-100 px-5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100"
                />

                {postContent.trim() && (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-md bg-[#103f73] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0b315d]"
                    >
                      <FiSend />
                      Publicar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>

          {posts.length > 0 && (
            <div className="mt-5 space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                      {initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {user?.nombre} {user?.apellido}
                      </p>

                      <p className="text-xs text-slate-500">
                        {post.createdAt}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {post.content}
                  </p>

                  <div className="mt-4 flex gap-5 border-t border-slate-200 pt-3 text-xs text-slate-500">
                    <button
                      type="button"
                      className="transition hover:text-[#103f73]"
                    >
                      Me gusta
                    </button>

                    <button
                      type="button"
                      className="transition hover:text-[#103f73]"
                    >
                      Comentar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mb-3 mt-6 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">
              Empleos recomendados para ti
            </h2>

            <Link
              to="/empleos"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#103f73] hover:underline"
            >
              Ver todos
              <FiArrowRight />
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id);

              return (
                <article
                  key={job.id}
                  className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm transition hover:border-slate-400 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      <FiBriefcase size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
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

                        <button
                          type="button"
                          onClick={() => handleSaveJob(job.id)}
                          className={[
                            "inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium transition",
                            isSaved
                              ? "border-[#103f73] bg-blue-50 text-[#103f73]"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          {isSaved ? (
                            <FiCheckCircle />
                          ) : (
                            <FiBookmark />
                          )}

                          {isSaved ? "Guardado" : "Guardar"}
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <FiMapPin />
                          {job.location}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <FiBriefcase />
                          {job.modality}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <FiClock />
                          {job.published}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-950">
              Próximas entrevistas
            </h2>

            <div className="mt-4 rounded-md border border-slate-300 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">
                Tech Interview - TechCorp
              </p>

              <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <FiClock />
                Mañana, 10:00 AM
              </p>

              <button
                type="button"
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#103f73] text-xs font-semibold text-white transition hover:bg-[#0b315d]"
              >
                <FiVideo />
                Unirse a la llamada
              </button>
            </div>

            <Link
              to="/entrevistas"
              className="mt-4 block text-center text-xs font-semibold text-[#103f73] hover:underline"
            >
              Ver calendario completo
            </Link>
          </section>

          <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-950">
              Tu resumen
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryRow
                icon={FiEye}
                label="Visualizaciones de perfil"
                value="42"
              />

              <SummaryRow
                icon={FiFileText}
                label="Postulaciones activas"
                value="7"
              />

              <SummaryRow
                icon={FiBookmark}
                label="Empleos guardados"
                value={String(12 + savedJobs.length)}
              />

              <SummaryRow
                icon={FiCalendar}
                label="Próximas entrevistas"
                value="1"
              />
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
        <Icon className="shrink-0 text-[#103f73]" size={15} />
        <span>{label}</span>
      </div>

      <span className="text-xs font-semibold text-[#103f73]">
        {value}
      </span>
    </div>
  );
}

export default Dashboard;