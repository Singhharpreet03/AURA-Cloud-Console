// import React, { useState } from "react";
// import Modal from "../components/Modal";
// import { useToast } from "../components/Toast";
// import {
//   GitBranch,
//   GitCommitVertical as GitCommit,
//   GitMerge,
//   Shield,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   RotateCcw,
//   Bot,
//   User,
//   ArrowRight,
//   Circle,
//   RefreshCw,
//   Settings,
//   HardDrive,
//   FileText,
//   Eye,
// } from "lucide-react";

// const DriftManagement = () => {
//   const { showToast, ToastContainer } = useToast();
//   const [selectedEvent, setSelectedEvent] = useState("DFT-001");
//   const [showConfigModal, setShowConfigModal] = useState(false);
//   const [showRestoreModal, setShowRestoreModal] = useState(false);
//   const [showExportModal, setShowExportModal] = useState(false);
//   const [showMergeModal, setShowMergeModal] = useState(false);
//   const [showBranchModal, setShowBranchModal] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exportFormat, setExportFormat] = useState("json");
//   const [mergeOptions, setMergeOptions] = useState({
//     targetBranch: "main",
//     createBackup: true,
//     autoResolveConflicts: false,
//   });
//   const [branchOptions, setBranchOptions] = useState({
//     branchName: "",
//     description: "",
//     baseBranch: "main",
//   });
//   const [configSettings, setConfigSettings] = useState({
//     sensitivity: "high",
//     autoRestoreConfig: true,
//     autoRestoreBinary: false,
//     createBackup: true,
//   });

//   const [driftFlowData, setDriftFlowData] = useState([
//     {
//       id: "DFT-001",
//       device: "WS-Marketing-01",
//       application: "Adobe Photoshop",
//       type: "Configuration Drift",
//       severity: "high",
//       timestamp: "2024-01-15 14:32:15",
//       description: "Config file modified: preferences.xml",
//       originalVersion: "v24.1.0-stable",
//       driftedVersion: "v24.1.0-modified",
//       restoredVersion: "v24.1.0-stable",
//       aiAction: "Auto-restored from backup",
//       status: "resolved",
//       trigger: "automatic",
//       flowSteps: [
//         {
//           type: "original",
//           version: "v24.1.0-stable",
//           timestamp: "14:30:00",
//           status: "stable",
//         },
//         {
//           type: "drift",
//           version: "v24.1.0-modified",
//           timestamp: "14:32:15",
//           status: "detected",
//         },
//         {
//           type: "restore",
//           version: "v24.1.0-stable",
//           timestamp: "14:32:45",
//           status: "resolved",
//         },
//       ],
//     },
//     {
//       id: "DFT-002",
//       device: "SRV-Database-01",
//       application: "MySQL Server",
//       type: "File Deletion",
//       severity: "critical",
//       timestamp: "2024-01-15 13:45:22",
//       description: "Critical file deleted: my.cnf",
//       originalVersion: "v8.0.35-original",
//       driftedVersion: "missing",
//       restoredVersion: null,
//       aiAction: "Pending manual review",
//       status: "pending",
//       trigger: "manual",
//       flowSteps: [
//         {
//           type: "original",
//           version: "v8.0.35-original",
//           timestamp: "13:40:00",
//           status: "stable",
//         },
//         {
//           type: "drift",
//           version: "missing",
//           timestamp: "13:45:22",
//           status: "critical",
//         },
//         {
//           type: "pending",
//           version: "awaiting action",
//           timestamp: "13:45:30",
//           status: "pending",
//         },
//       ],
//     },
//     {
//       id: "DFT-003",
//       device: "WS-Finance-03",
//       application: "QuickBooks",
//       type: "Binary Modification",
//       severity: "medium",
//       timestamp: "2024-01-15 12:18:07",
//       description: "Executable checksum mismatch",
//       originalVersion: "v2023.2.1-original",
//       driftedVersion: "v2023.2.1-modified",
//       restoredVersion: "v2023.2.1-original",
//       aiAction: "Quarantined and restored",
//       status: "resolved",
//       trigger: "automatic",
//       flowSteps: [
//         {
//           type: "original",
//           version: "v2023.2.1-original",
//           timestamp: "12:15:00",
//           status: "stable",
//         },
//         {
//           type: "drift",
//           version: "v2023.2.1-modified",
//           timestamp: "12:18:07",
//           status: "detected",
//         },
//         {
//           type: "quarantine",
//           version: "quarantined",
//           timestamp: "12:18:15",
//           status: "quarantined",
//         },
//         {
//           type: "restore",
//           version: "v2023.2.1-original",
//           timestamp: "12:18:30",
//           status: "resolved",
//         },
//       ],
//     },
//   ]);

//   // Calculate stats dynamically
//   const driftStats = {
//     totalEvents: driftFlowData.length,
//     resolvedEvents: driftFlowData.filter((d) => d.status === "resolved").length,
//     pendingEvents: driftFlowData.filter((d) => d.status === "pending").length,
//     criticalEvents: driftFlowData.filter((d) => d.severity === "critical")
//       .length,
//     autoResolved:
//       Math.round(
//         (driftFlowData.filter(
//           (d) => d.status === "resolved" && d.trigger === "automatic"
//         ).length /
//           driftFlowData.filter((d) => d.status === "resolved").length) *
//           100
//       ) || 0,
//     manualActions:
//       Math.round(
//         (driftFlowData.filter((d) => d.trigger === "manual").length /
//           driftFlowData.length) *
//           100
//       ) || 0,
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     showToast("Refreshing drift events...", "info", 1500);

//     try {
//       // Replace this with your actual API call or data fetching function
//       const response = await fetch("/api/drift-events"); // example API
//       const data = await response.json();

//       // Update your state with the new data
//       setDriftEvents(data);

//       showToast("Drift events refreshed successfully", "success", 2000);
//     } catch (error) {
//       console.error("Error refreshing drift events:", error);
//       showToast("Failed to refresh drift events", "error", 2000);
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   const handleBulkRestore = () => {
//     const pendingEvents = driftFlowData.filter(
//       (event) => event.status === "pending"
//     );
//     if (pendingEvents.length === 0) {
//       showToast("No pending events to restore", "info");
//       return;
//     }

//     setShowRestoreModal(true);
//   };

//   const confirmBulkRestore = () => {
//     const pendingEvents = driftFlowData.filter(
//       (event) => event.status === "pending"
//     );
//     showToast(`Restoring ${pendingEvents.length} pending events...`, "info");

//     setShowRestoreModal(false);

//     pendingEvents.forEach((event, index) => {
//       setTimeout(() => {
//         setDriftFlowData((prev) =>
//           prev.map((e) =>
//             e.id === event.id
//               ? {
//                   ...e,
//                   status: "resolved",
//                   restoredVersion: e.originalVersion,
//                   aiAction: "Bulk auto-restored from backup",
//                   flowSteps: [
//                     ...e.flowSteps.filter((step) => step.type !== "pending"),
//                     {
//                       type: "restore",
//                       version: e.originalVersion,
//                       timestamp: new Date().toLocaleTimeString(),
//                       status: "resolved",
//                     },
//                   ],
//                 }
//               : e
//           )
//         );
//         showToast(`${event.id} restored successfully`, "success");

//         if (index === pendingEvents.length - 1) {
//           setTimeout(() => {
//             showToast("All pending events restored successfully", "success");
//           }, 500);
//         }
//       }, (index + 1) * 1200);
//     });
//   };

//   const handleRestoreEvent = (eventId) => {
//     const event = driftFlowData.find((e) => e.id === eventId);
//     if (!event) return;

//     if (event.status === "resolved") {
//       showToast("Event already resolved", "info");
//       return;
//     }

//     showToast(`Restoring ${eventId}...`, "info");

//     setTimeout(() => {
//       setDriftFlowData((prev) =>
//         prev.map((e) =>
//           e.id === eventId
//             ? {
//                 ...e,
//                 status: "resolved",
//                 restoredVersion: e.originalVersion,
//                 aiAction: "Manually restored from backup",
//                 flowSteps: [
//                   ...e.flowSteps.filter((step) => step.type !== "pending"),
//                   {
//                     type: "restore",
//                     version: e.originalVersion,
//                     timestamp: new Date().toLocaleTimeString(),
//                     status: "resolved",
//                   },
//                 ],
//               }
//             : e
//         )
//       );
//       showToast(`${eventId} restored successfully`, "success");
//     }, 2000);
//   };

//   const handleInvestigateEvent = (eventId) => {
//     showToast(`Opening detailed investigation for ${eventId}`, "info");
//     setTimeout(() => {
//       showToast(
//         "Investigation panel would open with detailed logs and analysis",
//         "info"
//       );
//     }, 1000);
//   };

//   const handleExportFlow = () => {
//     setShowExportModal(true);
//   };

//   const confirmExport = () => {
//     const report = {
//       timestamp: new Date().toISOString(),
//       events: driftFlowData,
//       statistics: driftStats,
//       configSettings: configSettings,
//     };

//     let blob, filename;

//     if (exportFormat === "json") {
//       blob = new Blob([JSON.stringify(report, null, 2)], {
//         type: "application/json",
//       });
//       filename = `drift-flow-${new Date().toISOString().split("T")[0]}.json`;
//     } else {
//       // CSV format
//       const csvHeader =
//         "ID,Device,Application,Type,Severity,Status,Timestamp,Description,Original Version,Drifted Version\n";
//       const csvRows = driftFlowData
//         .map(
//           (e) =>
//             `${e.id},${e.device},${e.application},${e.type},${e.severity},${e.status},${e.timestamp},"${e.description}",${e.originalVersion},${e.driftedVersion}`
//         )
//         .join("\n");
//       blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
//       filename = `drift-flow-${new Date().toISOString().split("T")[0]}.csv`;
//     }

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);

