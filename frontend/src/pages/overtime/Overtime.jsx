import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAttendance } from "../../services/attendance.service";
import { overtimeSchema } from "../../validation/overtime.validation";
import { requestOvertime } from "../../services/overtime.service";

function Overtime() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await getAttendance();

      console.log(response);

      setAttendanceList(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (
    values,
    { resetForm }
  ) => {
    try {
      const response = await requestOvertime(values);

      console.log(response);

      alert("Request Submitted Successfully");

      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Overtime Request
      </h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <Formik
          initialValues={{
            attendanceId: "",
            reason: "",
          }}
          validationSchema={overtimeSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">
                Attendance
              </label>
{/* 
              <Field
                as="select"
                name="attendanceId"
                className="w-full border p-3 rounded"
              >
                <option value="">
                  Select Attendance
                </option>

                {attendanceList.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </option>
                ))}
              </Field> */}

              <Field
  as="select"
  name="attendanceId"
  className="w-full border p-3 rounded"
>
  <option value="">
    Select Attendance
  </option>

  {attendanceList.map((item) => (
    <option
      key={item._id}
      value={item._id}
    >
      {new Date(item.punchInTime).toLocaleDateString()}
      {" - "}
      {item.status}
    </option>
  ))}
</Field>

              <ErrorMessage
                name="attendanceId"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Reason
              </label>

              <Field
                as="textarea"
                name="reason"
                rows="4"
                placeholder="Enter overtime reason"
                className="w-full border p-3 rounded"
              />

              <ErrorMessage
                name="reason"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              Submit Request
            </button>
          </Form>
        </Formik>
      </div>
    </DashboardLayout>
  );
}

export default Overtime;