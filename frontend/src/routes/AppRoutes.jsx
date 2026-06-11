import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Attendance from "../pages/attendance/Attendance";
import Overtime from "../pages/overtime/Overtime";
import PendingOT from "../pages/admin/PendingOT";
import Reports from "../pages/admin/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overtime"
          element={
            <ProtectedRoute>
              <Overtime />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pending-overtime"
          element={
            <ProtectedRoute>
              <PendingOT />
            </ProtectedRoute>
          }
        />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
