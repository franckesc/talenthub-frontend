import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

const initialForm = {
  correo: "",
  password: "",
  recordar: false,
};

function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.correo.trim()) {
      newErrors.correo = "Ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo electrónico válido.";
    }

    if (!form.password) {
      newErrors.password = "Ingresa tu contraseña.";
    } else if (form.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("");
      return;
    }

    console.log("Datos de inicio de sesión:", form);

    setMessage(
      "Formulario validado correctamente. Falta conectarlo con la API de TalentHub.",
    );
  };

  return (
    <section className="flex min-h-[calc(100vh-150px)] items-center justify-center px-5 py-12">
      <div className="w-full max-w-[450px] rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-lg sm:px-9">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Bienvenido de nuevo
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Inicia sesión para continuar en TalentHub
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="correo"
              className="mb-1.5 block text-sm font-medium text-slate-900"
            >
              Correo electrónico
            </label>

            <div className="relative">
              <FiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                id="correo"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="nombre@ejemplo.com"
                autoComplete="email"
                className={[
                  "h-11 w-full rounded-md border bg-[#f8fafc] pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400",
                  errors.correo
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-[#103f73] focus:ring-2 focus:ring-blue-100",
                ].join(" ")}
              />
            </div>

            {errors.correo && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <FiAlertCircle />
                {errors.correo}
              </p>
            )}
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-900"
              >
                Contraseña
              </label>

              <Link
                to="/recuperar-password"
                className="text-xs font-semibold text-[#103f73] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="relative">
              <FiLock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className={[
                  "h-11 w-full rounded-md border bg-[#f8fafc] pl-10 pr-11 text-sm outline-none transition",
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-[#103f73] focus:ring-2 focus:ring-blue-100",
                ].join(" ")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#103f73]"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <FiAlertCircle />
                {errors.password}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              name="recordar"
              type="checkbox"
              checked={form.recordar}
              onChange={handleChange}
              className="h-4 w-4 rounded accent-[#103f73]"
            />

            Mantener mi sesión iniciada
          </label>

          {message && (
            <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <FiCheckCircle className="mt-0.5 shrink-0" />
              <p>{message}</p>
            </div>
          )}

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-[#103f73] text-sm font-semibold text-white transition hover:bg-[#0b315d] focus:outline-none focus:ring-2 focus:ring-[#103f73] focus:ring-offset-2"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs text-slate-400">
            ¿No tienes una cuenta?
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <Link
          to="/registro"
          className="flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-semibold text-[#103f73] transition hover:bg-slate-50"
        >
          Crear una cuenta
        </Link>
      </div>
    </section>
  );
}

export default Login;