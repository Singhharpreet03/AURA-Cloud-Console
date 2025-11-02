import axios from "axios";

const BASE = () => process.env.AGENT_BASE_URL;

export const getStatus = async () =>
  (await axios.get(`${BASE()}/api/status`)).data;

export const startPipeline = async () =>
  (await axios.post(`${BASE()}/api/pipeline/start`)).data;

export const stopPipeline = async () =>
  (await axios.post(`${BASE()}/api/pipeline/stop`)).data;

export const listFiles = async () =>
  (await axios.get(`${BASE()}/api/files`)).data;

export const getFileStatus = async (path) =>
  (await axios.get(`${BASE()}/api/files/${path}/status`)).data;

export const checkFile = async (path) =>
  (await axios.post(`${BASE()}/api/files/${path}/check`)).data;

export const rebuildBaseline = async () =>
  (await axios.post(`${BASE()}/api/baseline/rebuild`)).data;

export const listBackups = async () =>
  (await axios.get(`${BASE()}/api/backups`)).data;

export const createBackup = async () =>
  (await axios.post(`${BASE()}/api/backups`)).data;

export const restoreLatestBackup = async () =>
  (await axios.post(`${BASE()}/api/backups/latest/restore`)).data;

export const getAlertHistory = async (limit = 50) =>
  (await axios.get(`${BASE()}/api/alerts?limit=${limit}`)).data;
