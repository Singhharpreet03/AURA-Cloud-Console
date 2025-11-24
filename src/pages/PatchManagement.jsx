import React, { useEffect, useState } from "react";
import WorkflowWizard from "../components/WorkflowWizard";
import DeployAllModal from "../components/DeployAllModal";
import DetailedPatchLogs from "../components/DetailedPatchLogs"; // adjust path if needed
import { generateScriptUsingGemini } from "../services/geminiService";
import { testGeminiConnection } from "../services/geminiService";

// import * as patchAPI from "../services/patchService";
import * as patchAPI from "../services/patchservice";
import {
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  RefreshCw,
  Server,
  Activity,
  User,
  X,
  Info,
  Eye,
  Bot,
  Terminal,
  Copy,
  FileText,
  Zap,
} from "lucide-react";

// Toast Notification Component
const Toast = ({ message, type = "info", onClose }) => {
  const bgColors = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  };

  const iconColors = {
    info: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg ${bgColors[type]} animate-slide-in`}
    >
      <div className={iconColors[type]}>{icons[type]}</div>
      <span className="ml-3 text-sm font-medium text-gray-900">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeClasses[size]} rounded-xl shadow-xl transition-all bg-white max-h-[90vh] overflow-y-auto`}
        >
          <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-gray-200 z-10">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Patch Details Content Component
// const PatchDetailsContent = ({ patch, onExecute, generateScript }) => {
//   const [executionMode, setExecutionMode] = useState("agent");
//   const [scriptType, setScriptType] = useState("automated");
//   const scripts = generateScript(patch);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Patch Information */}
//       <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//         <div>
//           <span className="text-sm text-gray-600">Type:</span>
//           <span className="ml-2 font-medium text-gray-900">{patch.type}</span>
//         </div>
//         <div>
//           <span className="text-sm text-gray-600">Severity:</span>
//           <span
//             className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
//               patch.severity === "critical"
//                 ? "bg-red-100 text-red-800"
//                 : patch.severity === "high"
//                 ? "bg-orange-100 text-orange-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {patch.severity}
//           </span>
//         </div>
//         <div>
//           <span className="text-sm text-gray-600">Size:</span>
//           <span className="ml-2 font-medium text-gray-900">{patch.size}</span>
//         </div>
//         <div>
//           <span className="text-sm text-gray-600">Release Date:</span>
//           <span className="ml-2 font-medium text-gray-900">
//             {patch.releaseDate}
//           </span>
//         </div>
//         <div className="col-span-2">
//           <span className="text-sm text-gray-600">Description:</span>
//           <p className="mt-1 text-sm text-gray-900">{patch.description}</p>
//         </div>
//         <div className="col-span-2">
//           <span className="text-sm text-gray-600">Restart Required:</span>
//           <span className="ml-2 font-medium text-gray-900">
//             {patch.requiresRestart ? "Yes" : "No"}
//           </span>
//         </div>
//       </div>

//       {/* Execution Mode Selection */}
//       <div>
//         <h4 className="font-semibold text-gray-900 mb-3">Execution Mode</h4>
//         <div className="grid grid-cols-2 gap-3">
//           <button
//             onClick={() => setExecutionMode("agent")}
//             className={`p-4 border-2 rounded-lg text-left transition-all ${
//               executionMode === "agent"
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-200 hover:border-gray-300"
//             }`}
//           >
//             <div className="flex items-center space-x-3 mb-2">
//               <Bot className="w-5 h-5 text-blue-600" />
//               <span className="font-semibold text-gray-900">
//                 AI Agent (Automated)
//               </span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Let the AI agent handle the entire installation process
//               automatically
//             </p>
//           </button>
//           <button
//             onClick={() => setExecutionMode("manual")}
//             className={`p-4 border-2 rounded-lg text-left transition-all ${
//               executionMode === "manual"
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-200 hover:border-gray-300"
//             }`}
//           >
//             <div className="flex items-center space-x-3 mb-2">
//               <User className="w-5 h-5 text-purple-600" />
//               <span className="font-semibold text-gray-900">
//                 Manual Execution
//               </span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Follow manual steps and execute commands yourself
//             </p>
//           </button>
//         </div>
//       </div>

//       {/* Script Display */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <h4 className="font-semibold text-gray-900">
//             {executionMode === "agent" ? "AI-Generated" : "Manual"} Script
//           </h4>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setScriptType("automated")}
//               className={`px-3 py-1 text-xs rounded ${
//                 scriptType === "automated"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Automated
//             </button>
//             <button
//               onClick={() => setScriptType("manual")}
//               className={`px-3 py-1 text-xs rounded ${
//                 scriptType === "manual"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               Manual
//             </button>
//           </div>
//         </div>