//     setShowExportModal(false);
//     showToast(
//       `Drift flow exported as ${exportFormat.toUpperCase()} successfully`,
//       "success"
//     );
//   };

//   const handleBackupNow = () => {
//     showToast("Initializing backup process...", "info", 2000);

//     setTimeout(() => {
//       showToast(
//         "Creating snapshots for all monitored configurations...",
//         "info",
//         2000
//       );
//     }, 2000);

//     setTimeout(() => {
//       showToast("Backing up 247 configuration files...", "info", 2000);
//     }, 4000);

//     setTimeout(() => {
//       showToast(
//         "Backup completed successfully for 247 configurations",
//         "success",
//         3000
//       );
//     }, 6000);
//   };

//   const handleMergeChanges = () => {
//     setShowMergeModal(true);
//   };

//   const confirmMerge = () => {
//     showToast(
//       `Initiating merge to ${mergeOptions.targetBranch} branch...`,
//       "info"
//     );

//     setTimeout(() => {
//       if (mergeOptions.createBackup) {
//         showToast("Creating backup before merge...", "info");
//       }
//     }, 1000);

//     setTimeout(() => {
//       showToast("Analyzing configuration changes...", "info");
//     }, 2000);

//     setTimeout(() => {
//       if (mergeOptions.autoResolveConflicts) {
//         showToast("Auto-resolving conflicts...", "info");
//       } else {
//         showToast("Manual conflict resolution required for 2 files", "warning");
//       }
//     }, 3000);

//     setTimeout(() => {
//       showToast("Merge completed successfully", "success");
//       setShowMergeModal(false);
//     }, 4500);
//   };

//   const handleCreateBranch = () => {
//     setShowBranchModal(true);
//   };

//   const confirmCreateBranch = () => {
//     if (!branchOptions.branchName.trim()) {
//       showToast("Please enter a branch name", "error");
//       return;
//     }

//     showToast(`Creating branch "${branchOptions.branchName}"...`, "info");

//     setTimeout(() => {
//       showToast("Taking snapshot of current configurations...", "info");
//     }, 1000);

//     setTimeout(() => {
//       showToast(
//         `Branch "${branchOptions.branchName}" created successfully`,
//         "success"
//       );
//       showToast("You can now test configuration changes in isolation", "info");
//       setShowBranchModal(false);
//       setBranchOptions({
//         branchName: "",
//         description: "",
//         baseBranch: "main",
//       });
//     }, 2500);
//   };

//   const handleSaveConfig = () => {
//     setShowConfigModal(false);
//     showToast("Drift management configuration saved successfully", "success");

//     setTimeout(() => {
//       showToast(
//         `Monitoring sensitivity: ${configSettings.sensitivity}`,
//         "info"
//       );
//     }, 1000);
//   };

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case "critical":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "high":
//         return "bg-orange-100 text-orange-800 border-orange-200";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "low":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "resolved":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "investigating":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getFlowStepColor = (type, status) => {
//     switch (type) {
//       case "original":
//         return "#10b981";
//       case "drift":
//         return status === "critical" ? "#ef4444" : "#f59e0b";
//       case "quarantine":
//         return "#8b5cf6";
//       case "restore":
//         return "#10b981";
//       case "pending":
//         return "#6b7280";
//       default:
//         return "#6b7280";
//     }
//   };

//   const getFlowStepIcon = (type) => {
//     switch (type) {
//       case "original":
//         return <GitCommit className="w-4 h-4" />;
//       case "drift":
//         return <AlertTriangle className="w-4 h-4" />;
//       case "quarantine":
//         return <Shield className="w-4 h-4" />;
//       case "restore":
//         return <RotateCcw className="w-4 h-4" />;
//       case "pending":
//         return <Clock className="w-4 h-4" />;
//       default:
//         return <Circle className="w-4 h-4" />;
//     }
//   };

//   const GitFlowVisualization = ({ event }) => {
//     return (
//       <div className="p-4 space-y-4">
//         <div className="flex items-center justify-between mb-4">
//           <h4 className="font-semibold text-lg" style={{ color: "#123458" }}>
//             {event.id} - Version Flow
//           </h4>
//           <div className="flex items-center space-x-2">
//             <GitBranch className="w-5 h-5" style={{ color: "#123458" }} />
//             <span className="text-sm font-medium" style={{ color: "#123458" }}>
//               {event.application}
//             </span>
//           </div>
//         </div>

//         <div className="relative">
//           {/* Main flow line */}
//           <div
//             className="absolute left-6 top-8 bottom-0 w-0.5"
//             style={{ backgroundColor: "#D4C9BE" }}
//           ></div>

//           {/* Flow steps */}
//           <div className="space-y-6">
//             {event.flowSteps.map((step, index) => (
//               <div key={index} className="relative flex items-start space-x-4">
//                 {/* Flow node */}
//                 <div
//                   className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4"
//                   style={{
//                     backgroundColor: getFlowStepColor(step.type, step.status),
//                     borderColor: "#F1EFEC",
//                   }}
//                 >
//                   <div className="text-white">{getFlowStepIcon(step.type)}</div>
//                 </div>

