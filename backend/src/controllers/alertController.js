import * as alertService from "../services/alertService.js";

export const getAlerts = async (req, res) => {
  try {
    const data = await alertService.getAlerts(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlertById = async (req, res) => {
  try {
    res.json(await alertService.getAlertById(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const acknowledgeAlert = async (req, res) => {
  try {
    res.json(await alertService.acknowledgeAlert(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAlert = async (req, res) => {
  try {
    res.json(await alertService.deleteAlert(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    res.json(await alertService.getStats());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    res.json(await alertService.getApplications());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
