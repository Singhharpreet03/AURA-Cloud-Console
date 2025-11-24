import React, { useState } from "react";
import {
  Shield,
  Database,
  Copy,
  CheckCircle,
  ExternalLink,
  Settings,
  FileText,
} from "lucide-react";

const Integrations = () => {
  const [showWebhook, setShowWebhook] = useState(false);
  const [copied, setCopied] = useState(false);

  const webhookUrl =
    "https://787987798bqhjcbxhjbdd78bdiw.company.aura.com";

  const handleCopyWebhook = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleInitialize = () => {
    setShowWebhook(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1EFEC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#123458" }}>
            Third Party Integrations
          </h1>
          <p className="mt-2 opacity-70" style={{ color: "#123458" }}>
            Connect AURA with your existing security and monitoring tools
          </p>
        </div>

        {/* Security Integrations */}
        <div className="mb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#123458" }}
          >
            Security Integrations
          </h2>

          <div
            className="rounded-xl shadow-sm"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {/* Crowdstrike Integration */}
            <div className="p-6 border-b" style={{ borderColor: "#D4C9BE" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F1EFEC" }}
                  >
                    <Shield className="w-6 h-6" style={{ color: "#123458" }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "#123458" }}
                    >
                      Crowdstrike
                    </h3>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Endpoint protection and threat intelligence platform
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "#F1EFEC",
                    color: "#123458",
                    border: "1px solid #D4C9BE",
                  }}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  View Documentation
                </button>
              </div>

              {/* Webhook Configuration Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold" style={{ color: "#123458" }}>
                    Webhook Configuration
                  </h4>
                  {!showWebhook && (
                    <button
                      onClick={handleInitialize}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
                    >
                      Initialize
                    </button>
                  )}
                </div>

                {showWebhook && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <h5
                        className="text-sm font-medium mb-2"
                        style={{ color: "#123458" }}
                      >
                        Instructions
                      </h5>
                      <ul className="space-y-2">
                        <li
                          className="flex items-start space-x-2 text-sm"
                          style={{ color: "#123458" }}
                        >
                          <span className="opacity-60">•</span>
                          <span className="opacity-70">Create webhook</span>
                        </li>
                        <li
                          className="flex items-start space-x-2 text-sm"
                          style={{ color: "#123458" }}
                        >
                          <span className="opacity-60">•</span>
                          <span className="opacity-70">
                            Create SOAR fusion workflow to send endpoint
                            detections
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#123458" }}
                      >
                        Webhook Link
                      </label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="flex-1 flex items-center justify-between px-4 py-3 rounded-lg border font-mono text-sm"
                          style={{
                            backgroundColor: "#F1EFEC",
                            borderColor: "#D4C9BE",
                            color: "#123458",
                          }}
                        >
                          <span className="truncate">{webhookUrl}</span>
                          <button
                            onClick={handleCopyWebhook}
                            className="ml-3 p-1 hover:opacity-70 transition-opacity"
                            title="Copy to clipboard"
                          >
                            {copied ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy
                                className="w-5 h-5"
                                style={{ color: "#123458" }}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: "#F1EFEC",
                        border: "1px solid #D4C9BE",
                      }}
                    >
                      <p className="text-sm" style={{ color: "#123458" }}>
                        <strong>Note:</strong> After configuring the webhook in
                        Crowdstrike, endpoint detection events will be
                        automatically forwarded to AURA for analysis and
                        automated response.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Integrations */}
        <div className="mb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#123458" }}
          >
            Monitoring Integrations
          </h2>

          <div
            className="rounded-xl shadow-sm"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            {/* Datadog Integration */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F1EFEC" }}
                  >
                    <Database
                      className="w-6 h-6"
                      style={{ color: "#123458" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "#123458" }}
                    >
                      Datadog
                    </h3>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Infrastructure monitoring and analytics platform
                    </p>
                    <p
                      className="text-sm mt-3 opacity-70"
                      style={{ color: "#123458" }}
                    >
                      Configure Datadog integration to send infrastructure
                      metrics and logs to AURA for unified monitoring.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
                >
                  Configure Integration
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "#F1EFEC",
                    color: "#123458",
                    border: "1px solid #D4C9BE",
                  }}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div
          className="rounded-xl shadow-sm"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="p-6 border-b" style={{ borderColor: "#D4C9BE" }}>
            <h3 className="text-lg font-semibold" style={{ color: "#123458" }}>
              Need help with integrations?
            </h3>
            <p className="text-sm mt-2 opacity-70" style={{ color: "#123458" }}>
              Visit our documentation portal or contact support for assistance
              with setting up third-party integrations.
            </p>
          </div>
          <div className="p-6 flex space-x-3">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{ backgroundColor: "#123458", color: "#F1EFEC" }}
            >
              View Documentation
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: "#F1EFEC",
                color: "#123458",
                border: "1px solid #D4C9BE",
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Integrations;
