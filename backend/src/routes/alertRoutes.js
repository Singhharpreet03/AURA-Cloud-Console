import express from "express";
import {
  getAlerts,
  getAlertById,
  acknowledgeAlert,
  deleteAlert,
  getStats,
  getApplications,
} from "../controllers/alertController.js";

const router = express.Router();

router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.post("/:id/acknowledge", acknowledgeAlert);
router.delete("/:id", deleteAlert);
router.get("/stats", getStats);
router.get("/applications", getApplications);

export default router;
