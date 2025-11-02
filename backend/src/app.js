import express from "express";
import cors from "cors";

import driftRoutes from "./routes/driftRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import patchRoutes from "./routes/patchRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "test route works" });
});

app.use("/api/drifts", driftRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/patches", patchRoutes);

export default app;
