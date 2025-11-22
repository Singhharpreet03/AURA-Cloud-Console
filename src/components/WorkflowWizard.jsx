import React, { useState } from "react";
import {
  Bot,
  Terminal,
  FileText,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  Copy,
  Check,
} from "lucide-react";

const WorkflowWizard = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workflowData, setWorkflowData] = useState({
    name: "",
    type: "Custom",
    patches: 0,
    devices: 0,
    schedule: "Manual",
    scriptType: "ai", // 'ai' or 'manual'
    aiPrompt: "",
    generatedScript: "",
    executionMode: "auto", // 'auto' or 'manual'
    password: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: "Workflow Details", icon: FileText },
    { number: 2, title: "Script Selection", icon: Bot },
    { number: 3, title: "Script Generation", icon: Sparkles },
    { number: 4, title: "Execution Setup", icon: Terminal },
    { number: 5, title: "Review & Confirm", icon: CheckCircle },
  ];

  if (!isOpen) return null;

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!workflowData.name.trim()) {
          newErrors.name = "Workflow name is required";
        }
        if (workflowData.patches < 1) {
          newErrors.patches = "At least 1 patch must be selected";
        }
        if (workflowData.devices < 1) {
          newErrors.devices = "At least 1 device must be selected";
        }
        break;
      case 2:
        // No validation needed - just selection
        break;
      case 3:
        if (workflowData.scriptType === "ai" && !workflowData.aiPrompt.trim()) {
          newErrors.aiPrompt = "Please enter a prompt for the AI";
        }
        if (!workflowData.generatedScript) {
          newErrors.generatedScript = "Please generate or review the script";
        }
        break;
      case 4:
        if (workflowData.executionMode === "auto" && !workflowData.password) {
          newErrors.password = "Password is required for auto-run";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleGenerateScript = async () => {
    if (!workflowData.aiPrompt.trim()) {
      setErrors({ aiPrompt: "Please enter a prompt" });
      return;
    }

    setIsGenerating(true);
    setErrors({});

    // Simulate AI generation
    setTimeout(() => {
      const generatedScript = `#!/bin/bash
# AI-Generated Workflow Script
# Prompt: ${workflowData.aiPrompt}
# Generated: ${new Date().toLocaleString()}

echo "Starting workflow: ${workflowData.name}"

# Pre-deployment checks
echo "Running pre-deployment checks..."
check_system_health() {
  systemctl status sshd
  df -h | grep -v tmpfs
  free -m
}

# Patch deployment
deploy_patches() {
  echo "Deploying ${workflowData.patches} patches to ${
        workflowData.devices
      } devices..."
  
  for patch in patch_list; do
    echo "Installing patch: $patch"
    # Add patch installation logic here
    apt-get update && apt-get install -y $patch
  done
}

# Post-deployment validation
validate_deployment() {
  echo "Validating deployment..."
  # Add validation logic here
}

# Main execution
check_system_health
deploy_patches
validate_deployment

echo "Workflow completed successfully!"`;

      setWorkflowData({ ...workflowData, generatedScript });
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(workflowData.generatedScript);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      onComplete(workflowData);
      // Reset form
      setCurrentStep(1);
      setWorkflowData({
        name: "",
        type: "Custom",
        patches: 0,
        devices: 0,
        schedule: "Manual",
        scriptType: "ai",
        aiPrompt: "",
        generatedScript: "",
        executionMode: "auto",
        password: "",
      });
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                Workflow Name *
              </label>
              <input
                type="text"
                value={workflowData.name}
                onChange={(e) =>
                  setWorkflowData({ ...workflowData, name: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Monthly Security Updates"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Workflow Type
                </label>
                <select
                  value={workflowData.type}
                  onChange={(e) =>
                    setWorkflowData({ ...workflowData, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Predefined">Predefined</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Schedule
                </label>
                <select
                  value={workflowData.schedule}
                  onChange={(e) =>
                    setWorkflowData({
                      ...workflowData,
                      schedule: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Manual">Manual</option>
                  <option value="Daily - 2:00 AM">Daily - 2:00 AM</option>
                  <option value="Weekly - Sunday 2:00 AM">
                    Weekly - Sunday 2:00 AM
                  </option>
                  <option value="Monthly - 1st Sunday">
                    Monthly - 1st Sunday
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Number of Patches *
                </label>
                <input
                  type="number"
                  min="1"
                  value={workflowData.patches}
                  onChange={(e) =>
                    setWorkflowData({
                      ...workflowData,
                      patches: parseInt(e.target.value) || 0,
                    })
                  }
                  className={`w-full p-3 border rounded-lg ${
                    errors.patches ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                />
                {errors.patches && (
                  <p className="mt-1 text-sm text-red-600">{errors.patches}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Target Devices *
                </label>
                <input
                  type="number"
                  min="1"
                  value={workflowData.devices}
                  onChange={(e) =>
                    setWorkflowData({
                      ...workflowData,
                      devices: parseInt(e.target.value) || 0,
                    })
                  }
                  className={`w-full p-3 border rounded-lg ${
                    errors.devices ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                />
                {errors.devices && (
                  <p className="mt-1 text-sm text-red-600">{errors.devices}</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  You'll be able to configure the deployment script in the next
                  steps using AI assistance or manual scripting.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Choose how you want to create the deployment script for this
              workflow:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setWorkflowData({ ...workflowData, scriptType: "ai" })
                }
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  workflowData.scriptType === "ai"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Bot className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      AI-Generated Script
                    </h4>
                    <p className="text-xs text-gray-500">Recommended</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Describe what you want to accomplish, and the AI will generate
                  an optimized deployment script for you.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li>✓ Natural language prompts</li>
                  <li>✓ Best practices included</li>
                  <li>✓ Error handling built-in</li>
                </ul>
              </button>

              <button
                onClick={() =>
                  setWorkflowData({ ...workflowData, scriptType: "manual" })
                }
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  workflowData.scriptType === "manual"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Terminal className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Manual Script
                    </h4>
                    <p className="text-xs text-gray-500">Advanced</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Write your own custom deployment script with full control over
                  every command.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li>✓ Complete control</li>
                  <li>✓ Custom logic</li>
                  <li>✓ Use existing scripts</li>
                </ul>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {workflowData.scriptType === "ai" ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Describe Your Workflow *
                  </label>
                  <textarea
                    value={workflowData.aiPrompt}
                    onChange={(e) =>
                      setWorkflowData({
                        ...workflowData,
                        aiPrompt: e.target.value,
                      })
                    }
                    className={`w-full p-3 border rounded-lg h-32 ${
                      errors.aiPrompt ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Example: Create a workflow that deploys security patches to all Windows servers, checks for successful installation, and sends a notification. Include rollback capability if any errors occur."
                  />
                  {errors.aiPrompt && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.aiPrompt}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleGenerateScript}
                  disabled={isGenerating}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Generating Script...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Enter Your Script *
                </label>
                <textarea
                  value={workflowData.generatedScript}
                  onChange={(e) =>
                    setWorkflowData({
                      ...workflowData,
                      generatedScript: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg h-64 font-mono text-sm"
                  placeholder="#!/bin/bash&#10;# Your deployment script here..."
                />
              </div>
            )}

            {workflowData.generatedScript && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Generated Script
                  </label>
                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1"
                  >
                    {scriptCopied ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono max-h-64 overflow-y-auto">
                  {workflowData.generatedScript}
                </pre>
                {errors.generatedScript && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.generatedScript}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Choose how you want to execute this workflow:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setWorkflowData({ ...workflowData, executionMode: "auto" })
                }
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  workflowData.executionMode === "auto"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Bot className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Auto-Run (Agent)
                    </h4>
                    <p className="text-xs text-gray-500">Recommended</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  The AI agent will execute the script automatically based on
                  your schedule.
                </p>
              </button>

              <button
                onClick={() =>
                  setWorkflowData({ ...workflowData, executionMode: "manual" })
                }
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  workflowData.executionMode === "manual"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Terminal className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Manual Execution
                    </h4>
                    <p className="text-xs text-gray-500">Advanced</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  You'll manually trigger the workflow execution when needed.
                </p>
              </button>
            </div>

            {workflowData.executionMode === "auto" && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-yellow-900 mb-1">
                      Security Authentication Required
                    </h5>
                    <p className="text-sm text-yellow-800">
                      To enable auto-run, please enter your admin password. This
                      ensures secure automated execution.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Admin Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={workflowData.password}
                      onChange={(e) =>
                        setWorkflowData({
                          ...workflowData,
                          password: e.target.value,
                        })
                      }
                      className={`w-full p-3 border rounded-lg pr-10 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your admin password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  Ready to Create Workflow
                </h4>
              </div>
              <p className="text-sm text-green-800">
                Review your workflow details below and confirm to create.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-3">
                  Workflow Details
                </h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.type}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Patches:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.patches}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Devices:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.devices}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Schedule:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.schedule}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-3">
                  Script Configuration
                </h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Script Type:</span>
                    <p className="font-medium text-gray-900">
                      {workflowData.scriptType === "ai"
                        ? "AI-Generated"
                        : "Manual"}
                    </p>
                  </div>
                  {workflowData.scriptType === "ai" && (
                    <div>
                      <span className="text-gray-600">AI Prompt:</span>
                      <p className="text-gray-900 text-xs mt-1 p-2 bg-white rounded border border-gray-200">
                        {workflowData.aiPrompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-3">
                  Execution Mode
                </h5>
                <div className="flex items-center space-x-2">
                  {workflowData.executionMode === "auto" ? (
                    <>
                      <Bot className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">
                        Auto-Run with AI Agent
                      </span>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Authenticated
                      </span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-900">Manual Execution</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Once created, this workflow will be saved and{" "}
                  {workflowData.executionMode === "auto"
                    ? "the AI agent will execute it based on your schedule"
                    : "you can manually trigger it from the workflows dashboard"}
                  .
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-xl shadow-xl transition-all bg-white max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Workflow
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step.number < currentStep
                          ? "bg-green-600 text-white"
                          : step.number === currentStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium text-center max-w-20 ${
                        step.number <= currentStep
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-colors ${
                        step.number < currentStep
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button
                onClick={currentStep === 1 ? onClose : handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{currentStep === 1 ? "Cancel" : "Back"}</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Create Workflow</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowWizard;
