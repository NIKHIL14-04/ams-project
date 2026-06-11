import api from "../api/axios";

export const getDailyReport = async () => {
  const response = await api.get(
    "/reports/daily"
  );

  return response.data;
};