//                 {/* Step details */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h5
//                         className="font-medium capitalize"
//                         style={{ color: "#123458" }}
//                       >
//                         {step.type === "original"
//                           ? "Original State"
//                           : step.type === "drift"
//                           ? "Drift Detected"
//                           : step.type === "quarantine"
//                           ? "Quarantined"
//                           : step.type === "restore"
//                           ? "Auto-Restored"
//                           : "Pending Action"}
//                       </h5>
//                       <p
//                         className="text-sm opacity-60"
//                         style={{ color: "#123458" }}
//                       >
//                         {step.timestamp}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <div
//                         className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
//                           step.status
//                         )}`}
//                       >
//                         {step.status}
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="mt-2 p-3 rounded-lg border"
//                     style={{
//                       backgroundColor: "#F1EFEC",
//                       borderColor: "#D4C9BE",
//                     }}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <GitCommit
//                         className="w-4 h-4 opacity-60"
//                         style={{ color: "#123458" }}
//                       />
//                       <span
//                         className="font-mono text-sm"
//                         style={{ color: "#123458" }}
//                       >
//                         {step.version}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Branch indicator for drift */}
//                 {step.type === "drift" && (
//                   <div className="absolute left-12 top-6">
//                     <div className="flex items-center">
//                       <div
//                         className="w-8 h-0.5"
//                         style={{
//                           backgroundColor: getFlowStepColor(
//                             step.type,
//                             step.status
//                           ),
//                         }}
//                       ></div>
//                       <ArrowRight
//                         className="w-4 h-4"
//                         style={{
//                           color: getFlowStepColor(step.type, step.status),
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div
//           className="flex space-x-2 pt-4 border-t"
//           style={{ borderColor: "#D4C9BE" }}
//         >
//           {event.status === "pending" ? (
//             <>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRestoreEvent(event.id);
//                 }}
//                 className="px-3 py-1 rounded text-sm font-medium hover:opacity-80 transition-opacity"
//                 style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//               >
//                 <RotateCcw className="w-4 h-4 inline mr-1" />
//                 Restore
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleInvestigateEvent(event.id);
//                 }}
//                 className="px-3 py-1 rounded text-sm font-medium hover:opacity-80 transition-opacity"
//                 style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//               >
//                 <Eye className="w-4 h-4 inline mr-1" />
//                 Investigate
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleInvestigateEvent(event.id);
//               }}
//               className="px-3 py-1 rounded text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               <Eye className="w-4 h-4 inline mr-1" />
//               View Details
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Page Header */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold" style={{ color: "#123458" }}>
//                 Drift Management
//               </h1>
//               <p className="mt-2 opacity-70" style={{ color: "#123458" }}>
//                 Git-flow style configuration drift detection and version control
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0 flex space-x-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80 disabled:opacity-50"
//                 style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 inline mr-2 ${
//                     isRefreshing ? "animate-spin" : ""
//                   }`}
//                 />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setShowConfigModal(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
//               >
//                 <Settings className="w-4 h-4 inline mr-2" />
//                 Configure
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Total Events
//                 </p>
//                 <p className="text-2xl font-bold" style={{ color: "#123458" }}>
//                   {driftStats.totalEvents}
//                 </p>
//               </div>
//               <GitBranch
//                 className="w-6 h-6 opacity-60"
//                 style={{ color: "#123458" }}
//               />
//             </div>
//           </div>

//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Resolved
//                 </p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {driftStats.resolvedEvents}
//                 </p>
//               </div>
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//           </div>

//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Pending
//                 </p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {driftStats.pendingEvents}
//                 </p>
//               </div>
//               <Clock className="w-6 h-6 text-yellow-600" />
//             </div>
//           </div>

//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Critical
//                 </p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {driftStats.criticalEvents}
//                 </p>
//               </div>
//               <AlertTriangle className="w-6 h-6 text-red-600" />
//             </div>
//           </div>

//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Auto-Resolved
//                 </p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {driftStats.autoResolved}%
//                 </p>
//               </div>
//               <Bot className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>

//           <div
//             className="p-4 rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p
//                   className="text-xs font-medium opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Manual Actions
//                 </p>
//                 <p className="text-2xl font-bold text-purple-600">
//                   {driftStats.manualActions}%
//                 </p>
//               </div>
//               <User className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Drift Events List */}
//           <div
//             className="rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
//               <div className="flex items-center justify-between">
//                 <h3
//                   className="text-lg font-semibold"
//                   style={{ color: "#123458" }}
//                 >
//                   Drift Events
//                 </h3>
//               </div>
//             </div>

//             <div className="divide-y" style={{ divideColor: "#D4C9BE" }}>
//               {driftFlowData.map((event) => (
//                 <div
//                   key={event.id}
//                   className={`p-4 cursor-pointer transition-colors ${
//                     selectedEvent === event.id
//                       ? "bg-opacity-50"
//                       : "hover:bg-opacity-25"
//                   }`}
//                   style={{
//                     backgroundColor:
//                       selectedEvent === event.id ? "#F1EFEC" : "transparent",
//                   }}
//                   onClick={() => setSelectedEvent(event.id)}
//                 >
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <span
//                           className="text-sm font-medium"
//                           style={{ color: "#123458" }}
//                         >
//                           {event.id}
//                         </span>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
//                             event.severity
//                           )}`}
//                         >
//                           {event.severity}
//                         </span>
//                         {event.trigger === "automatic" ? (
//                           <Bot className="w-4 h-4 text-blue-600" />
//                         ) : (
//                           <User className="w-4 h-4 text-purple-600" />
//                         )}
//                       </div>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
//                           event.status
//                         )}`}
//                       >
//                         {event.status}
//                       </span>
//                     </div>

//                     <div className="text-sm" style={{ color: "#123458" }}>
//                       <div className="font-medium">
//                         {event.device} - {event.application}
//                       </div>
//                       <div className="text-xs opacity-60">
//                         {event.type}: {event.description}
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-4 text-xs">
//                       <div className="flex items-center space-x-1">
//                         <GitCommit className="w-3 h-3 opacity-60" />
//                         <span className="opacity-60">From:</span>
//                         <span className="font-mono bg-green-100 text-green-800 px-1 rounded">
//                           {event.originalVersion}
//                         </span>
//                       </div>
//                       <ArrowRight className="w-3 h-3 opacity-40" />
//                       <div className="flex items-center space-x-1">
//                         <span className="opacity-60">To:</span>
//                         <span
//                           className={`font-mono px-1 rounded ${
//                             event.driftedVersion === "missing"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {event.driftedVersion}
//                         </span>
//                       </div>
//                     </div>

//                     <div
//                       className="text-xs opacity-50"
//                       style={{ color: "#123458" }}
//                     >
//                       {event.timestamp}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Git Flow Visualization */}
//           <div
//             className="rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
//               <h3
//                 className="text-lg font-semibold"
//                 style={{ color: "#123458" }}
//               >
//                 Version Flow Visualization
//               </h3>
//             </div>

