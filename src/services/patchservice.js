// src/services/patchService.js (frontend)
import axios from "axios";
const BASE = () => import.meta.env.VITE_AGENT_BASE_URL;
export const getWorkflows = async () =>
  (await axios.get(`${BASE()}/api/v1/workflows/`)).data;
export const createWorkflow = async (body) =>
  (await axios.post(`${BASE()}/api/v1/workflow/create`, body)).data;
export const executeWorkflow = async (id) =>
  (await axios.post(`${BASE()}/api/v1/workflow/patch/${id}`)).data;
export const deleteWorkflow = async (id) =>
  (await axios.delete(`${BASE()}/api/v1/workflow/${id}`)).data;
export const getManagedApps = async () =>
  (await axios.get(`${BASE()}/api/v1/managed/apps`)).data;
