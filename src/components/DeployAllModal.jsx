import { useState } from "react";
import Modal from "./Modal"; // your existing Modal component

const DeployAllModal = ({ isOpen, onClose, devices, showToast }) => {
  const [step, setStep] = useState(1);

  const totalDevices = devices.length;
  const devicesWithPatches = devices.filter((d) => d.patches > 0).length;
  const requiresReboot = devices.filter((d) => d.requiresReboot).length;
  const offlineDevices = devices.filter((d) => !d.online).length;

  const totalPatches = devices.reduce((sum, d) => sum + d.patches, 0);
  const criticalPatches = devices.reduce(
    (sum, d) => sum + (d.criticalPatches || 0),
    0
  );

  const handleDeploy = () => {
    onClose();
    showToast("Deploying patches to all devices...", "info");

    setTimeout(() => {
      showToast("Patch deployment initiated successfully", "success");
    }, 1500);
  };

  const stepLabels = ["Review", "Strategy", "Confirm"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deploy All Patches"
      size="lg"
    >
      {/* Step Progress */}
      <div className="flex justify-between items-center mb-4">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                step === index + 1
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center">{label}</span>
            {index < stepLabels.length - 1 && (
              <div
                className={`absolute top-3 left-1/2 w-full h-1 ${
                  step > index + 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
                style={{ zIndex: -1 }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-6 text-gray-900">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h3 className="font-semibold text-gray-800">
              Devices & Patch Summary
            </h3>
            <ul className="text-sm space-y-1">
              <li>Total Devices: {totalDevices}</li>
              <li>Devices with Pending Patches: {devicesWithPatches}</li>
              <li>Devices Requiring Reboot: {requiresReboot}</li>
              <li>Offline Devices (Will Retry): {offlineDevices}</li>
              <li>Total Patches: {totalPatches}</li>
              <li>Critical Patches: {criticalPatches}</li>
              <li>Estimated Deployment Time: ~3–7 mins</li>
            </ul>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h3 className="font-semibold text-gray-800">Deployment Strategy</h3>
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="strategy" defaultChecked />
                Immediate Deployment
              </label>
              <label className="flex items-center gap-2 opacity-60">
                <input type="radio" name="strategy" disabled />
                Schedule Deployment (Coming Soon)
              </label>
              <label className="flex items-center gap-2 opacity-60">
                <input type="radio" name="strategy" disabled />
                Staggered Rollout (Coming Soon)
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h3 className="font-semibold text-gray-800">Final Confirmation</h3>
            <div className="bg-yellow-50 p-3 rounded-lg text-sm border border-yellow-200">
              <strong>Warning:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Deployment may cause temporary service interruptions.</li>
                <li>
                  Restore points will be created automatically where supported.
                </li>
                <li>Offline devices will retry deployment automatically.</li>
                <li>Some devices may require a reboot after patching.</li>
              </ul>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleDeploy}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Confirm & Deploy
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DeployAllModal;