//             {selectedEvent && (
//               <GitFlowVisualization
//                 event={driftFlowData.find((e) => e.id === selectedEvent)}
//               />
//             )}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-6">
//           <div
//             className="rounded-xl shadow-sm"
//             style={{ backgroundColor: "#FFFFFF" }}
//           >
//             <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
//               <h3
//                 className="text-lg font-semibold"
//                 style={{ color: "#123458" }}
//               >
//                 Quick Actions
//               </h3>
//             </div>
//             <div className="p-4">
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//                 <button
//                   onClick={handleBulkRestore}
//                   className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                   <span>Bulk Restore</span>
//                 </button>
//                 <button
//                   onClick={handleMergeChanges}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
//                   style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//                 >
//                   <GitMerge className="w-4 h-4" />
//                   <span>Merge Changes</span>
//                 </button>
//                 <button
//                   onClick={handleCreateBranch}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
//                   style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//                 >
//                   <GitBranch className="w-4 h-4" />
//                   <span>Create Branch</span>
//                 </button>
//                 <button
//                   onClick={() => setShowConfigModal(true)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
//                   style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//                 >
//                   <Settings className="w-4 h-4" />
//                   <span>Configure Rules</span>
//                 </button>
//                 <button
//                   onClick={handleBackupNow}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
//                   style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//                 >
//                   <HardDrive className="w-4 h-4" />
//                   <span>Backup Now</span>
//                 </button>
//                 <button
//                   onClick={handleExportFlow}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
//                   style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//                 >
//                   <FileText className="w-4 h-4" />
//                   <span>Export Flow</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Configuration Modal */}
//       <Modal
//         isOpen={showConfigModal}
//         onClose={() => setShowConfigModal(false)}
//         title="Drift Management Configuration"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Monitoring Sensitivity
//             </label>
//             <select
//               className="w-full p-2 border rounded-lg"
//               style={{ borderColor: "#D4C9BE" }}
//               value={configSettings.sensitivity}
//               onChange={(e) =>
//                 setConfigSettings({
//                   ...configSettings,
//                   sensitivity: e.target.value,
//                 })
//               }
//             >
//               <option value="high">High - Detect all changes</option>
//               <option value="medium">Medium - Ignore minor changes</option>
//               <option value="low">Low - Only critical changes</option>
//             </select>
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Auto-Restore Policy
//             </label>
//             <div className="space-y-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={configSettings.autoRestoreConfig}
//                   onChange={(e) =>
//                     setConfigSettings({
//                       ...configSettings,
//                       autoRestoreConfig: e.target.checked,
//                     })
//                   }
//                 />
//                 <span className="text-sm" style={{ color: "#123458" }}>
//                   Auto-restore configuration files
//                 </span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={configSettings.autoRestoreBinary}
//                   onChange={(e) =>
//                     setConfigSettings({
//                       ...configSettings,
//                       autoRestoreBinary: e.target.checked,
//                     })
//                   }
//                 />
//                 <span className="text-sm" style={{ color: "#123458" }}>
//                   Auto-restore binary files
//                 </span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={configSettings.createBackup}
//                   onChange={(e) =>
//                     setConfigSettings({
//                       ...configSettings,
//                       createBackup: e.target.checked,
//                     })
//                   }
//                 />
//                 <span className="text-sm" style={{ color: "#123458" }}>
//                   Create backup before restore
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowConfigModal(false)}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveConfig}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Bulk Restore Confirmation Modal */}
//       <Modal
//         isOpen={showRestoreModal}
//         onClose={() => setShowRestoreModal(false)}
//         title="Bulk Restore Confirmation"
//       >
//         <div className="space-y-4">
//           <p style={{ color: "#123458" }}>
//             Are you sure you want to restore all pending drift events? This
//             will:
//           </p>
//           <ul
//             className="list-disc list-inside space-y-1 text-sm"
//             style={{ color: "#123458" }}
//           >
//             <li>
//               Restore{" "}
//               {driftFlowData.filter((d) => d.status === "pending").length}{" "}
//               configuration(s) to their original state
//             </li>
//             <li>Create backup snapshots before restoration</li>
//             <li>Generate detailed restoration logs</li>
//           </ul>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowRestoreModal(false)}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmBulkRestore}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//             >
//               Restore All
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Export Format Modal */}
//       <Modal
//         isOpen={showExportModal}
//         onClose={() => setShowExportModal(false)}
//         title="Export Drift Flow"
//       >
//         <div className="space-y-4">
//           <p style={{ color: "#123458" }}>
//             Choose the format for exporting drift flow data:
//           </p>

//           <div className="space-y-3">
//             <label
//               className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
//                 exportFormat === "json" ? "border-2" : ""
//               }`}
//               style={{
//                 borderColor: exportFormat === "json" ? "#123458" : "#D4C9BE",
//                 backgroundColor:
//                   exportFormat === "json" ? "#F1EFEC" : "#FFFFFF",
//               }}
//             >
//               <input
//                 type="radio"
//                 name="exportFormat"
//                 value="json"
//                 checked={exportFormat === "json"}
//                 onChange={(e) => setExportFormat(e.target.value)}
//                 className="mr-3"
//               />
//               <div>
//                 <div className="font-medium" style={{ color: "#123458" }}>
//                   JSON Format
//                 </div>
//                 <div
//                   className="text-sm opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Complete data with metadata and nested structures
//                 </div>
//               </div>
//             </label>

//             <label
//               className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
//                 exportFormat === "csv" ? "border-2" : ""
//               }`}
//               style={{
//                 borderColor: exportFormat === "csv" ? "#123458" : "#D4C9BE",
//                 backgroundColor: exportFormat === "csv" ? "#F1EFEC" : "#FFFFFF",
//               }}
//             >
//               <input
//                 type="radio"
//                 name="exportFormat"
//                 value="csv"
//                 checked={exportFormat === "csv"}
//                 onChange={(e) => setExportFormat(e.target.value)}
//                 className="mr-3"
//               />
//               <div>
//                 <div className="font-medium" style={{ color: "#123458" }}>
//                   CSV Format
//                 </div>
//                 <div
//                   className="text-sm opacity-60"
//                   style={{ color: "#123458" }}
//                 >
//                   Spreadsheet compatible format for analysis
//                 </div>
//               </div>
//             </label>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowExportModal(false)}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmExport}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//             >
//               Export
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Merge Changes Modal */}
//       <Modal
//         isOpen={showMergeModal}
//         onClose={() => setShowMergeModal(false)}
//         title="Merge Configuration Changes"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Target Branch
//             </label>
//             <select
//               className="w-full p-2 border rounded-lg"
//               style={{ borderColor: "#D4C9BE" }}
//               value={mergeOptions.targetBranch}
//               onChange={(e) =>
//                 setMergeOptions({
//                   ...mergeOptions,
//                   targetBranch: e.target.value,
//                 })
//               }
//             >
//               <option value="main">main</option>
//               <option value="production">production</option>
//               <option value="staging">staging</option>
//               <option value="development">development</option>
//             </select>
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Merge Options
//             </label>
//             <div className="space-y-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={mergeOptions.createBackup}
//                   onChange={(e) =>
//                     setMergeOptions({
//                       ...mergeOptions,
//                       createBackup: e.target.checked,
//                     })
//                   }
//                 />
//                 <span className="text-sm" style={{ color: "#123458" }}>
//                   Create backup before merge
//                 </span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={mergeOptions.autoResolveConflicts}
//                   onChange={(e) =>
//                     setMergeOptions({
//                       ...mergeOptions,
//                       autoResolveConflicts: e.target.checked,
//                     })
//                   }
//                 />
//                 <span className="text-sm" style={{ color: "#123458" }}>
//                   Auto-resolve conflicts when possible
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div
//             className="p-3 rounded-lg"
//             style={{ backgroundColor: "#F1EFEC" }}
//           >
//             <p className="text-sm" style={{ color: "#123458" }}>
//               <strong>Note:</strong> This will merge approved configuration
//               changes to the {mergeOptions.targetBranch} branch. Review all
//               changes carefully before proceeding.
//             </p>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowMergeModal(false)}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmMerge}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//             >
//               Merge Changes
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Create Branch Modal */}
//       <Modal
//         isOpen={showBranchModal}
//         onClose={() => setShowBranchModal(false)}
//         title="Create Configuration Branch"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Branch Name *
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-lg"
//               style={{ borderColor: "#D4C9BE" }}
//               placeholder="e.g., feature/new-security-config"
//               value={branchOptions.branchName}
//               onChange={(e) =>
//                 setBranchOptions({
//                   ...branchOptions,
//                   branchName: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Description
//             </label>
//             <textarea
//               className="w-full p-2 border rounded-lg"
//               style={{ borderColor: "#D4C9BE" }}
//               rows={3}
//               placeholder="Brief description of this configuration branch..."
//               value={branchOptions.description}
//               onChange={(e) =>
//                 setBranchOptions({
//                   ...branchOptions,
//                   description: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#123458" }}
//             >
//               Base Branch
//             </label>
//             <select
//               className="w-full p-2 border rounded-lg"
//               style={{ borderColor: "#D4C9BE" }}
//               value={branchOptions.baseBranch}
//               onChange={(e) =>
//                 setBranchOptions({
//                   ...branchOptions,
//                   baseBranch: e.target.value,
//                 })
//               }
//             >
//               <option value="main">main</option>
//               <option value="production">production</option>
//               <option value="staging">staging</option>
//               <option value="development">development</option>
//             </select>
//           </div>

