import React, { useState } from "react";
import {
  Terminal,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Globe,
  HardDrive,
  Apple,
  Monitor,
  Clock,
  BadgeInfo,
  Settings,
} from "lucide-react";
import { BookOpenText } from "lucide-react";
const Installation = () => {
  const [selectedOS, setSelectedOS] = useState("linux");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const osOptions = [
    {
      id: "linux",
      name: "Linux",
      icon: <Monitor className="w-5 h-5" />,
      available: true,
      description: "Ubuntu, Debian, CentOS, RHEL, Fedora",
    },
    {
      id: "windows",
      name: "Windows",
      icon: <Monitor className="w-5 h-5" />,
      available: false,
      description: "Windows Server 2016+, Windows 10/11",
    },
    {
      id: "macos",
      name: "macOS",
      icon: <Apple className="w-5 h-5" />,
      available: false,
      description: "macOS 11 (Big Sur) and later",
    },
  ];

  const linuxCommands = [
    {
      title: "Download AURA Agent",
      command:
        "curl -fsSL https://install.aura-agent.io/install.sh -o install-aura.sh",
      description: "Downloads the installation script",
    },
    {
      title: "Make Script Executable",
      command: "chmod +x install-aura.sh",
      description: "Grants execution permissions",
    },
    {
      title: "Run Installation",
      command: "sudo ./install-aura.sh --token YOUR_TOKEN_HERE",
      description: "Installs and configures AURA agent",
    },
  ];

  const requirements = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Root/Sudo Access",
      description:
        "The installation script requires sudo permissions to install the agent and configure system services.",
      type: "required",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Internet Access",
      description:
        "Agent needs outbound HTTPS (443) access to communicate with AURA management servers.",
      type: "required",
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      title: "System Resources",
      description:
        "Minimum 512MB RAM and 1GB disk space. Agent footprint is typically <100MB.",
      type: "recommended",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Air-Gapped Installation",
      description:
        "Installation for environments without internet access is currently in development.",
      type: "coming-soon",
    },
  ];

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getRequirementStyle = (type) => {
    switch (type) {
      case "required":
        return "border-red-200 bg-red-50";
      case "recommended":
        return "border-blue-200 bg-blue-50";
      case "coming-soon":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getRequirementBadge = (type) => {
    switch (type) {
      case "required":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            Required
          </span>
        );
      case "recommended":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Recommended
          </span>
        );
      case "coming-soon":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Coming Soon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      style={{ backgroundColor: "#F1EFEC" }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#123458" }}>
          Install AURA Agent
        </h1>
        <p className="mt-2 opacity-70" style={{ color: "#123458" }}>
          Deploy the autonomous agent to start managing your IT infrastructure
        </p>
      </div>

      {/* OS Selection */}
      <div className="mb-8">
        <div
          className="rounded-xl shadow-sm"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
            <h3 className="text-lg font-semibold" style={{ color: "#123458" }}>
              Select Operating System
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {osOptions.map((os) => (
                <button
                  key={os.id}
                  onClick={() => os.available && setSelectedOS(os.id)}
                  disabled={!os.available}
                  className={`relative p-6 rounded-lg border-2 transition-all text-left ${
                    selectedOS === os.id
                      ? "border-2"
                      : "hover:border-opacity-50"
                  } ${
                    !os.available
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  style={{
                    borderColor: selectedOS === os.id ? "#123458" : "#D4C9BE",
                    backgroundColor:
                      selectedOS === os.id ? "#F1EFEC" : "#FFFFFF",
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div style={{ color: "#123458" }}>{os.icon}</div>
                    <h4
                      className="font-semibold text-lg"
                      style={{ color: "#123458" }}
                    >
                      {os.name}
                    </h4>
                  </div>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: "#123458" }}
                  >
                    {os.description}
                  </p>
                  {!os.available && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Installation Content */}
      {selectedOS === "linux" && (
        <>
          {/* Requirements */}
          <div className="mb-8">
            <div
              className="rounded-xl shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#123458" }}
                >
                  Requirements & Prerequisites
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${getRequirementStyle(
                        req.type
                      )}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div style={{ color: "#123458" }}>{req.icon}</div>
                          <h4
                            className="font-semibold"
                            style={{ color: "#123458" }}
                          >
                            {req.title}
                          </h4>
                        </div>
                        {getRequirementBadge(req.type)}
                      </div>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: "#123458" }}
                      >
                        {req.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="mb-8">
            <div
              className="rounded-xl shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#123458" }}
                >
                  Installation Commands
                </h3>
              </div>
              <div className="p-4 space-y-6">
                {linuxCommands.map((cmd, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4
                          className="font-semibold"
                          style={{ color: "#123458" }}
                        >
                          Step {index + 1}: {cmd.title}
                        </h4>
                        <p
                          className="text-sm opacity-70"
                          style={{ color: "#123458" }}
                        >
                          {cmd.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="p-4 rounded-lg font-mono text-sm overflow-x-auto"
                        style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Terminal className="w-4 h-4" />
                          <span className="text-xs opacity-70">Terminal</span>
                        </div>
                        <code className="block whitespace-pre">
                          {cmd.command}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopy(cmd.command, index)}
                        className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-opacity-20 hover:bg-white"
                        style={{ color: "#F1EFEC" }}
                        title="Copy command"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-8">
            <div
              className="rounded-xl shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
                <h3
                  className="text-lg font-semibold flex items-center space-x-2"
                  style={{ color: "#123458" }}
                >
                  <Info className="w-5 h-5" />
                  <span>Important Notes</span>
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "#F1EFEC", borderColor: "#D4C9BE" }}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#123458" }}
                    />
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "#123458" }}
                      >
                        Security Token Required
                      </h4>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: "#123458" }}
                      >
                        Replace{" "}
                        <code
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: "#D4C9BE" }}
                        >
                          YOUR_TOKEN_HERE
                        </code>{" "}
                        with your organization's authentication token from the
                        AURA dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "#F1EFEC", borderColor: "#D4C9BE" }}
                >
                  <div className="flex items-start space-x-3">
                    <Info
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#123458" }}
                    />
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "#123458" }}
                      >
                        Post-Installation
                      </h4>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: "#123458" }}
                      >
                        After successful installation, the agent will
                        automatically start and appear in your AURA dashboard
                        within 2-3 minutes. You can verify the installation
                        status using:{" "}
                        <code
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: "#D4C9BE" }}
                        >
                          sudo systemctl status aura-agent
                        </code>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "#F1EFEC", borderColor: "#D4C9BE" }}
                >
                  <div className="flex items-start space-x-3">
                    <Shield
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#123458" }}
                    />
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "#123458" }}
                      >
                        Firewall Configuration
                      </h4>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: "#123458" }}
                      >
                        Ensure outbound HTTPS traffic (port 443) to{" "}
                        <code
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: "#D4C9BE" }}
                        >
                          *.aura-agent.io
                        </code>{" "}
                        is allowed in your firewall rules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div
              className="rounded-xl shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="p-4 border-b" style={{ borderColor: "#D4C9BE" }}>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#123458" }}
                >
                  Next Steps
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-lg border"
                    style={{ borderColor: "#D4C9BE" }}
                  >
                    <h4
                      className="font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "#123458" }}
                    >
                      <BookOpenText className="w-4 h-4" />
                      Documentation
                    </h4>
                    <p
                      className="text-sm mb-3 opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Read the complete installation guide and troubleshooting
                      tips
                    </p>
                    <button
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: "#123458" }}
                    >
                      View Docs →
                    </button>
                  </div>

                  <div
                    className="p-4 rounded-lg border"
                    style={{ borderColor: "#D4C9BE" }}
                  >
                    <h4
                      className="font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "#123458" }}
                    >
                      <Settings className="w-4 h-4" />
                      Configuration
                    </h4>
                    <p
                      className="text-sm mb-3 opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Configure agent permissions and monitoring settings
                    </p>
                    <button
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: "#123458" }}
                    >
                      Configure →
                    </button>
                  </div>

                  <div
                    className="p-4 rounded-lg border"
                    style={{ borderColor: "#D4C9BE" }}
                  >
                    <h4
                      className="font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "#123458" }}
                    >
                      <BadgeInfo className="w-4 h-4" />
                      Support
                    </h4>
                    <p
                      className="text-sm mb-3 opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Get help from our support team or community
                    </p>
                    <button
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: "#123458" }}
                    >
                      Get Support →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Coming Soon for Windows and macOS */}
      {(selectedOS === "windows" || selectedOS === "macos") && (
        <div
          className="rounded-xl shadow-sm"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="p-8 text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: "#F1EFEC" }}
            >
              <Clock className="w-8 h-8" style={{ color: "#123458" }} />
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "#123458" }}
            >
              {selectedOS === "windows" ? "Windows" : "macOS"} Support Coming
              Soon
            </h3>
            <p className="text-lg opacity-70 mb-6" style={{ color: "#123458" }}>
              We're actively developing the AURA agent for{" "}
              {selectedOS === "windows" ? "Windows" : "macOS"} systems.
            </p>
            <div
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg"
              style={{ backgroundColor: "#F1EFEC" }}
            >
              <Info className="w-5 h-5" style={{ color: "#123458" }} />
              <span className="font-medium" style={{ color: "#123458" }}>
                Expected release: Q2 2024
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Installation;
