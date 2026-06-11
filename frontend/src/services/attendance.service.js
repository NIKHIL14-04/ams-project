import api from "../api/axios";

export const getAttendance = async () => {
  const response = await api.get("/attendance/myattendance");

  return response.data;
};