//           <div
//             className="p-3 rounded-lg"
//             style={{ backgroundColor: "#F1EFEC" }}
//           >
//             <p className="text-sm" style={{ color: "#123458" }}>
//               <strong>Info:</strong> Creating a branch allows you to test
//               configuration changes in isolation before merging them to the main
//               branch. All current configurations will be snapshotted.
//             </p>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => {
//                 setShowBranchModal(false);
//                 setBranchOptions({
//                   branchName: "",
//                   description: "",
//                   baseBranch: "main",
//                 });
//               }}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmCreateBranch}
//               className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
//               style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
//             >
//               Create Branch
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default DriftManagement;
import React, { useState } from "react";
import Modal from "../components/Modal";
import { useToast } from "../components/Toast";
import {
  GitBranch,
  GitCommitVertical as GitCommit,
  GitMerge,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Circle,
  RefreshCw,
  Settings,
  HardDrive,
  FileText,
  Eye,
  Info,
  History,
  FileCode,
  Server,
  Layers,
} from "lucide-react";

const DriftManagement = () => {
  const { showToast, ToastContainer } = useToast();
  const [selectedEvent, setSelectedEvent] = useState("DFT-001");
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showConfirmMerge, setShowConfirmMerge] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [branchError, setBranchError] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [detailsTab, setDetailsTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exportFormat, setExportFormat] = useState("json");
  const [mergeOptions, setMergeOptions] = useState({
    targetBranch: "main",
    createBackup: true,
    autoResolveConflicts: false,
  });
  const [branchOptions, setBranchOptions] = useState({
    branchName: "",
    description: "",
    baseBranch: "main",
  });
  const [configSettings, setConfigSettings] = useState({
    sensitivity: "high",
    autoRestoreConfig: true,
    autoRestoreBinary: false,
    createBackup: true,
  });

  const [driftFlowData, setDriftFlowData] = useState([
    {
      id: "DFT-001",
      device: "WS-Marketing-01",
      application: "Adobe Photoshop",
      type: "Configuration Drift",
      severity: "high",
      timestamp: "2024-01-15 14:32:15",
      description: "Config file modified: preferences.xml",
      originalVersion: "v24.1.0-stable",
      driftedVersion: "v24.1.0-modified",
      restoredVersion: "v24.1.0-stable",
      aiAction: "Auto-restored from backup",
      status: "resolved",
      trigger: "automatic",
      filePath:
        "/Applications/Adobe Photoshop 2024/Preferences/preferences.xml",
      fileSize: "24.5 KB",
      checksum: {
        original: "a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5",
        drifted: "x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2",
        restored: "a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5",
      },
      detectedBy: "File Integrity Monitor",
      assignedTo: "System (Auto)",
      priority: "P2",
      tags: ["config", "auto-resolved"],
      relatedEvents: ["DFT-004", "DFT-007"],
      auditLog: [
        {
          time: "14:30:00",
          action: "Baseline snapshot created",
          user: "System",
        },
        { time: "14:32:15", action: "Drift detected", user: "FIM Agent" },
        {
          time: "14:32:20",
          action: "Auto-restore initiated",
          user: "AI Engine",
        },
        { time: "14:32:45", action: "File restored", user: "System" },
      ],
      flowSteps: [
        {
          type: "original",
          version: "v24.1.0-stable",
          timestamp: "14:30:00",
          status: "stable",
        },
        {
          type: "drift",
          version: "v24.1.0-modified",
          timestamp: "14:32:15",
          status: "detected",
        },
        {
          type: "restore",
          version: "v24.1.0-stable",
          timestamp: "14:32:45",
          status: "resolved",
        },
      ],
    },
    {
      id: "DFT-002",
      device: "SRV-Database-01",
      application: "MySQL Server",
      type: "File Deletion",
      severity: "critical",
      timestamp: "2024-01-15 13:45:22",
      description: "Critical file deleted: my.cnf",
      originalVersion: "v8.0.35-original",
      driftedVersion: "missing",
      restoredVersion: null,
      aiAction: "Pending manual review",
      status: "pending",
      trigger: "manual",
      filePath: "/etc/mysql/my.cnf",
      fileSize: "8.2 KB",
      checksum: {
        original: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
        drifted: "N/A - File Missing",
        restored: null,
      },
      detectedBy: "File Integrity Monitor",
      assignedTo: "John Smith (DBA)",
      priority: "P1",
      tags: ["critical", "database"],
      relatedEvents: [],
      auditLog: [
        { time: "13:40:00", action: "Baseline created", user: "System" },
        {
          time: "13:45:22",
          action: "File deletion detected",
          user: "FIM Agent",
        },
        { time: "13:45:25", action: "Alert escalated", user: "AI Engine" },
      ],
      flowSteps: [
        {
          type: "original",
          version: "v8.0.35-original",
          timestamp: "13:40:00",
          status: "stable",
        },
        {
          type: "drift",
          version: "missing",
          timestamp: "13:45:22",
          status: "critical",
        },
        {
          type: "pending",
          version: "awaiting action",
          timestamp: "13:45:30",
          status: "pending",
        },
      ],
    },
    {
      id: "DFT-003",
      device: "WS-Finance-03",
      application: "QuickBooks",
      type: "Binary Modification",
      severity: "medium",
      timestamp: "2024-01-15 12:18:07",
      description: "Executable checksum mismatch",
      originalVersion: "v2023.2.1-original",
      driftedVersion: "v2023.2.1-modified",
      restoredVersion: "v2023.2.1-original",
      aiAction: "Quarantined and restored",
      status: "resolved",
      trigger: "automatic",
      filePath: "C:\\Program Files\\Intuit\\QuickBooks\\QBW32.exe",
      fileSize: "45.8 MB",
      checksum: {
        original: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
        drifted: "m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8",
        restored: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
      },
      detectedBy: "Binary Integrity Scanner",
      assignedTo: "System (Auto)",
      priority: "P2",
      tags: ["binary", "quarantined"],
      relatedEvents: ["DFT-009"],
      auditLog: [
        { time: "12:15:00", action: "Baseline created", user: "System" },
        { time: "12:18:07", action: "Binary modified", user: "BIS Agent" },
        { time: "12:18:15", action: "Quarantined", user: "AI Engine" },
        { time: "12:18:30", action: "Restored", user: "System" },
      ],
      flowSteps: [
        {
          type: "original",
          version: "v2023.2.1-original",
          timestamp: "12:15:00",
          status: "stable",
        },
        {
          type: "drift",
          version: "v2023.2.1-modified",
          timestamp: "12:18:07",
          status: "detected",
        },
        {
          type: "quarantine",
          version: "quarantined",
          timestamp: "12:18:15",
          status: "quarantined",
        },
        {
          type: "restore",
          version: "v2023.2.1-original",
          timestamp: "12:18:30",
          status: "resolved",
        },
      ],
    },
  ]);

  // Example merge details per device
  const [mergeDetails, setMergeDetails] = useState([
    { file: "App.jsx", added: 12, removed: 3 },
    { file: "index.js", added: 5, removed: 0 },
    { file: "utils/helpers.js", added: 0, removed: 2 },
  ]);

  const openMergeModalForDevice = (device) => {
    setSelectedDevice(device);
    setShowMergeModal(true);
  };
  const driftStats = {
    totalEvents: driftFlowData.length,
    resolvedEvents: driftFlowData.filter((d) => d.status === "resolved").length,
    pendingEvents: driftFlowData.filter((d) => d.status === "pending").length,
    criticalEvents: driftFlowData.filter((d) => d.severity === "critical")
      .length,
    autoResolved: Math.round(
      (driftFlowData.filter(
        (d) => d.status === "resolved" && d.trigger === "automatic"
      ).length /
        Math.max(
          driftFlowData.filter((d) => d.status === "resolved").length,
          1
        )) *
        100
    ),
    manualActions: Math.round(
      (driftFlowData.filter((d) => d.trigger === "manual").length /
        driftFlowData.length) *
        100
    ),
  };

  // Reset helper
  const resetBranchOptions = () => {
    setBranchOptions({
      branchName: "",
      description: "",
      baseBranch: "main",
    });
    setBranchError("");
  };

  // Git-like branch name validation:
  const validateBranchName = (name) => {
    const regex = /^[a-zA-Z0-9._/-]+$/;
    return regex.test(name);
  };

  const openConfirmation = () => {
    if (!branchOptions.branchName.trim()) {
      setBranchError("Branch name is required");
      return;
    }

    if (!validateBranchName(branchOptions.branchName.trim())) {
      setBranchError("Invalid name. Allowed: letters, numbers, /, -, _ , .");
      return;
    }

    setBranchError("");
    setShowConfirmModal(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Refreshed", "success");
    }, 2000);
  };
  const handleBulkRestore = () => {
    if (!driftFlowData.filter((e) => e.status === "pending").length) {
      showToast("No pending events", "info");
      return;
    }
    setShowRestoreModal(true);
  };
  const confirmBulkRestore = () => {
    const pending = driftFlowData.filter((e) => e.status === "pending");
    setShowRestoreModal(false);
    pending.forEach((ev, i) =>
      setTimeout(() => {
        setDriftFlowData((prev) =>
          prev.map((e) =>
            e.id === ev.id
              ? {
                  ...e,
                  status: "resolved",
                  restoredVersion: e.originalVersion,
                  flowSteps: [
                    ...e.flowSteps.filter((s) => s.type !== "pending"),
                    {
                      type: "restore",
                      version: e.originalVersion,
                      timestamp: new Date().toLocaleTimeString(),
                      status: "resolved",
                    },
                  ],
                }
              : e
          )
        );
        showToast(`${ev.id} restored`, "success");
      }, (i + 1) * 1000)
    );
  };
  const handleRestoreEvent = (id) => {
    const ev = driftFlowData.find((e) => e.id === id);
    if (!ev || ev.status === "resolved") {
      showToast("Already resolved", "info");
      return;
    }
    showToast(`Restoring ${id}...`, "info");
    setTimeout(() => {
      setDriftFlowData((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                status: "resolved",
                restoredVersion: e.originalVersion,
                flowSteps: [
                  ...e.flowSteps.filter((s) => s.type !== "pending"),
                  {
                    type: "restore",
                    version: e.originalVersion,
                    timestamp: new Date().toLocaleTimeString(),
                    status: "resolved",
                  },
                ],
              }
            : e
        )
      );
      showToast(`${id} restored`, "success");
      if (detailsEvent?.id === id)
        setDetailsEvent((p) => ({
          ...p,
          status: "resolved",
          restoredVersion: p.originalVersion,
        }));
    }, 2000);
  };
  const handleViewDetails = (id) => {
    const ev = driftFlowData.find((e) => e.id === id);
    if (ev) {
      setDetailsEvent(ev);
      setDetailsTab("overview");
      setShowDetailsModal(true);
    }
  };
  const confirmExport = () => {
    const blob =
      exportFormat === "json"
        ? new Blob(
            [
              JSON.stringify(
                { events: driftFlowData, stats: driftStats },
                null,
                2
              ),
            ],
            { type: "application/json" }
          )
        : new Blob(
            [
              "ID,Device,App,Severity,Status\n" +
                driftFlowData
                  .map(
                    (e) =>
                      `${e.id},${e.device},${e.application},${e.severity},${e.status}`
                  )
                  .join("\n"),
            ],
            { type: "text/csv" }
          );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `drift.${exportFormat}`;
    a.click();
    setShowExportModal(false);
    showToast("Exported", "success");
  };
  const confirmMerge = () => {
    showToast(`Merging changes on ${selectedDevice.name}...`, "info");
    setTimeout(() => {
      showToast(`Merge completed on ${selectedDevice.name}`, "success");
      setShowMergeModal(false);
      setShowConfirmMerge(false);
    }, 2000);
  };
  const confirmBranch = () => {
    showToast("Creating branch...", "info");

    setTimeout(() => {
      showToast("Branch created successfully!", "success");
      setShowBranchModal(false);
      setShowConfirmModal(false);
      resetBranchOptions();
    }, 1500);
  };

  const getSeverityColor = (s) =>
    ({
      critical: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }[s] || "bg-gray-100 text-gray-800 border-gray-200");
  const getStatusColor = (s) =>
    ({
      resolved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      stable: "bg-green-100 text-green-800 border-green-200",
      detected: "bg-orange-100 text-orange-800 border-orange-200",
      critical: "bg-red-100 text-red-800 border-red-200",
      quarantined: "bg-purple-100 text-purple-800 border-purple-200",
    }[s] || "bg-gray-100 text-gray-800 border-gray-200");
  const getFlowColor = (t, s) =>
    ({
      original: "#10b981",
      drift: s === "critical" ? "#ef4444" : "#f59e0b",
      quarantine: "#8b5cf6",
      restore: "#10b981",
      pending: "#6b7280",
    }[t] || "#6b7280");
  const getFlowIcon = (t) =>
    ({
      original: <GitCommit className="w-4 h-4" />,
      drift: <AlertTriangle className="w-4 h-4" />,
      quarantine: <Shield className="w-4 h-4" />,
      restore: <RotateCcw className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
    }[t] || <Circle className="w-4 h-4" />);

  const FlowViz = ({ event }) => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg" style={{ color: "#123458" }}>
          {event.id} - Version Flow
        </h4>
        <div className="flex items-center space-x-2">
          <GitBranch className="w-5 h-5" style={{ color: "#123458" }} />
          <span className="text-sm font-medium" style={{ color: "#123458" }}>
            {event.application}
          </span>
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute left-6 top-8 bottom-0 w-0.5"
          style={{ backgroundColor: "#D4C9BE" }}
        />
        <div className="space-y-6">
          {event.flowSteps.map((s, i) => (
            <div key={i} className="relative flex items-start space-x-4">
              <div
                className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4"
                style={{
                  backgroundColor: getFlowColor(s.type, s.status),
                  borderColor: "#F1EFEC",
                }}
              >
                <div className="text-white">{getFlowIcon(s.type)}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium" style={{ color: "#123458" }}>
                      {s.type === "original"
                        ? "Original"
                        : s.type === "drift"
                        ? "Drift Detected"
                        : s.type === "quarantine"
                        ? "Quarantined"
                        : s.type === "restore"
                        ? "Restored"
                        : "Pending"}
                    </h5>
                    <p
                      className="text-sm opacity-60"
                      style={{ color: "#123458" }}
                    >
                      {s.timestamp}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      s.status
                    )}`}
                  >
                    {s.status}
                  </span>
                </div>
                <div
                  className="mt-2 p-3 rounded-lg border"
                  style={{ backgroundColor: "#F1EFEC", borderColor: "#D4C9BE" }}
                >
                  <span
                    className="font-mono text-sm"
                    style={{ color: "#123458" }}
                  >
                    {s.version}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex space-x-2 pt-4 border-t"
        style={{ borderColor: "#D4C9BE" }}
      >
        {event.status === "pending" ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRestoreEvent(event.id);
              }}
              className="px-3 py-1 rounded text-sm font-medium"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Restore
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(event.id);
              }}
              className="px-3 py-1 rounded text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Investigate
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(event.id);
            }}
            className="px-3 py-1 rounded text-sm font-medium"
            style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            View Details
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#123458" }}>
              Drift Management
            </h1>
            <p className="mt-2 opacity-70" style={{ color: "#123458" }}>
              Git-flow style drift detection
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <RefreshCw
                className={`w-4 h-4 inline mr-2 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
            <button
              onClick={() => setShowConfigModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Configure
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Total
            </p>
            <p className="text-2xl font-bold" style={{ color: "#123458" }}>
              {driftStats.totalEvents}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Resolved
            </p>
            <p className="text-2xl font-bold text-green-600">
              {driftStats.resolvedEvents}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Pending
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              {driftStats.pendingEvents}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Critical
            </p>
            <p className="text-2xl font-bold text-red-600">
              {driftStats.criticalEvents}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Auto-Resolved
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {driftStats.autoResolved}%
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm bg-white">
            <p className="text-xs opacity-60" style={{ color: "#123458" }}>
              Manual
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {driftStats.manualActions}%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl shadow-sm bg-white">
            <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#123458" }}
              >
                Drift Events
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#D4C9BE" }}>
              {driftFlowData.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 cursor-pointer"
                  style={{
                    backgroundColor:
                      selectedEvent === ev.id ? "#F1EFEC" : "transparent",
                  }}
                  onClick={() => setSelectedEvent(ev.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#123458" }}
                      >
                        {ev.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(
                          ev.severity
                        )}`}
                      >
                        {ev.severity}
                      </span>
                      {ev.trigger === "automatic" ? (
                        <Bot className="w-4 h-4 text-blue-600" />
                      ) : (
                        <User className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
                        ev.status
                      )}`}
                    >
                      {ev.status}
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: "#123458" }}>
                    <div className="font-medium">
                      {ev.device} - {ev.application}
                    </div>
                    <div className="text-xs opacity-60">{ev.description}</div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs mt-2">
                    <span className="font-mono bg-green-100 text-green-800 px-1 rounded">
                      {ev.originalVersion}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-40" />
                    <span
                      className={`font-mono px-1 rounded ${
                        ev.driftedVersion === "missing"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ev.driftedVersion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl shadow-sm bg-white">
            <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#123458" }}
              >
                Version Flow
              </h3>
            </div>
            {selectedEvent && (
              <FlowViz
                event={driftFlowData.find((e) => e.id === selectedEvent)}
              />
            )}
          </div>
        </div>
        <div className="mt-6 rounded-xl shadow-sm bg-white">
          <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
            <h3 className="text-lg font-semibold" style={{ color: "#123458" }}>
              Quick Actions
            </h3>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <button
              onClick={handleBulkRestore}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Bulk Restore
            </button>
            <button
              onClick={() => setShowMergeModal(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <GitMerge className="w-4 h-4 inline mr-1" />
              Merge
            </button>

            {/* CREATE BRANCH BUTTON */}
            <button
              onClick={() => setShowBranchModal(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <GitBranch className="w-4 h-4 inline mr-1" />
              Create Branch
            </button>

            <button
              onClick={() => {
                showToast("Backing up...", "info");
                setTimeout(() => showToast("Backup done", "success"), 2000);
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <HardDrive className="w-4 h-4 inline mr-1" />
              Backup
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Export
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={detailsEvent ? `Event Details - ${detailsEvent.id}` : "Details"}
        size="xl"
      >
        {detailsEvent && (
          <div className="space-y-4">
            <div
              className="flex space-x-1 border-b"
              style={{ borderColor: "#D4C9BE" }}
            >
              {["overview", "checksums", "audit", "related"].map((t) => (
                <button
                  key={t}
                  onClick={() => setDetailsTab(t)}
                  className={`px-4 py-2 text-sm font-medium capitalize ${
                    detailsTab === t ? "border-b-2" : "opacity-60"
                  }`}
                  style={{
                    borderColor: detailsTab === t ? "#123458" : "transparent",
                    color: "#123458",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {detailsTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4" style={{ color: "#123458" }} />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#123458" }}
                    >
                      General
                    </span>
                  </div>
                  <div
                    className="space-y-2 text-sm"
                    style={{ color: "#123458" }}
                  >
                    <div className="flex justify-between">
                      <span className="opacity-60">ID:</span>
                      <span className="font-mono">{detailsEvent.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Type:</span>
                      <span>{detailsEvent.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-60">Severity:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs border ${getSeverityColor(
                          detailsEvent.severity
                        )}`}
                      >
                        {detailsEvent.severity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-60">Status:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(
                          detailsEvent.status
                        )}`}
                      >
                        {detailsEvent.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Priority:</span>
                      <span>{detailsEvent.priority}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Server className="w-4 h-4" style={{ color: "#123458" }} />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#123458" }}
                    >
                      Device
                    </span>
                  </div>
                  <div
                    className="space-y-2 text-sm"
                    style={{ color: "#123458" }}
                  >
                    <div className="flex justify-between">
                      <span className="opacity-60">Device:</span>
                      <span>{detailsEvent.device}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">App:</span>
                      <span>{detailsEvent.application}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Detected By:</span>
                      <span>{detailsEvent.detectedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Assigned:</span>
                      <span>{detailsEvent.assignedTo}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg md:col-span-2"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCode
                      className="w-4 h-4"
                      style={{ color: "#123458" }}
                    />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#123458" }}
                    >
                      File
                    </span>
                  </div>
                  <div
                    className="space-y-2 text-sm"
                    style={{ color: "#123458" }}
                  >
                    <div>
                      <span className="opacity-60">Path:</span>
                      <p className="font-mono text-xs mt-1 p-2 rounded bg-white break-all">
                        {detailsEvent.filePath}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">Size:</span>
                      <span>{detailsEvent.fileSize}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg md:col-span-2"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Layers className="w-4 h-4" style={{ color: "#123458" }} />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#123458" }}
                    >
                      Versions
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                      Original: {detailsEvent.originalVersion}
                    </span>
                    <span
                      className={`font-mono px-2 py-1 rounded ${
                        detailsEvent.driftedVersion === "missing"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      Drifted: {detailsEvent.driftedVersion}
                    </span>
                    {detailsEvent.restoredVersion && (
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Restored: {detailsEvent.restoredVersion}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {detailsTab === "checksums" && (
              <div className="space-y-3">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div
                    className="text-sm font-medium mb-2"
                    style={{ color: "#123458" }}
                  >
                    Original Checksum
                  </div>
                  <p className="font-mono text-xs p-2 bg-white rounded break-all">
                    {detailsEvent.checksum.original}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F1EFEC" }}
                >
                  <div
                    className="text-sm font-medium mb-2"
                    style={{ color: "#123458" }}
                  >
                    Drifted Checksum
                  </div>
                  <p className="font-mono text-xs p-2 bg-white rounded break-all">
                    {detailsEvent.checksum.drifted}
                  </p>
                </div>
                {detailsEvent.checksum.restored && (
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "#F1EFEC" }}
                  >
                    <div
                      className="text-sm font-medium mb-2"
                      style={{ color: "#123458" }}
                    >
                      Restored Checksum
                    </div>
                    <p className="font-mono text-xs p-2 bg-white rounded break-all">
                      {detailsEvent.checksum.restored}
                    </p>
                  </div>
                )}
              </div>
            )}
            {detailsTab === "audit" && (
              <div className="space-y-2">
                {detailsEvent.auditLog.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3 rounded-lg"
                    style={{ backgroundColor: "#F1EFEC" }}
                  >
                    <History
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#123458" }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#123458" }}
                        >
                          {log.action}
                        </span>
                        <span
                          className="text-xs opacity-60"
                          style={{ color: "#123458" }}
                        >
                          {log.time}
                        </span>
                      </div>
                      <span
                        className="text-xs opacity-60"
                        style={{ color: "#123458" }}
                      >
                        By: {log.user}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {detailsTab === "related" && (
              <div className="space-y-3">
                {detailsEvent.relatedEvents.length > 0 ? (
                  detailsEvent.relatedEvents.map((id, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{ backgroundColor: "#F1EFEC" }}
                    >
                      <span
                        className="font-mono text-sm"
                        style={{ color: "#123458" }}
                      >
                        {id}
                      </span>
                      <button
                        onClick={() => {
                          const ev = driftFlowData.find((e) => e.id === id);
                          if (ev) {
                            setDetailsEvent(ev);
                            setDetailsTab("overview");
                          }
                        }}
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
                      >
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <p
                    className="text-sm opacity-60 text-center py-4"
                    style={{ color: "#123458" }}
                  >
                    No related events
                  </p>
                )}
              </div>
            )}
            {detailsEvent.status === "pending" && (
              <div
                className="flex justify-end pt-4 border-t"
                style={{ borderColor: "#D4C9BE" }}
              >
                <button
                  onClick={() => {
                    handleRestoreEvent(detailsEvent.id);
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Restore Now
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Configuration"
      >
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#123458" }}
            >
              Sensitivity
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              style={{ borderColor: "#D4C9BE" }}
              value={configSettings.sensitivity}
              onChange={(e) =>
                setConfigSettings({
                  ...configSettings,
                  sensitivity: e.target.value,
                })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={configSettings.autoRestoreConfig}
                onChange={(e) =>
                  setConfigSettings({
                    ...configSettings,
                    autoRestoreConfig: e.target.checked,
                  })
                }
              />
              <span className="text-sm" style={{ color: "#123458" }}>
                Auto-restore config files
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={configSettings.autoRestoreBinary}
                onChange={(e) =>
                  setConfigSettings({
                    ...configSettings,
                    autoRestoreBinary: e.target.checked,
                  })
                }
              />
              <span className="text-sm" style={{ color: "#123458" }}>
                Auto-restore binaries
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={configSettings.createBackup}
                onChange={(e) =>
                  setConfigSettings({
                    ...configSettings,
                    createBackup: e.target.checked,
                  })
                }
              />
              <span className="text-sm" style={{ color: "#123458" }}>
                Create backup before restore
              </span>
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowConfigModal(false);
                showToast("Saved", "success");
              }}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        title="Bulk Restore"
      >
        <div className="space-y-4">
          <p style={{ color: "#123458" }}>
            Restore {driftFlowData.filter((d) => d.status === "pending").length}{" "}
            pending event(s)?
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowRestoreModal(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={confirmBulkRestore}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Restore All
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {["json", "csv"].map((f) => (
              <label
                key={f}
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  exportFormat === f ? "border-2" : ""
                }`}
                style={{
                  borderColor: exportFormat === f ? "#123458" : "#D4C9BE",
                }}
              >
                <input
                  type="radio"
                  name="format"
                  value={f}
                  checked={exportFormat === f}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <span
                  className="uppercase text-sm font-medium"
                  style={{ color: "#123458" }}
                >
                  {f}
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={confirmExport}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Export
            </button>
          </div>
        </div>
      </Modal>

      {/* Merge Modal */}
      <Modal
        isOpen={showMergeModal}
        onClose={() => setShowMergeModal(false)}
        title={`Merge Changes on ${selectedDevice?.name || "Device"}`}
      >
        <div className="space-y-4">
          {/* Target Branch */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#123458" }}
            >
              Target Branch
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              style={{ borderColor: "#D4C9BE" }}
              value={mergeOptions.targetBranch}
              onChange={(e) =>
                setMergeOptions({
                  ...mergeOptions,
                  targetBranch: e.target.value,
                })
              }
            >
              <option value="main">main</option>
              <option value="production">production</option>
              <option value="staging">staging</option>
            </select>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={mergeOptions.createBackup}
                onChange={(e) =>
                  setMergeOptions({
                    ...mergeOptions,
                    createBackup: e.target.checked,
                  })
                }
              />
              <span className="text-sm" style={{ color: "#123458" }}>
                Create backup
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={mergeOptions.autoResolveConflicts}
                onChange={(e) =>
                  setMergeOptions({
                    ...mergeOptions,
                    autoResolveConflicts: e.target.checked,
                  })
                }
              />
              <span className="text-sm" style={{ color: "#123458" }}>
                Auto-resolve conflicts
              </span>
            </label>
          </div>

          {/* Device Name */}
          <div className="text-sm font-medium" style={{ color: "#123458" }}>
            Device: <strong>{selectedDevice?.name || "-"}</strong>
          </div>

          {/* Summary of changes */}
          <div className="border p-3 rounded-lg max-h-60 overflow-y-auto bg-gray-50">
            {mergeDetails.map((file, idx) => (
              <div key={idx} className="flex justify-between py-1">
                <span style={{ color: "#123458" }}>{file.file}</span>
                <span>
                  <div className="flex space-x-2 text-sm font-medium">
                    <span className="px-2 py-1 rounded text-green-700 bg-green-100">
                      +{file.added}
                    </span>
                    <span className="px-2 py-1 rounded text-red-700 bg-red-100">
                      -{file.removed}
                    </span>
                  </div>
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowMergeModal(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfirmMerge(true)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Merge
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmMerge}
        onClose={() => setShowConfirmMerge(false)}
        title="Confirm Merge"
      >
        <div className="space-y-4">
          <p style={{ color: "#123458" }}>
            Are you sure you want to merge{" "}
            <strong>{mergeOptions.targetBranch}</strong> into{" "}
            <strong>{selectedDevice?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirmMerge(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={confirmMerge}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Confirm Merge
            </button>
          </div>
        </div>
      </Modal>

      {/* MAIN CREATE BRANCH MODAL */}
      <Modal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
        title="Create Branch"
      >
        <div className="space-y-4">
          {/* Device Section */}
          <div
            className="p-3 rounded-lg border"
            style={{ borderColor: "#D4C9BE" }}
          >
            <p className="text-sm font-semibold" style={{ color: "#123458" }}>
              Device:
            </p>
            <p className="text-sm">
              {selectedDevice?.name || "Unknown Device"}
            </p>

            {/* WILL FIX LATER WHEN CONNECT WITH BACKEND */}
            {/* {currentBranch && (
              <p className="text-sm mt-1">
                Current Branch:{" "}
                <strong>{selectedDevice?.currentBranch || "main"}</strong>
              </p>
            )} */}
            <p className="text-sm mt-1">
              Current Branch:{" "}
              <strong>{selectedDevice?.currentBranch || "main"}</strong>
            </p>
          </div>

          {/* BRANCH NAME */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#123458" }}
            >
              Branch Name *
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              style={{ borderColor: "#D4C9BE" }}
              placeholder="feature/new-config"
              value={branchOptions.branchName}
              onChange={(e) =>
                setBranchOptions({
                  ...branchOptions,
                  branchName: e.target.value,
                })
              }
            />
            {branchError && (
              <p className="text-red-600 text-xs mt-1">{branchError}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#123458" }}
            >
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              style={{ borderColor: "#D4C9BE" }}
              rows={2}
              value={branchOptions.description}
              onChange={(e) =>
                setBranchOptions({
                  ...branchOptions,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* BASE BRANCH */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#123458" }}
            >
              Base Branch
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              style={{ borderColor: "#D4C9BE" }}
              value={branchOptions.baseBranch}
              onChange={(e) =>
                setBranchOptions({
                  ...branchOptions,
                  baseBranch: e.target.value,
                })
              }
            >
              <option value="main">main</option>
              <option value="production">production</option>
              <option value="staging">staging</option>
            </select>

            {/* Base branch info */}
            <p className="text-xs mt-1 italic">
              Last updated: 2 hrs ago • Safe to branch
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowBranchModal(false);
                resetBranchOptions();
              }}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
            >
              Cancel
            </button>
            <button
              onClick={openConfirmation}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>

      {/* CONFIRMATION MODAL */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Branch Creation"
      >
        <div className="space-y-4">
          <div
            className="p-3 rounded-lg border"
            style={{ borderColor: "#D4C9BE" }}
          >
            <p className="text-sm">
              <strong>Device:</strong> {selectedDevice?.name}
            </p>
            <p className="text-sm">
              <strong>Branch Name:</strong> {branchOptions.branchName}
            </p>
            <p className="text-sm">
              <strong>Base Branch:</strong> {branchOptions.baseBranch}
            </p>
            {branchOptions.description && (
              <p className="text-sm mt-2">
                <strong>Description:</strong> {branchOptions.description}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#D4C9BE", color: "#123458" }}
              onClick={() => setShowConfirmModal(false)}
            >
              Back
            </button>
            <button
              onClick={confirmBranch}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              Create Branch
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DriftManagement;
