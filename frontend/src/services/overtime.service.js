import api from "../api/axios";

export const getPendingOvertime = async () => {
  const response = await api.get("/overtime/pending");
  return response.data;
};

export const approveOvertime = async (id, status) => {
  const response = await api.put(
    `/overtime/approve/${id}`,
    { status }
  );

  return response.data;
};

export const requestOvertime = async (data) => {
  const response = await api.post(
    "/overtime/request",
    data
  );

  return response.data;
};