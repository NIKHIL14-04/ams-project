import * as Yup from "yup";

export const overtimeSchema = Yup.object({
  attendanceId: Yup.string()
    .required("Attendance Id is required"),

  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters"),
});