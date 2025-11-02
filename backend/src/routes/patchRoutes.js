import express from "express";
import {
  getWorkflows,
  createWorkflow,
  executeWorkflow,
  deleteWorkflow,
  getManagedApps,
} from "../controllers/patchController.js";

const router = express.Router();

router.get("/workflows", getWorkflows);
router.post("/workflow/create", createWorkflow);
router.post("/workflow/patch/:id", executeWorkflow);
router.delete("/workflow/:id", deleteWorkflow);
router.get("/managed/apps", getManagedApps);

export default router;
