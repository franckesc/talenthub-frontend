import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Profile() {
  const { user: sessionUser } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditNotice, setShowEditNotice] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/me");

      setProfileData(response.data);
    } catch (requestError) {
      console.error("Error al cargar el perfil:", requestError);

      setError(
        requestError.response?.data?.mensaje ||
          "No fue posible cargar la información del perfil.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const usuario = profileData?.usuario ?? sessionUser ?? {};
  const experiencias = profileData?.experiencias ?? [];
  const educacion = profileData?.educacion ?? [];
  const habilidades = profileData?.habilidades ?? [];
  const idiomas = profileData?.idiomas ?? [];
  const publicaciones = profileData?.publicaciones ?? [];

  const nombreCompleto =
    `${usuario.nombre ?? ""} ${usuario.apellido ?? ""}`.trim() ||
    "Usuario TalentHub";

  const iniciales = useMemo(() => {
    const primeraInicial = usuario.nombre?.[0] ?? "";
    const segundaInicial = usuario.apellido?.[0] ?? "";

    return `${primeraInicial}${segundaInicial}`.toUpperCase() || "TH";
  }, [usuario.nombre, usuario.apellido]);

  const tituloProfesional =
    usuario.titulo_profesional ||
    (usuario.rol === "reclutador"
      ? "Empresa / Reclutador"
      : "Profesional TalentHub");

  const ubicacion =
    [usuario.ciudad, usuario.pais].filter(Boolean).join(", ") ||
    "Ubicación no especificada";

  const porcentajePerfil = useMemo(
    () =>
      calculateProfileCompletion({
        usuario,
        experiencias,
        educacion,
        habilidades,
        idiomas,
      }),
    [usuario, experiencias, educacion, habilidades, idiomas],
  );

  if (loading) {
    return <ProfileLoading />;
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <FiAlertCircle size={24} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-950">
          No pudimos cargar el perfil
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {error}
        </p>

        <button
          type="button"
          onClick={loadProfile}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
        >
          <FiRefreshCw />
          Intentar nuevamente
        </button>
      </section>
    );
  }

  return (
    <section className="pb-10">
      {showEditNotice && (
        <div className="mb-4 flex items-start justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <div className="flex items-start gap-2">
            <FiCheckCircle className="mt-0.5 shrink-0" />

            <p>
              El perfil ya obtiene información real desde SQL Server. La
              edición persistente se conectará en el siguiente endpoint de la
              API.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowEditNotice(false)}
            className="shrink-0 font-semibold"
          >
            ×
          </button>
        </div>
      )}

      <article className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <div className="relative h-44 bg-[#103f73]">
          {usuario.portada_url && (
            <img
              src={usuario.portada_url}
              alt=""
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative px-5 pb-6 sm:px-7">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div className="-mt-16 shrink-0">
        {usuario.foto_perfil_url ? (
          <img
            src={usuario.foto_perfil_url}
            alt={nombreCompleto}
            className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-md"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-500 text-3xl font-bold text-white shadow-md">
            {iniciales}
          </div>
        )}
      </div>

      <div className="pb-1 sm:pt-4">
        <h1 className="text-2xl font-bold text-slate-950">
          {nombreCompleto}
        </h1>

        <p className="mt-1 text-sm font-medium text-slate-600">
          {tituloProfesional}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin />
            {ubicacion}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <FiBriefcase />
            {formatExperience(usuario.experiencia_anios)}
          </span>

          {usuario.disponibilidad && (
            <span className="inline-flex items-center gap-1.5 text-green-700">
              <FiCheckCircle />
              {usuario.disponibilidad}
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 pb-1">
      {usuario.cv_url ? (
        <a
          href={usuario.cv_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FiDownload />
          Descargar CV
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400"
        >
          <FiDownload />
          CV no disponible
        </button>
      )}

      <button
        type="button"
        onClick={() => setShowEditNotice(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md bg-[#103f73] px-5 text-sm font-semibold text-white transition hover:bg-[#0b315d]"
      >
        <FiEdit3 />
        Editar perfil
      </button>
    </div>
  </div>
</div>
      </article>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-5">
          <ProfileSection
            icon={FiUser}
            title="Acerca de mí"
          >
            {usuario.acerca_de ? (
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {usuario.acerca_de}
              </p>
            ) : (
              <EmptySection
                title="Añade una presentación profesional"
                description="Describe tu experiencia, tus principales fortalezas y el tipo de oportunidad que estás buscando."
              />
            )}
          </ProfileSection>

          <ProfileSection
            icon={FiBriefcase}
            title="Experiencia profesional"
            actionLabel="Añadir experiencia"
            onAction={() => setShowEditNotice(true)}
          >
            {experiencias.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {experiencias.map((experiencia, index) => (
                  <ExperienceItem
                    key={
                      experiencia.id_experiencia ??
                      experiencia.id ??
                      index
                    }
                    experience={experiencia}
                  />
                ))}
              </div>
            ) : (
              <EmptySection
                title="Aún no tienes experiencias registradas"
                description="Agrega tus empleos, prácticas profesionales o proyectos relevantes."
              />
            )}
          </ProfileSection>

          <ProfileSection
            icon={FiBookOpen}
            title="Educación"
            actionLabel="Añadir educación"
            onAction={() => setShowEditNotice(true)}
          >
            {educacion.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {educacion.map((item, index) => (
                  <EducationItem
                    key={item.id_educacion ?? item.id ?? index}
                    education={item}
                  />
                ))}
              </div>
            ) : (
              <EmptySection
                title="No hay estudios registrados"
                description="Añade tu carrera, cursos, certificaciones o formación complementaria."
              />
            )}
          </ProfileSection>

          <ProfileSection
            icon={FiFileText}
            title="Publicaciones"
          >
            {publicaciones.length > 0 ? (
              <div className="space-y-4">
                {publicaciones.slice(0, 5).map((publicacion, index) => (
                  <PublicationItem
                    key={
                      publicacion.id_publicacion ??
                      publicacion.id ??
                      index
                    }
                    publication={publicacion}
                  />
                ))}
              </div>
            ) : (
              <EmptySection
                title="Todavía no has publicado contenido"
                description="Comparte actualizaciones, proyectos o aprendizajes desde la pantalla de inicio."
              />
            )}
          </ProfileSection>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-950">
                  Perfil completado
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Mejora tu visibilidad profesional.
                </p>
              </div>

              <CompletionCircle percentage={porcentajePerfil} />
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#103f73] transition-all"
                style={{
                  width: `${porcentajePerfil}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Completa tu presentación, experiencia, educación, habilidades e
              idiomas para fortalecer tu perfil.
            </p>
          </section>

          <ProfileSection
            icon={FiCode}
            title="Habilidades"
            compact
          >
            {habilidades.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {habilidades.map((habilidad, index) => {
                  const nombre =
                    habilidad.nombre_habilidad ||
                    habilidad.nombre ||
                    habilidad.habilidad ||
                    "Habilidad";

                  return (
                    <span
                      key={habilidad.id_habilidad ?? index}
                      className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-[#103f73]"
                    >
                      {nombre}
                    </span>
                  );
                })}
              </div>
            ) : (
              <EmptyMini text="No hay habilidades registradas." />
            )}
          </ProfileSection>

          <ProfileSection
            icon={FiGlobe}
            title="Idiomas"
            compact
          >
            {idiomas.length > 0 ? (
              <div className="space-y-3">
                {idiomas.map((idioma, index) => (
                  <LanguageItem
                    key={idioma.id_idioma ?? index}
                    language={idioma}
                  />
                ))}
              </div>
            ) : (
              <EmptyMini text="No hay idiomas registrados." />
            )}
          </ProfileSection>

          <ProfileSection
            icon={FiActivity}
            title="Información de contacto"
            compact
          >
            <div className="space-y-3 text-xs text-slate-600">
              <ContactItem
                icon={FiMail}
                label={usuario.email || "Correo no especificado"}
              />

              <ContactItem
                icon={FiPhone}
                label={usuario.telefono || "Teléfono no especificado"}
              />

              <ContactItem
                icon={FiMapPin}
                label={ubicacion}
              />
            </div>
          </ProfileSection>

          <ProfessionalLinks usuario={usuario} />

          <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-950">
              Información de la cuenta
            </h2>

            <div className="mt-4 space-y-4">
              <InfoRow
                label="Tipo de cuenta"
                value={formatRole(usuario.rol)}
              />

              <InfoRow
                label="Estado"
                value={usuario.estado || "Activo"}
              />

              <InfoRow
                label="Miembro desde"
                value={formatDate(usuario.fecha_registro)}
              />
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function ProfileSection({
  icon: Icon,
  title,
  actionLabel,
  onAction,
  compact = false,
  children,
}) {
  return (
    <section
      className={[
        "rounded-lg border border-slate-300 bg-white shadow-sm",
        compact ? "p-5" : "p-5 sm:p-6",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-950">
          <Icon className="text-[#103f73]" />
          {title}
        </h2>

        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-semibold text-[#103f73] hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function ExperienceItem({ experience }) {
  const cargo =
    experience.cargo ||
    experience.puesto ||
    experience.titulo_puesto ||
    experience.titulo ||
    "Experiencia profesional";

  const empresa =
    experience.empresa ||
    experience.nombre_empresa ||
    "Empresa no especificada";

  const fechaInicio =
    experience.fecha_inicio ||
    experience.inicio;

  const fechaFin =
    experience.actualmente ||
    experience.es_actual
      ? "Actualidad"
      : formatDate(experience.fecha_fin || experience.fin);

  return (
    <article className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#103f73]">
        <FiBriefcase size={20} />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-950">
          {cargo}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-700">
          {empresa}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <FiCalendar />
            {formatDate(fechaInicio)} – {fechaFin}
          </span>

          {experience.ubicacion && (
            <span className="inline-flex items-center gap-1">
              <FiMapPin />
              {experience.ubicacion}
            </span>
          )}
        </div>

        {experience.descripcion && (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {experience.descripcion}
          </p>
        )}
      </div>
    </article>
  );
}

function EducationItem({ education }) {
  const titulo =
    education.titulo ||
    education.titulo_obtenido ||
    education.grado ||
    "Formación académica";

  const institucion =
    education.institucion ||
    education.nombre_institucion ||
    "Institución no especificada";

  const campo =
    education.campo_estudio ||
    education.area_estudio;

  return (
    <article className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#103f73]">
        <FiBookOpen size={20} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          {titulo}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-700">
          {institucion}
        </p>

        {campo && (
          <p className="mt-1 text-xs text-slate-500">
            {campo}
          </p>
        )}

        <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
          <FiCalendar />
          {formatDate(education.fecha_inicio)} –{" "}
          {education.actualmente
            ? "Actualidad"
            : formatDate(education.fecha_fin)}
        </p>

        {education.descripcion && (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {education.descripcion}
          </p>
        )}
      </div>
    </article>
  );
}

function PublicationItem({ publication }) {
  const contenido =
    publication.contenido ||
    publication.texto ||
    publication.descripcion ||
    "Publicación de TalentHub";

  return (
    <article className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
        {contenido}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <FiCalendar />
          {formatDate(
            publication.fecha_publicacion ||
              publication.fecha_creacion,
          )}
        </span>

        <span>
          {publication.total_reacciones ?? 0} reacciones
        </span>

        <span>
          {publication.total_comentarios ?? 0} comentarios
        </span>
      </div>
    </article>
  );
}

function LanguageItem({ language }) {
  const nombre =
    language.idioma ||
    language.nombre_idioma ||
    language.nombre ||
    "Idioma";

  const nivel =
    language.nivel ||
    language.nivel_dominio ||
    "Nivel no especificado";

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium text-slate-700">
        {nombre}
      </span>

      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
        {nivel}
      </span>
    </div>
  );
}

function ProfessionalLinks({ usuario }) {
  const links = [
    {
      label: "LinkedIn",
      value: usuario.linkedin_url,
      icon: FiLinkedin,
    },
    {
      label: "GitHub",
      value: usuario.github_url,
      icon: FiGithub,
    },
    {
      label: "Portafolio",
      value: usuario.portafolio_url,
      icon: FiGlobe,
    },
  ].filter((link) => Boolean(link.value));

  if (links.length === 0) {
    return (
      <ProfileSection
        icon={FiExternalLink}
        title="Enlaces profesionales"
        compact
      >
        <EmptyMini text="No hay enlaces profesionales registrados." />
      </ProfileSection>
    );
  }

  return (
    <ProfileSection
      icon={FiExternalLink}
      title="Enlaces profesionales"
      compact
    >
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.label}
              href={normalizeUrl(link.value)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#103f73] hover:text-[#103f73]"
            >
              <span className="flex items-center gap-2">
                <Icon />
                {link.label}
              </span>

              <FiExternalLink />
            </a>
          );
        })}
      </div>
    </ProfileSection>
  );
}

function CompletionCircle({ percentage }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#103f73 ${
          percentage * 3.6
        }deg, #e2e8f0 0deg)`,
      }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-bold text-[#103f73]">
        {percentage}%
      </div>
    </div>
  );
}

function EmptySection({ title, description }) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
      <FiAward className="mx-auto text-slate-400" size={23} />

      <h3 className="mt-3 text-sm font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function EmptyMini({ text }) {
  return (
    <p className="rounded-md bg-slate-50 px-3 py-3 text-xs text-slate-500">
      {text}
    </p>
  );
}

function ContactItem({ icon: Icon, label }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 shrink-0 text-[#103f73]" />
      <span className="break-all">{label}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-right text-xs font-semibold capitalize text-slate-800">
        {value}
      </span>
    </div>
  );
}

function ProfileLoading() {
  return (
    <section className="animate-pulse space-y-5">
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="h-44 bg-slate-300" />

        <div className="px-7 pb-7">
          <div className="-mt-14 h-28 w-28 rounded-full border-4 border-white bg-slate-300" />

          <div className="mt-4 h-6 w-52 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-36 rounded bg-slate-200" />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="h-72 rounded-lg bg-slate-200" />
        <div className="h-72 rounded-lg bg-slate-200" />
      </div>
    </section>
  );
}

function calculateProfileCompletion({
  usuario,
  experiencias,
  educacion,
  habilidades,
  idiomas,
}) {
  const checks = [
    Boolean(usuario.nombre),
    Boolean(usuario.apellido),
    Boolean(usuario.email),
    Boolean(usuario.ciudad),
    Boolean(usuario.titulo_profesional),
    Boolean(usuario.acerca_de),
    Boolean(usuario.telefono),
    Boolean(usuario.cv_url),
    experiencias.length > 0,
    educacion.length > 0,
    habilidades.length > 0,
    idiomas.length > 0,
  ];

  const completados = checks.filter(Boolean).length;

  return Math.round((completados / checks.length) * 100);
}

function formatExperience(years) {
  const numericYears = Number(years);

  if (!Number.isFinite(numericYears) || numericYears <= 0) {
    return "Experiencia no especificada";
  }

  return numericYears === 1
    ? "1 año de experiencia"
    : `${numericYears} años de experiencia`;
}

function formatRole(role) {
  const roles = {
    candidato: "Candidato",
    reclutador: "Reclutador",
    empresa: "Empresa",
    admin: "Administrador",
  };

  return roles[role] || role || "Usuario";
}

function formatDate(value) {
  if (!value) {
    return "No especificada";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("es-NI", {
    year: "numeric",
    month: "short",
  }).format(date);
}

function normalizeUrl(value) {
  if (!value) {
    return "#";
  }

  return /^https?:\/\//i.test(value)
    ? value
    : `https://${value}`;
}

export default Profile;