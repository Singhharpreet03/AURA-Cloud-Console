import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
/**
 * Returns avg CPU/memory per application in a time window.
 */
export const getDevicesSummary = async (windowMinutes = 15) => {
  const { rows } = await pool.query(
    `
    SELECT
      application,
      AVG(cpu_usage)         AS avg_cpu,
      AVG(memory_usage)     AS avg_memory,
      MAX(time)             AS last_seen
    FROM metrics
    WHERE time >= NOW() - $1::interval
    GROUP BY application
    ORDER BY application
    `,
    [`${windowMinutes} minutes`]
  );

  return rows;
};

/**
 * Returns time-series metrics for one application in a time window.
 */
export const getLiveMetrics = async (application, windowMinutes = 5) => {
  const { rows } = await pool.query(
    `
    SELECT
      time,
      cpu_usage,
      memory_usage,
      COALESCE(disk_read_iops + disk_write_iops, 0)                         AS disk,
      COALESCE(network_packets_sent_per_sec + network_packets_recv_per_sec, 0) AS network
    FROM metrics
    WHERE application = $1
      AND time >= NOW() - $2::interval
    ORDER BY time
    `,
    [application, `${windowMinutes} minutes`]
  );

  return rows;
};
