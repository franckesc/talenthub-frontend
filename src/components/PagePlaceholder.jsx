function PagePlaceholder({ title, description }) {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
          TalentHub
        </p>

        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}

export default PagePlaceholder;