import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiAlertCircle,
  FiBriefcase,
  FiEye,
  FiEyeOff,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const initialForm = {
  nombre: "",
  apellido: "",
  correo: "",
  password: "",
  ciudad: "",
  tipoCuenta: "candidato",
};

function Register() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "Ingresa tu nombre.";
    }

    if (!form.apellido.trim()) {
      newErrors.apellido = "Ingresa tu apellido.";
    }

    if (!form.correo.trim()) {
      newErrors.correo = "Ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo válido.";
    }

    if (!form.password) {
      newErrors.password = "Crea una contraseña.";
    } else if (form.password.length < 8) {
      newErrors.password = "Debe tener al menos 8 caracteres.";
    }

    if (!form.ciudad.trim()) {
      newErrors.ciudad = "Ingresa tu ciudad de residencia.";
    }

    if (
      form.tipoCuenta !== "candidato" &&
      form.tipoCuenta !== "reclutador"
    ) {
      newErrors.tipoCuenta = "Selecciona un tipo de cuenta válido.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError("");
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const response = await api.post("/auth/register", {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: form.correo.trim().toLowerCase(),
        password: form.password,
        ciudad: form.ciudad.trim(),
        tipoCuenta: form.tipoCuenta,
      });

      saveSession(
        response.data.token,
        response.data.usuario,
        true,
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Error al crear la cuenta:", error);

      setServerError(
        error.response?.data?.mensaje ||
          "No fue posible crear la cuenta. Inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-150px)] items-center justify-center px-5 py-10">
      <div className="w-full max-w-[510px] rounded-lg border border-slate-200 bg-white px-6 py-7 shadow-lg sm:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Crea tu cuenta
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Únete a la plataforma profesional líder en la industria
          </p>
        </div>

        <form
          className="mt-7 space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Nombre"
              name="nombre"
              value={form.nombre}
              error={errors.nombre}
              onChange={handleChange}
              autoComplete="given-name"
              disabled={loading}
            />

            <FormField
              label="Apellido"
              name="apellido"
              value={form.apellido}
              error={errors.apellido}
              onChange={handleChange}
              autoComplete="family-name"
              disabled={loading}
            />
          </div>

          <FormField
            label="Correo electrónico"
            name="correo"
            type="email"
            value={form.correo}
            error={errors.correo}
            onChange={handleChange}
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
            disabled={loading}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-900"
              >
                Contraseña
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={loading}
                  className={[
                    "h-10 w-full rounded-md border bg-[#f8fafc] px-3 pr-10 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60",
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#103f73] focus:ring-2 focus:ring-blue-100",
                  ].join(" ")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#103f73] disabled:cursor-not-allowed"
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <FormField
              label="Ciudad de residencia"
              name="ciudad"
              value={form.ciudad}
              error={errors.ciudad}
              onChange={handleChange}
              placeholder="Ej. Managua"
              autoComplete="address-level2"
              disabled={loading}
            />
          </div>

          <fieldset disabled={loading}>
            <legend className="mb-2 text-sm font-medium text-slate-900">
              Tipo de cuenta
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              <AccountTypeOption
                id="candidato"
                name="tipoCuenta"
                value="candidato"
                checked={form.tipoCuenta === "candidato"}
                onChange={handleChange}
                icon={FiUser}
                title="Candidato"
                description="Buscar empleos y oportunidades"
              />

              <AccountTypeOption
                id="reclutador"
                name="tipoCuenta"
                value="reclutador"
                checked={form.tipoCuenta === "reclutador"}
                onChange={handleChange}
                icon={FiBriefcase}
                title="Empresa / Reclutador"
                description="Publicar vacantes y contratar"
              />
            </div>

            {errors.tipoCuenta && (
              <p className="mt-1 text-xs text-red-600">
                {errors.tipoCuenta}
              </p>
            )}
          </fieldset>

          {serverError && (
            <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <FiAlertCircle className="mt-0.5 shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-md bg-[#103f73] text-sm font-semibold text-white transition hover:bg-[#0b315d] focus:outline-none focus:ring-2 focus:ring-[#103f73] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
  ¿Ya tienes una cuenta?{" "}
  <Link
    to="/login"
    className="font-semibold text-[#103f73] hover:underline"
  >
    Inicia sesión
  </Link>
</p>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  placeholder = "",
  autoComplete,
  disabled = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-900"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={[
          "h-10 w-full rounded-md border bg-[#f8fafc] px-3 text-sm outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-[#103f73] focus:ring-2 focus:ring-blue-100",
        ].join(" ")}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function AccountTypeOption({
  id,
  name,
  value,
  checked,
  onChange,
  icon: Icon,
  title,
  description,
}) {
  return (
    <label
      htmlFor={id}
      className={[
        "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition",
        checked
          ? "border-[#103f73] bg-blue-50"
          : "border-slate-300 bg-white hover:border-slate-400",
      ].join(" ")}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-[#103f73]"
      />

      <Icon
        className="mt-0.5 shrink-0 text-[#103f73]"
        size={18}
      />

      <span>
        <span className="block text-sm font-semibold text-slate-900">
          {title}
        </span>

        <span className="mt-1 block text-xs leading-4 text-slate-500">
          {description}
        </span>
      </span>
    </label>
  );
}

export default Register;