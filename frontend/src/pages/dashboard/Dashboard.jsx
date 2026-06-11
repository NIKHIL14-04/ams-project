import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAdminDashboard,
  getEmployeeDashboard,
} from "../../services/dashboard.service";

function Dashboard() {
  const [stats, setStats] = useState({});

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      let response;

      if (
        user.role === "admin" ||
        user.role === "manager"
      ) {
        response =
          await getAdminDashboard();
      } else {
        response =
          await getEmployeeDashboard();
      }

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {user.role === "employee" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Attendance
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.attendanceCount}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Completed Days
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.completedDays}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Pending OT
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.pendingOT}
            </p>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Total Users
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Attendance
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.totalAttendance}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Pending Validation
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.pendingValidation}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">
              Pending OT
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.pendingOT}
            </p>
          </div>

        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;