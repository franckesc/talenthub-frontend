import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import ForgotPassword from "./pages/public/ForgotPassword";
import Register from "./pages/public/Register";
import CompaniesComingSoon from "./pages/public/CompaniesComingSoon";

import Dashboard from "./pages/private/Dashboard";
import Jobs from "./pages/private/Jobs";
import JobDetail from "./pages/private/JobDetail";
import Profile from "./pages/private/Profile";
import Applications from "./pages/private/Applications";
import SavedJobs from "./pages/private/SavedJobs";
import Interviews from "./pages/private/Interviews";
import Messages from "./pages/private/Messages";
import Notifications from "./pages/private/Notifications";
import Settings from "./pages/private/Settings";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-password" element={<ForgotPassword />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/empresas" element={<CompaniesComingSoon />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empleos" element={<Jobs />} />
        <Route path="/empleos/:id" element={<JobDetail />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/mis-postulaciones" element={<Applications />} />
        <Route path="/guardados" element={<SavedJobs />} />
        <Route path="/entrevistas" element={<Interviews />} />
        <Route path="/mensajes" element={<Messages />} />
        <Route path="/notificaciones" element={<Notifications />} />
        <Route path="/configuracion" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;