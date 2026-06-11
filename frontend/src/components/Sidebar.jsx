import { NavLink } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        AMS
      </h2>

      <div className="flex flex-col gap-3">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/attendance">
          Attendance
        </NavLink>

        {/* Employee Links */}

        {user?.role === "employee" && (
          <NavLink to="/overtime">
            Overtime Request
          </NavLink>
        )}

        {/* Admin / Manager Links */}

        {(user?.role === "admin" ||
          user?.role === "manager") && (
          <>
            <NavLink to="/pending-overtime">
              Pending OT
            </NavLink>

            <NavLink to="/reports">
              Reports
            </NavLink>
          </>
        )}

      </div>
    </div>
  );
}

export default Sidebar;