//         <div className="relative">
//           <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono">
//             {scripts[scriptType]}
//           </pre>
//           <button
//             onClick={() => copyToClipboard(scripts[scriptType])}
//             className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
//             title="Copy to clipboard"
//           >
//             <Copy className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* AI Recommendations */}
//       {executionMode === "agent" && (
//         <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-start space-x-3">
//             <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
//             <div>
//               <h5 className="font-semibold text-blue-900 mb-1">
//                 AI Recommendation
//               </h5>
//               <p className="text-sm text-blue-800">
//                 Based on system analysis, this patch can be safely installed
//                 during the next maintenance window. The agent will:
//               </p>
//               <ul className="mt-2 space-y-1 text-sm text-blue-800">
//                 <li>• Create a system restore point</li>
//                 <li>• Download and verify patch integrity</li>
//                 <li>• Install with optimal settings</li>
//                 <li>• Monitor for any issues</li>
//                 {patch.requiresRestart && (
//                   <li>• Schedule restart during off-peak hours</li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//         <button
//           onClick={() => window.history.back()}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => onExecute(patch, executionMode)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
//         >
//           {executionMode === "agent" ? (
//             <>
//               <Bot className="w-4 h-4" />
//               <span>Execute with AI Agent</span>
//             </>
//           ) : (
//             <>
//               <Terminal className="w-4 h-4" />
//               <span>Prepare Manual Execution</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };
const PatchDetailsContent = ({ patch, onExecute, generateScript }) => {
  const [loading, setLoading] = useState(true);
  const [scripts, setScripts] = useState({
    automated: "",
    manual: "",
  });

  const [executionMode, setExecutionMode] = useState("agent");
  const [scriptType, setScriptType] = useState("automated");

  // useEffect(() => {
  //   const loadScripts = async () => {
  //     setLoading(true);
  //     const result = await generateScript(patch); // <-- Gemini async call
  //     setScripts(result);
  //     setLoading(false);
  //   };
  //   loadScripts();
  // }, [patch]);
  useEffect(() => {
    const loadScripts = async () => {
      setLoading(true);
      try {
        console.log("Calling Gemini API for patch:", patch.id);
        const result = await generateScriptUsingGemini(patch);
        console.log("Received scripts from Gemini:", result);
        setScripts(result);
      } catch (error) {
        console.error("Failed to generate scripts:", error);
        // Set fallback scripts
        setScripts({
          automated: "# Error generating automated script",
          manual: "# Error generating manual script",
        });
      } finally {
        setLoading(false);
      }
    };
    loadScripts();
  }, [patch]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Patch Information */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <span className="text-sm text-gray-600">Type:</span>
          <span className="ml-2 font-medium text-gray-900">{patch.type}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Severity:</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
              patch.severity === "critical"
                ? "bg-red-100 text-red-800"
                : patch.severity === "high"
                ? "bg-orange-100 text-orange-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {patch.severity}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Size:</span>
          <span className="ml-2 font-medium text-gray-900">{patch.size}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Release Date:</span>
          <span className="ml-2 font-medium text-gray-900">
            {patch.releaseDate}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-sm text-gray-600">Description:</span>
          <p className="mt-1 text-sm text-gray-900">{patch.description}</p>
        </div>
        <div className="col-span-2">
          <span className="text-sm text-gray-600">Restart Required:</span>
          <span className="ml-2 font-medium text-gray-900">
            {patch.requiresRestart ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {/* Execution Mode */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Execution Mode</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setExecutionMode("agent")}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              executionMode === "agent"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                AI Agent (Automated)
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Let the AI agent handle the installation automatically.
            </p>
          </button>

          <button
            onClick={() => setExecutionMode("manual")}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              executionMode === "manual"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <User className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">
                Manual Execution
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Follow manual steps and execute commands yourself.
            </p>
          </button>
        </div>
      </div>

      {/* Script Display */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">
            {executionMode === "agent" ? "AI-Generated" : "Manual"} Script
          </h4>

          <div className="flex space-x-2">
            <button
              onClick={() => setScriptType("automated")}
              className={`px-3 py-1 text-xs rounded ${
                scriptType === "automated"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Automated
            </button>

            <button
              onClick={() => setScriptType("manual")}
              className={`px-3 py-1 text-xs rounded ${
                scriptType === "manual"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Manual
            </button>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <div className="p-4 bg-gray-900 text-yellow-300 rounded-lg text-sm font-mono">
              Generating script using AI...
            </div>
          ) : (
            <>
              <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono">
                {scripts[scriptType]}
              </pre>

              <button
                onClick={() => copyToClipboard(scripts[scriptType])}
                className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* AI Recommendations */}
      {executionMode === "agent" && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">
                AI Recommendation
              </h5>

              <p className="text-sm text-blue-800">
                Based on system analysis, this patch is safe for automated
                installation. The agent will:
              </p>

              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• Create a system restore point</li>
                <li>• Download and verify patch integrity</li>
                <li>• Install with optimal settings</li>
                <li>• Monitor for any issues</li>
                {patch.requiresRestart && (
                  <li>• Schedule restart during off-peak hours</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={() => onExecute(patch, executionMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
        >
          {executionMode === "agent" ? (
            <>
              <Bot className="w-4 h-4" />
              <span>Execute with AI Agent</span>
            </>
          ) : (
            <>
              <Terminal className="w-4 h-4" />
              <span>Prepare Manual Execution</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const PatchManagement = () => {
  const [selectedDevice, setSelectedDevice] = useState("WS-Marketing-01");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [showPatchDetailsModal, setShowPatchDetailsModal] = useState(false);
  const [showCreateWorkflowModal, setShowCreateWorkflowModal] = useState(false);
  const [selectedPatch, setSelectedPatch] = useState(null);
  const [toast, setToast] = useState(null);
  const [deployAllOpen, setDeployAllOpen] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState("All Devices");
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [logsDevice, setLogsDevice] = useState(null);
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [rollbackDevice, setRollbackDevice] = useState(null);
  const [rollbackFromVersion, setRollbackFromVersion] = useState(null);
  const [rollbackToVersion, setRollbackToVersion] = useState(null);
  // Pause Modal States
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [devicesToPause, setDevicesToPause] = useState([]);
  // Resume Modal States
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [devicesToResume, setDevicesToResume] = useState([]);

  // Keep devices as mock (per your confirmation)
  const [devices, setDevices] = useState([
    {
      id: "WS-Marketing-01",
      name: "Marketing Workstation 01",
      status: "healthy",
      patches: 12,
      lastUpdate: "2024-01-15 14:30",
      os: "Windows 11",
      progress: 100,
    },
    {
      id: "SRV-Database-01",
      name: "Database Server 01",
      status: "updating",
      patches: 8,
      lastUpdate: "2024-01-15 15:45",
      os: "Ubuntu 22.04",
      progress: 65,
    },
    {
      id: "WS-Dev-01",
      name: "Development Workstation",
      status: "critical",
      patches: 15,
      lastUpdate: "2024-01-14 09:22",
      os: "Windows 11",
      progress: 0,
    },
  ]);

  // workflows & availablePatches will now come from backend
  const [availablePatches, setAvailablePatches] = useState([
    {
      id: "KB5034441",
      name: "Security Update for Windows 11",
      type: "Security",
      severity: "critical",
      size: "450 MB",
      releaseDate: "2024-01-12",
      description: "Critical security update addressing CVE-2024-0001",
      requiresRestart: true,
      status: "available",
    },
    {
      id: "UPD-2024-001",
      name: "MySQL Server 8.0.35 Update",
      type: "Upgrade",
      severity: "high",
      size: "125 MB",
      releaseDate: "2024-01-10",
      description:
        "Upgrade to MySQL Server 8.0.35 with performance improvements",
      requiresRestart: true,
      status: "available",
    },
    {
      id: "INST-DOCKER-01",
      name: "Docker Desktop Installation",
      type: "Installation",
      severity: "medium",
      size: "580 MB",
      releaseDate: "2024-01-08",
      description: "Install Docker Desktop for containerization support",
      requiresRestart: false,
      status: "available",
    },
  ]);
  const [workflows, setWorkflows] = useState([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);

  // -- toasts
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Load workflows and managed apps on mount
  useEffect(() => {
    const load = async () => {
      setLoadingApps(true);

      try {
        const appsRes = await patchAPI.getManagedApps();
        const appsObj = appsRes?.apps || {};
        const appsArr = Object.entries(appsObj).map(([key, value]) => ({
          id: key,
          name: key,
          description: value ?? "",
          type: "Managed App",
          severity: "medium",
          size: "-",
          releaseDate: "-",
          requiresRestart: false,
          status: "available",
          version: value,
        }));

        // Merge mock patches with fetched apps
        setAvailablePatches([...mockPatches, ...appsArr]);
      } catch (err) {
        console.error("getManagedApps", err);
      } finally {
        setLoadingApps(false);
      }
    };

    load();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing device data...", "info");

    // still mock: update timestamps only
    setTimeout(() => {
      setDevices((prevDevices) =>
        prevDevices.map((d) => ({
          ...d,
          lastUpdate: new Date().toLocaleString(), // just update timestamp
        }))
      );
      setIsRefreshing(false);
      showToast("Device data refreshed successfully", "success");
    }, 1000);
  };

  const handleConfigure = () => {
    setShowConfigModal(true);
  };

  const handleTestGemini = async () => {
    showToast("Testing Gemini connection...", "info");

    const result = await testGeminiConnection();

    if (result.success) {
      showToast("Gemini connected successfully!", "success");
      console.log("✅ Gemini response:", result.message);
    } else {
      showToast(`Gemini connection failed: ${result.error}`, "error");
      console.error("❌ Gemini error:", result.error);
    }
  };

  const handlePauseUpdates = () => {
    const updatingDevices = devices.filter((d) => d.status === "updating");

    if (updatingDevices.length === 0) {
      showToast("No devices are currently updating", "info");
      return;
    }

    setDevicesToPause(updatingDevices);
    setShowPauseModal(true);
  };
  const confirmResumeUpdates = () => {
    setDevices((prev) =>
      prev.map((device) =>
        device.status === "paused"
          ? { ...device, status: "updating", lastAction: "Resumed by user" }
          : device
      )
    );

    setShowResumeModal(false);
    showToast("Updates resumed for selected devices", "success");
  };

  const handleResumeUpdates = () => {
    const pausedDevices = devices.filter((d) => d.status === "paused");

    if (pausedDevices.length === 0) {
      showToast("No paused devices to resume", "info");
      return;
    }

    setDevicesToResume(pausedDevices);
    setShowResumeModal(true);
  };

  const confirmPauseUpdates = () => {
    setDevices((prev) =>
      prev.map((device) =>
        device.status === "updating"
          ? { ...device, status: "paused", lastAction: "Paused by user" }
          : device
      )
    );

    setShowPauseModal(false);
    showToast("Updates paused for selected devices", "warning");
  };

  const handleViewLogs = (device) => {
    setLogsDevice(device); // set which device logs to show
    setShowLogsModal(true); // open the modal
  };

  const handleRollback = () => {
    // Find devices that are updating or paused
    const updatingDevices = devices.filter(
      (d) => d.status === "updating" || d.status === "paused"
    );

    if (updatingDevices.length === 0) {
      showToast("No active updates to rollback", "info");
      return;
    }

    // For simplicity, pick the first one or extend to multiple later
    const deviceToRollback = updatingDevices[0];

    // Set modal state
    setRollbackDevice(deviceToRollback);
    setRollbackFromVersion("v1.2.0"); // example: get from device patch info
    setRollbackToVersion("v1.1.9"); // example: rollback target
    setShowRollbackModal(true);
  };

  const handleViewPatchDetails = (patch) => {
    setSelectedPatch(patch);
    setShowPatchDetailsModal(true);
  };

  const handleCreateWorkflow = () => {
    setShowCreateWorkflowModal(true);
  };

  const handleViewWorkflows = () => {
    setShowWorkflowModal(true);
  };

  //   const generateAIScript = (patch) => {
  //     // keep existing script generator (simple lookup)
  //     const scripts = {
  //       KB5034441: {
  //         automated: `# AI-Recommended Automated Script
  // wusa.exe /quiet /norestart KB5034441.msu
  // if ($LASTEXITCODE -eq 0) {
  //   Write-Host "Patch installed successfully"
  //   # Schedule restart during maintenance window
  //   shutdown /r /t 7200 /c "Security update requires restart"
  // } else {
  //   Write-Error "Patch installation failed"
  // }`,
  //         manual: `# Manual Installation Steps
  // 1. Download KB5034441.msu from Windows Update Catalog
  // 2. Double-click the .msu file
  // 3. Follow the Windows Update Standalone Installer
  // 4. Restart when prompted

  // # Or use Command Prompt:
  // wusa.exe KB5034441.msu`,
  //       },
  //       "UPD-2024-001": {
  //         automated: `# AI-Recommended Automated Upgrade Script
  // # Backup current database
  // mysqldump --all-databases > backup_$(date +%Y%m%d).sql

  // # Stop MySQL service
  // systemctl stop mysql

  // # Upgrade MySQL packages
  // apt-get update && apt-get install mysql-server=8.0.35

  // # Start MySQL service
  // systemctl start mysql

  // # Verify upgrade
  // mysql --version`,
  //         manual: `# Manual Upgrade Steps
  // 1. Backup your databases:
  //    mysqldump --all-databases > backup.sql

  // 2. Stop MySQL service:
  //    sudo systemctl stop mysql

  // 3. Update packages:
  //    sudo apt-get update
  //    sudo apt-get install mysql-server

  // 4. Start MySQL:
  //    sudo systemctl start mysql

  // 5. Verify:
  //    mysql --version`,
  //       },
  //       "INST-DOCKER-01": {
  //         automated: `# AI-Recommended Automated Installation
  // # Download Docker Desktop
  // $url = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
  // $output = "$env:TEMP\\DockerDesktopInstaller.exe"
  // Invoke-WebRequest -Uri $url -OutFile $output

  // # Install silently
  // Start-Process -FilePath $output -Args "install --quiet" -Wait

  // # Verify installation
  // docker --version`,
  //         manual: `# Manual Installation Steps
  // 1. Download Docker Desktop from:
  //    https://www.docker.com/products/docker-desktop

  // 2. Run the installer:
  //    - Double-click Docker Desktop Installer.exe
  //    - Follow installation wizard
  //    - Enable WSL 2 integration if prompted

  // 3. Start Docker Desktop

  // 4. Verify installation:
  //    docker --version`,
  //       },
  //     };

  //     return (
  //       scripts[patch.id] || {
  //         automated: "# No automated script available",
  //         manual: "# No manual steps available",
  //       }
  //     );
  //   };
  const generateAIScript = async (patch) => {
    return await generateScriptUsingGemini(patch);
  };

  const handleExecutePatch = (patch, mode) => {
    setShowPatchDetailsModal(false);

    if (mode === "agent") {
      showToast(`AI Agent executing patch ${patch.id}...`, "info");

      setTimeout(() => {
        showToast(`Running pre-installation checks...`, "info");
      }, 1000);

      setTimeout(() => {
        showToast(`Downloading patch files (${patch.size})...`, "info");
      }, 2000);

      setTimeout(() => {
        showToast(`Installing ${patch.name}...`, "info");
      }, 4000);

      setTimeout(() => {
        showToast(`Patch ${patch.id} installed successfully!`, "success");
        setAvailablePatches((prev) =>
          prev.map((p) =>
            p.id === patch.id ? { ...p, status: "installed" } : p
          )
        );
      }, 6000);
    } else {
      showToast(`Manual execution mode selected for ${patch.id}`, "info");
      showToast("Follow the manual steps displayed in the script", "info");
    }
  };

  // --- WORKFLOW CRUD -> backend integration
  const handleSaveWorkflow = async (workflowData) => {
    try {
      const payload = {
        instructions: workflowData.generatedScript || workflowData.instructions,
        script_type: "bash",
        encrypted: true,
      };

      // Backend returns only id
      const saved = await patchAPI.createWorkflow(payload);

      const created = {
        id:
          saved?.workflow_id ||
          `WF-${String(workflows.length + 1).padStart(3, "0")}`,
        name: workflowData.name,
        type: workflowData.type,
        patches: workflowData.patches,
        devices: workflowData.devices,
        schedule: workflowData.schedule,
        lastRun: "Never",
        status: "active",
        scriptType: payload.script_type,
        script: payload.instructions,
        executionMode: workflowData.executionMode,
      };

      setWorkflows((prev) => [...prev, created]);
      setShowCreateWorkflowModal(false);
      showToast("Workflow created successfully", "success");
    } catch (err) {
      if (err.response) {
        console.error("createWorkflow API error:", err.response.data);
        showToast(
          `Failed to create workflow: ${
            err.response.data.message || err.response.statusText
          }`,
          "error"
        );
      } else if (err.request) {
        console.error("Network error:", err);
        showToast("Network error: Cannot reach server", "error");
      } else {
        console.error("Unexpected error:", err);
        showToast("Unexpected error occurred", "error");
      }
    }
  };
  //will check tomorrow
  // const handleSaveWorkflow = async (workflowData) => {
  //   try {
  //     const payload = {
  //       instructions: workflowData.generatedScript || workflowData.instructions,
  //       script_type: "bash",
  //       encrypted: true,
  //     };

  //     // 1️⃣ Create workflow on backend
  //     const saved = await patchAPI.createWorkflow(payload);

  //     // 2️⃣ Get workflow ID returned from backend
  //     const workflowId = saved?.workflow_id;
  //     if (!workflowId) {
  //       showToast("Workflow created but no ID returned from backend", "warning");
  //     }

  //     // 3️⃣ Build workflow object for state/UI
  //     const created = {
  //       id: workflowId || `WF-${String(workflows.length + 1).padStart(3, "0")}`, // fallback only for UI
  //       name: workflowData.name,
  //       type: workflowData.type,
  //       patches: workflowData.patches,
  //       devices: workflowData.devices,
  //       schedule: workflowData.schedule,
  //       lastRun: "Never",
  //       status: "active",
  //       scriptType: payload.script_type,
  //       script: payload.instructions,
  //       executionMode: workflowData.executionMode,
  //     };

  //     // 4️⃣ Update workflow state
  //     setWorkflows((prev) => [...prev, created]);
  //     setShowCreateWorkflowModal(false);
  //     showToast("Workflow created successfully", "success");

  //     // 5️⃣ Auto-run workflow if selected and ID exists
  //     if (workflowData.executionMode === "auto" && workflowId) {
  //       await handleRunWorkflow(workflowId);

  //       // Optional: update lastRun/status immediately in UI
  //       setWorkflows((prev) =>
  //         prev.map((wf) =>
  //           wf.id === workflowId
  //             ? { ...wf, lastRun: new Date().toLocaleString(), status: "running" }
  //             : wf
  //         )
  //       );
  //       showToast("Workflow execution started automatically", "success");
  //     }

  //     return created; // optional, useful if you need it elsewhere

  //   } catch (err) {
  //     console.error("Error in handleSaveWorkflow:", err);

  //     if (err.response) {
  //       showToast(
  //         `Failed to create workflow: ${err.response.data.message || err.response.statusText}`,
  //         "error"
  //       );
  //     } else if (err.request) {
  //       showToast("Network error: Cannot reach server", "error");
  //     } else {
  //       showToast("Unexpected error occurred", "error");
  //     }
  //   }
  // };

const handleRunWorkflow = async (workflowId) => {
    try {
      showToast("Workflow execution started...", "info");

      await patchAPI.executeWorkflow(workflowId);

      // Update the workflow's lastRun timestamp in state
      setWorkflows((prev) =>
        prev.map((wf) =>
          wf.id === workflowId
            ? {
                ...wf,
                lastRun: new Date().toLocaleString(),
                status: "completed",
              }
            : wf
        )
      );
            // Show success toast after execution
      setTimeout(() => {
        showToast("Workflow executed successfully!", "success");
      }, 1500);
    } catch (err) {
      console.error("executeWorkflow error", err);
      showToast("Failed to run workflow", "error");

      // Update status to error on failure
      setWorkflows((prev) =>
        prev.map((wf) =>
          wf.id === workflowId ? { ...wf, status: "error" } : wf
        )
      );
    }
  };
  const handleDeleteWorkflow = async (workflowId) => {
    try {
      await patchAPI.deleteWorkflow(workflowId);
      setWorkflows((prev) => prev.filter((w) => w.id !== workflowId));
      showToast("Workflow deleted", "success");
    } catch (err) {
      console.error("deleteWorkflow error", err);
      showToast("Failed to delete workflow", "error");
    }
  };

  const handleExportReport = () => {
    const csvContent = [
      ["AURA Patch Management Report"],
      ["Generated:", new Date().toLocaleString()],
      [""],
      ["Device Name", "Status", "OS", "Patches Available", "Last Update"],
      ...devices.map((d) => [d.name, d.status, d.os, d.patches, d.lastUpdate]),
      [""],
      ["Summary"],
      ["Total Devices", devices.length],
      ["Healthy", devices.filter((d) => d.status === "healthy").length],
      ["Updating", devices.filter((d) => d.status === "updating").length],
      ["Critical", devices.filter((d) => d.status === "critical").length],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patch-management-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Report exported successfully", "success");
  };

  const activityLog = [
    {
      id: 1,
      action: "Patch deployment completed",
      device: "WS-Marketing-01",
      timestamp: "2024-01-15 14:30:15",
      status: "success",
      user: "System",
    },
    {
      id: 2,
      action: "Security update in progress",
      device: "SRV-Database-01",
      timestamp: "2024-01-15 15:45:22",
      status: "in-progress",
      user: "Admin",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "updating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "paused":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "rolling-back":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />;
      case "updating":
        return <Clock className="w-4 h-4" />;
      case "paused":
        return <Pause className="w-4 h-4" />;
      case "rolling-back":
        return <RotateCcw className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const healthyCount = devices.filter((d) => d.status === "healthy").length;
  const updatingCount = devices.filter((d) => d.status === "updating").length;
  const criticalCount = devices.filter((d) => d.status === "critical").length;

  const filteredDevices =
    deviceFilter === "All Devices"
      ? devices
      : devices.filter((d) => {
          if (deviceFilter === "Healthy") return d.status === "healthy";
          if (deviceFilter === "Updating") return d.status === "updating";
          if (deviceFilter === "Critical") return d.status === "critical";
          return true;
        });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#123458" }}>
                Patch Management
              </h1>
              <p className="mt-2 text-gray-600">
                Automated patch deployment and system updates
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 inline mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>

              <button
                onClick={handleViewWorkflows}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Workflows
              </button>
              <button
                onClick={handleConfigure}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Devices
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {devices.length}
                </p>
              </div>
              <Server className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Up to Date</p>
                <p className="text-2xl font-bold text-green-600">
                  {healthyCount}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Updating</p>
                <p className="text-2xl font-bold text-blue-600">
                  {updatingCount}
                </p>
              </div>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Needs Attention
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {criticalCount}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Management */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Device Management
                </h3>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm border border-gray-300"
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                  >
                    <option>All Devices</option>
                    <option>Healthy</option>
                    <option>Updating</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedDevice === device.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(
                            device.status
                          )}`}
                        >
                          {getStatusIcon(device.status)}
                          <span>{device.status}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {device.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{device.os}</span>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Patches Available:
                        </span>
                        <span className="text-gray-900">{device.patches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Update:</span>
                        <span className="text-gray-900">
                          {device.lastUpdate}
                        </span>
                      </div>
                    </div>

                    {(device.status === "updating" ||
                      device.status === "rolling-back") && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-900">
                            {device.status === "rolling-back"
                              ? "Rolling Back"
                              : "Progress"}
                          </span>
                          <span className="text-gray-900">
                            {device.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              device.status === "rolling-back"
                                ? "bg-purple-600"
                                : "bg-blue-600"
                            }`}
                            style={{ width: `${device.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Patches */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Available Patches
              </h3>
              <button
                onClick={() => handleViewLogs(devices[0])} // example: show logs for first device
                className="text-m font-semibold px-5 py-1 bg-gray-100 rounded hover:bg-gray-200 "
              >
                Show Logs
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {loadingApps && (
                <div className="p-4 text-sm text-gray-500">
                  Loading patches...
                </div>
              )}

              {!loadingApps && availablePatches.length === 0 && (
                <div className="p-4 text-sm text-gray-500">
                  No managed apps found.
                </div>
              )}

              {availablePatches.map((patch) => (
                <div
                  key={patch.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {patch.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              patch.severity === "critical"
                                ? "bg-red-100 text-red-800"
                                : patch.severity === "high"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {patch.severity}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {patch.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 mb-1">
                          {patch.name}{" "}
                          {patch.version ? `(${patch.version})` : ""}
                        </p>
                        <p className="text-xs text-gray-600">
                          {patch.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>Size: {patch.size}</span>
                        <span>Released: {patch.releaseDate}</span>
                        <span>
                          Restart: {patch.requiresRestart ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPatchDetails(patch)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details & Execute</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => setDeployAllOpen(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
                >
                  <Play className="w-4 h-4" />
                  <span>Deploy All</span>
                </button>
                <button
                  onClick={handlePauseUpdates}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Updates</span>
                </button>
                <button
                  onClick={handleResumeUpdates}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Play className="w-4 h-4" />
                  <span>Resume Updates</span>
                </button>

                <button
                  onClick={handleRollback}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rollback</span>
                </button>
                <button
                  onClick={handleExportReport}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors hover:bg-gray-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Patch Management Configuration"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Auto-deployment Schedule
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>Daily at 2:00 AM</option>
              <option>Weekly on Sunday</option>
              <option>Manual only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Rollback Policy
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-900">
                  Auto-rollback on failure
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-900">
                  Create restore point before update
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowConfigModal(false);
                showToast("Configuration saved successfully", "success");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Deploy Confirmation Modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Review Deployment Summary"
        size="lg"
      >
        <div className="space-y-6 text-gray-900">
          {/* Section 1: Devices Summary */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">
              Devices Summary
            </h3>
            <ul className="text-sm space-y-1">
              <li>Total Devices: {devices.length}</li>
              <li>
                Devices with Pending Patches:{" "}
                {devices.filter((d) => d.patches > 0).length}
              </li>
              <li>
                Devices Requiring Reboot:{" "}
                {devices.filter((d) => d.requiresReboot).length}
              </li>
              <li>
                Offline Devices (Will Retry Automatically):{" "}
                {devices.filter((d) => !d.online).length}
              </li>
            </ul>
          </div>

          {/* Section 2: Patch Summary */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Patch Summary</h3>
            <ul className="text-sm space-y-1">
              <li>
                Total Patches to Deploy:{" "}
                {devices.reduce((count, d) => count + d.patches, 0)}
              </li>
              <li>
                Critical Patches:{" "}
                {devices.reduce(
                  (count, d) => count + d.criticalPatches || 0,
                  0
                )}
              </li>
              <li>Estimated Deployment Time: ~3–7 minutes</li>
            </ul>
          </div>

          {/* Section 3: Deployment Strategy */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">
              Deployment Strategy
            </h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="strategy" defaultChecked />
                Immediate Deployment
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="strategy" />
                Schedule for later (coming soon)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="strategy" />
                Staggered Rollout (batches)
              </label>
            </div>
          </div>

          {/* Section 4: Warning */}
          <div className="bg-yellow-50 p-3 rounded-lg text-sm border border-yellow-200">
            <strong>Warning:</strong> Deployment may cause temporary service
            interruptions. Restore points will be created automatically where
            supported.
          </div>

          {/* Section 5: Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowDeployModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setShowDeployModal(false);
                showToast("Deploying patches to all devices...", "info");
                setTimeout(() => {
                  showToast(
                    "Patch deployment initiated successfully",
                    "success"
                  );
                }, 1500);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Deploy All
            </button>
          </div>
        </div>
      </Modal>

      {/* Workflows Modal */}
      <Modal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
        title="Patch Workflows"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Manage your patch deployment workflows
            </p>
            <button
              onClick={handleCreateWorkflow}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Play className="w-4 h-4 inline mr-1" />
              Create Workflow
            </button>
          </div>

          <div className="space-y-3">
            {loadingWorkflows && (
              <div className="p-4 text-sm text-gray-500">
                Loading workflows...
              </div>
            )}

            {!loadingWorkflows && workflows.length === 0 && (
              <div className="p-4 text-sm text-gray-500">
                No workflows found.
              </div>
            )}

            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {workflow.name}
                      </h4>
                      <p className="text-xs text-gray-500">{workflow.id}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflow.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 text-gray-900">{workflow.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Patches:</span>
                    <span className="ml-2 text-gray-900">
                      {workflow.patches}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Devices:</span>
                    <span className="ml-2 text-gray-900">
                      {workflow.devices}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Schedule:</span>
                    <span className="ml-2 text-gray-900">
                      {workflow.schedule}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Last run: {workflow.lastRun}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      // future: edit
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRunWorkflow(workflow.id)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Run Now
                    </button>
                    <button
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Create Workflow Modal */}
      {showCreateWorkflowModal && (
        <WorkflowWizard
          isOpen={showCreateWorkflowModal}
          onClose={() => setShowCreateWorkflowModal(false)}
          onComplete={handleSaveWorkflow}
        />
      )}

      {/* Patch Details Modal */}
      {selectedPatch && (
        <Modal
          isOpen={showPatchDetailsModal}
          onClose={() => setShowPatchDetailsModal(false)}
          title={`Patch Details: ${selectedPatch.id}`}
          size="2xl"
        >
          <PatchDetailsContent
            patch={selectedPatch}
            onExecute={handleExecutePatch}
            generateScript={generateAIScript}
          />
        </Modal>
      )}

      {/* Deploy all modal */}
      <DeployAllModal
        isOpen={deployAllOpen}
        onClose={() => setDeployAllOpen(false)}
        devices={devices} // your devices array from API (mock currently)
        showToast={showToast} // whatever toast method you use
      />

      {/* Logs Modal */}
      {logsDevice && (
        <Modal
          isOpen={showLogsModal}
          onClose={() => setShowLogsModal(false)}
          title={`Patch Logs: ${logsDevice.name}`}
          size="2xl"
        >
          <DetailedPatchLogs device={logsDevice} />
        </Modal>
      )}

      {/* Rollback Confirmation Modal */}
      {rollbackDevice && (
        <Modal
          isOpen={showRollbackModal}
          onClose={() => {
            setRollbackDevice(null);
            setShowRollbackModal(false);
          }}
          title={`Confirm Rollback: ${rollbackDevice.name}`}
          size="md"
        >
          <div className="space-y-4">
            <p>
              You are about to rollback <strong>{rollbackDevice.name}</strong>{" "}
              from <strong>{rollbackFromVersion}</strong> to{" "}
              <strong>{rollbackToVersion}</strong>.
            </p>
            <p className="text-sm text-gray-600">
              Are you sure you want to proceed?
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  setRollbackDevice(null);
                  setShowRollbackModal(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // reuse your confirmRollback logic
                  setDevices((prev) =>
                    prev.map((d) =>
                      d.id === rollbackDevice.id
                        ? { ...d, status: "rolling-back", progress: 0 }
                        : d
                    )
                  );
                  showToast(`Rolling back ${rollbackDevice.name}...`, "info");
                  setShowRollbackModal(false);

                  setTimeout(() => {
                    setDevices((prev) =>
                      prev.map((d) =>
                        d.id === rollbackDevice.id
                          ? { ...d, status: "healthy", progress: 100 }
                          : d
                      )
                    );
                    showToast("Rollback completed successfully", "success");
                    setRollbackDevice(null);
                  }, 2000);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Confirm Rollback
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* pause updates, resume updates modals (kept same) */}
      {showPauseModal && (
        <Modal
          isOpen={showPauseModal}
          onClose={() => setShowPauseModal(false)}
          title="Confirm Pause Updates"
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              You are about to pause updates for the following devices. Pausing
              will stop the workflow at its current step. Updates can be resumed
              later.
            </p>

            <div className="bg-gray-100 rounded-lg p-3 max-h-60 overflow-y-auto">
              {devicesToPause.map((device) => (
                <div
                  key={device.id}
                  className="p-3 border-b last:border-none border-gray-300"
                >
                  <p className="font-semibold text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-600">IP: {device.ip}</p>
                  <p className="text-sm text-gray-600">
                    Location: {device.location}
                  </p>

                  {/* Progress section wrapped correctly */}
                  {device.currentStep && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">
                        Current Step: {device.currentStep}
                        {device.stepCount && (
                          <span>
                            {" "}
                            ({device.currentStepNumber} / {device.stepCount})
                          </span>
                        )}
                      </p>

                      <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all"
                          style={{
                            width: device.stepCount
                              ? `${
                                  (device.currentStepNumber /
                                    device.stepCount) *
                                  100
                                }%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-red-600 text-sm">
              Pausing at certain steps may leave the device in an intermediate
              state until resumed.
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                onClick={() => setShowPauseModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
                onClick={confirmPauseUpdates}
              >
                Pause Updates
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showResumeModal && (
        <Modal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          title="Confirm Resume Updates"
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              You are about to resume updates for the following devices. Updates
              will continue from where they were paused.
            </p>

            <div className="bg-gray-100 rounded-lg p-3 max-h-60 overflow-y-auto">
              {devicesToResume.map((device) => (
                <div
                  key={device.id}
                  className="p-3 border-b last:border-none border-gray-300"
                >
                  <p className="font-semibold text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-600">IP: {device.ip}</p>
                  <p className="text-sm text-gray-600">
                    Location: {device.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Current Version: {device.currentVersion}
                  </p>
                  <p className="text-sm text-gray-600">
                    Target Version: {device.targetVersion}
                  </p>

                  {device.currentStep && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">
                        Current Step: {device.currentStep}{" "}
                        {device.stepCount && (
                          <span>
                            ({device.currentStepNumber}/{device.stepCount})
                          </span>
                        )}
                      </p>

                      <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{
                            width: device.stepCount
                              ? `${
                                  (device.currentStepNumber /
                                    device.stepCount) *
                                  100
                                }%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                onClick={() => setShowResumeModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                onClick={confirmResumeUpdates}
              >
                Resume Updates
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
export default PatchManagement;
