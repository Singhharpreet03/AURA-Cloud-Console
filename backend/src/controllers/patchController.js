import * as patchService from "../services/patchService.js";

export const getWorkflows = async (req, res) => {
  try {
    res.json(await patchService.getWorkflows());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createWorkflow = async (req, res) => {
  try {
    res.json(await patchService.createWorkflow(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const executeWorkflow = async (req, res) => {
  try {
    res.json(await patchService.executeWorkflow(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWorkflow = async (req, res) => {
  try {
    res.json(await patchService.deleteWorkflow(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getManagedApps = async (req, res) => {
  try {
    res.json(await patchService.getManagedApps());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
