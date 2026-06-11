import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDailyReport } from "../../services/report.service";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response =
        await getDailyReport();

      setReports(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Daily Report
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Punch In
              </th>

              <th className="p-4 text-left">
                Punch Out
              </th>

              <th className="p-4 text-left">
                Hours
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {reports.length > 0 ? (
              reports.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {item.userId?.name}
                  </td>

                  <td className="p-4">
                    {item.userId?.email}
                  </td>

                  <td className="p-4">
                    {new Date(
                      item.punchInTime
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {item.punchOutTime
                      ? new Date(
                          item.punchOutTime
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    {item.totalHours}
                  </td>

                  <td className="p-4">
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6"
                >
                  No Report Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Reports;