import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";

function ForgotPassword() {
  return (
    <section className="flex min-h-[calc(100vh-150px)] items-center justify-center px-5 py-12">
      <div className="w-full max-w-[450px] rounded-lg border border-slate-200 bg-white px-8 py-9 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#103f73]">
            <FiMail size={22} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Recuperar contraseña
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Esta función será conectada al sistema de recuperación de acceso
            posteriormente.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-[#103f73] hover:underline"
          >
            <FiArrowLeft />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;