import * as metricsService from "../services/metricsService.js";

export const getDevicesSummary = async (req, res) => {
  try {
    const windowMinutes = Number(req.query.windowMinutes || 15);
    const rows = await metricsService.getDevicesSummary(windowMinutes);

    // map DB rows to the shape your React UI expects
    const devices = rows.map((r) => {
      let status = "healthy";

      if (r.avg_cpu == null || r.avg_memory == null) {
        status = "unknown";
      } else if (r.avg_cpu > 90 || r.avg_memory > 90) {
        status = "critical";
      } else if (r.avg_cpu > 75 || r.avg_memory > 80) {
        status = "updating";
      }

      return {
        name: r.application,
        status,
        cpu: Number(r.avg_cpu || 0),
        memory: Number(r.avg_memory || 0),
        lastSeen: r.last_seen, // ISO string by default
      };
    });

    res.json({ devices });
  } catch (err) {
    console.error("getDevicesSummary error:", err);
    res.status(500).json({ error: "Failed to fetch devices summary" });
  }
};

export const getLiveMetrics = async (req, res) => {
  try {
    const application = req.query.application;
    if (!application) {
      return res
        .status(400)
        .json({ error: "Missing required query param: application" });
    }

    const windowMinutes = Number(req.query.windowMinutes || 5);
    const rows = await metricsService.getLiveMetrics(
      application,
      windowMinutes
    );

    const points = rows.map((r) => ({
      time: r.time, // React can format this
      cpu: Number(r.cpu_usage || 0),
      memory: Number(r.memory_usage || 0),
      disk: Number(r.disk || 0),
      network: Number(r.network || 0),
    }));

    res.json({ application, points });
  } catch (err) {
    console.error("getLiveMetrics error:", err);
    res.status(500).json({ error: "Failed to fetch live metrics" });
  }
};
