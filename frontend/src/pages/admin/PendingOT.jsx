import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getPendingOvertime,
  approveOvertime,
} from "../../services/overtime.service";

function PendingOT() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);

      const response =
        await getPendingOvertime();

      setRequests(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    id,
    status
  ) => {
    try {
      await approveOvertime(
        id,
        status
      );

      alert(
        `Request ${status} successfully`
      );

      fetchPendingRequests();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message
      );
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Pending Overtime Requests
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
                Reason
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  Loading...
                </td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((item) => (
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
                    {item.reason}
                  </td>

                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        handleAction(
                          item._id,
                          "approved"
                        )
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleAction(
                          item._id,
                          "rejected"
                        )
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Reject
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  No Pending Requests
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>
    </DashboardLayout>
  );
}

export default PendingOT;