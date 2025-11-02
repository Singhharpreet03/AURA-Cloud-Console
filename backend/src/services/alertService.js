import axios from "axios";

const BASE = () => process.env.AGENT_BASE_URL;

export const getAlerts = async (query) =>
  (await axios.get(`${BASE()}/api/v1/alerts`, { params: query })).data;

export const getAlertById = async (id) =>
  (await axios.get(`${BASE()}/api/v1/alerts/${id}`)).data;

export const acknowledgeAlert = async (id, body) =>
  (await axios.post(`${BASE()}/api/v1/alerts/${id}/acknowledge`, body)).data;

export const deleteAlert = async (id) =>
  (await axios.delete(`${BASE()}/api/v1/alerts/${id}`)).data;

export const getStats = async () =>
  (await axios.get(`${BASE()}/api/v1/alerts/stats`)).data;

export const getApplications = async () =>
  (await axios.get(`${BASE()}/api/v1/applications`)).data;
