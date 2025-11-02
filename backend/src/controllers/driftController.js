import * as driftService from "../services/driftService.js";

export const getStatus = async (req, res) => {
  try {
    const data = await driftService.getStatus();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const startPipeline = async (req, res) => {
  try {
    const data = await driftService.startPipeline();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const stopPipeline = async (req, res) => {
  try {
    const data = await driftService.stopPipeline();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listFiles = async (req, res) => {
  try {
    const data = await driftService.listFiles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFileStatus = async (req, res) => {
  try {
    const data = await driftService.getFileStatus(req.params.path);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkFile = async (req, res) => {
  try {
    const data = await driftService.checkFile(req.params.path);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rebuildBaseline = async (req, res) => {
  try {
    const data = await driftService.rebuildBaseline();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listBackups = async (req, res) => {
  try {
    const data = await driftService.listBackups();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBackup = async (req, res) => {
  try {
    const data = await driftService.createBackup();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restoreLatestBackup = async (req, res) => {
  try {
    const data = await driftService.restoreLatestBackup();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlertHistory = async (req, res) => {
  try {
    const data = await driftService.getAlertHistory(req.query.limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
