import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAttendance } from "../../services/attendance.service";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const response = await getAttendance();

      console.log(response);

      setAttendance(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Attendance History
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Punch In
              </th>

              <th className="p-4 text-left">
                Punch Out
              </th>

              <th className="p-4 text-left">
                Total Hours
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6"
                >
                  Loading...
                </td>
              </tr>
            ) : attendance.length > 0 ? (
              attendance.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {item.punchIn || "-"}
                  </td>

                  <td className="p-4">
                    {item.punchOut || "-"}
                  </td>

                  <td className="p-4">
                    {item.totalHours || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6"
                >
                  No Attendance Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Attendance;