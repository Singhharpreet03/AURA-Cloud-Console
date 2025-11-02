import express from "express";
import {
  getStatus,
  startPipeline,
  stopPipeline,
  listFiles,
  getFileStatus,
  checkFile,
  rebuildBaseline,
  listBackups,
  createBackup,
  restoreLatestBackup,
  getAlertHistory,
} from "../controllers/driftController.js";

const router = express.Router();

router.get("/status", getStatus);
router.post("/pipeline/start", startPipeline);
router.post("/pipeline/stop", stopPipeline);
router.get("/files", listFiles);
router.get("/files/:path/status", getFileStatus);
router.post("/files/:path/check", checkFile);
router.post("/baseline/rebuild", rebuildBaseline);
router.get("/backups", listBackups);
router.post("/backups", createBackup);
router.post("/backups/latest/restore", restoreLatestBackup);
router.get("/alerts", getAlertHistory);

export default router;
