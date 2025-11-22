import express from "express";
import {
  getDevicesSummary,
  getLiveMetrics,
} from "../controllers/metricsController.js";

const router = express.Router();

// GET /api/metrics/devices?windowMinutes=15
router.get("/devices", getDevicesSummary);

// GET /api/metrics/live?application=web_server&windowMinutes=5
router.get("/live", getLiveMetrics);

export default router;
