// File: DevicePatchLogs.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Sample device data
const deviceData = [
  {
    id: "Device-001",
    name: "Workstation A",
    ip: "192.168.1.10",
    location: "Floor 1 - Room 101",
    patches: [
      {
        id: "KB5003637",
        name: "Security Update - Chrome",
        status: "Success",
        appliedBy: "Agent-AURA",
        date: "2025-11-20 10:30",
        duration: "5m",
        summary: "Patch applied successfully with no errors.",
        detailedLogs: [
          {
            time: "10:00:01",
            action: "Checking free disk space",
            status: "Success",
          },
          {
            time: "10:00:02",
            action: "Checking pending reboots",
            status: "Success",
          },
          {
            time: "10:00:05",
            action: "Downloading patch KB5003637",
            status: "Success",
          },
          {
            time: "10:00:10",
            action: "Patch package integrity verified via checksum",
            status: "Success",
          },
          {
            time: "10:00:12",
            action: 'Stopping service "AppService"',
            status: "Success",
          },
          {
            time: "10:00:15",
            action: "Applying patch KB5003637",
            status: "Info",
          },
          {
            time: "10:00:20",
            action: "Installing file x.dll",
            status: "Success",
          },
          {
            time: "10:00:22",
            action: "Updating registry entries",
            status: "Success",
          },
          {
            time: "10:00:25",
            action: 'Restarting service "AppService"',
            status: "Success",
          },
          {
            time: "10:00:27",
            action: "Verifying patch installation",
            status: "Success",
          },
        ],
      },
      {
        id: "KB5015807",
        name: "Windows Security Update",
        status: "Failed",
        appliedBy: "Admin",
        date: "2025-11-18 14:45",
        duration: "8m",
        summary:
          "Patch failed due to insufficient permissions. Rollback initiated.",
        detailedLogs: [
          {
            time: "14:00:01",
            action: "Checking free disk space",
            status: "Success",
          },
          {
            time: "14:00:05",
            action: "Downloading patch KB5015807",
            status: "Success",
          },
          {
            time: "14:00:10",
            action: "Applying patch KB5015807",
            status: "Error",
          },
          {
            time: "14:00:15",
            action: "Error: Insufficient permissions",
            status: "Error",
          },
          {
            time: "14:00:20",
            action: "Rollback patch KB5015807",
            status: "Info",
          },
          {
            time: "14:00:25",
            action: "Device state restored to pre-patch snapshot",
            status: "Success",
          },
        ],
      },
    ],
  },
  {
    id: "Device-002",
    name: "Workstation B",
    ip: "192.168.1.11",
    location: "Floor 2 - Room 210",
    patches: [
      {
        id: "KB5020001",
        name: "Cumulative Update",
        status: "Success",
        appliedBy: "Admin",
        date: "2025-11-19 09:00",
        duration: "6m",
        summary: "Patch applied successfully with minor warnings.",
        detailedLogs: [
          {
            time: "09:00:01",
            action: "Downloading patch KB5020001",
            status: "Success",
          },
          {
            time: "09:00:05",
            action: "Applying patch KB5020001",
            status: "Info",
          },
          {
            time: "09:00:10",
            action: "Warning: Minor registry conflict",
            status: "Warning",
          },
          {
            time: "09:00:15",
            action: "Patch applied successfully",
            status: "Success",
          },
        ],
      },
    ],
  },
];

// Status color mapping
const statusColors = {
  Success: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Pending: "bg-blue-100 text-blue-800",
  Info: "bg-gray-100 text-gray-800",
  Warning: "bg-yellow-100 text-yellow-800",
  Error: "bg-red-200 text-red-900",
};

export default function DevicePatchLogs() {
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [expandedPatch, setExpandedPatch] = useState(null);

  const toggleDevice = (id) =>
    setExpandedDevice(expandedDevice === id ? null : id);
  const togglePatch = (id) =>
    setExpandedPatch(expandedPatch === id ? null : id);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Device Patch Logs</h2>

      {/* Device Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Device ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                IP
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deviceData.map((device) => (
              <tr key={device.id}>
                <td className="px-4 py-2 text-sm">{device.id}</td>
                <td className="px-4 py-2 text-sm">{device.name}</td>
                <td className="px-4 py-2 text-sm">{device.ip}</td>
                <td className="px-4 py-2 text-sm">{device.location}</td>
                <td
                  className="px-4 py-2 text-sm cursor-pointer"
                  onClick={() => toggleDevice(device.id)}
                >
                  {expandedDevice === device.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Device Section */}
      {expandedDevice &&
        deviceData
          .filter((device) => device.id === expandedDevice)
          .map((device) => (
            <div key={device.id} className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">
                {device.name} - Patch History
              </h3>

              {device.patches.map((patch) => (
                <div
                  key={patch.id}
                  className="border border-gray-200 rounded-lg bg-gray-50 p-4"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePatch(patch.id)}
                  >
                    <div>
                      <p className="font-semibold">{patch.name}</p>
                      <p className="text-sm text-gray-600">
                        {patch.date} | Applied by: {patch.appliedBy} | Duration:{" "}
                        {patch.duration}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[patch.status]
                      }`}
                    >
                      {patch.status}
                    </span>
                    <span className="ml-4">
                      {expandedPatch === patch.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  </div>

                  {/* Detailed Logs */}
                  {expandedPatch === patch.id && (
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-700">
                        <strong>Summary:</strong> {patch.summary}
                      </p>
                      <div className="mt-2 space-y-1">
                        {patch.detailedLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between px-3 py-1 rounded ${
                              statusColors[log.status]
                            }`}
                          >
                            <span className="font-mono">{log.time}</span>
                            <span>{log.action}</span>
                            <span className="font-semibold">{log.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
    </div>
  );
}
