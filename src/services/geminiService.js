// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const generateScriptUsingGemini = async (patch) => {
//   try {
//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//     console.log("Gemini API Key:", apiKey); // <- confirm key is loaded
//     if (!apiKey) throw new Error("Gemini API key not found");

//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `
// You are an expert systems engineer.
// Generate 2 scripts for the following patch:

// Patch ID: ${patch.id}
// Patch Name: ${patch.name}
// Type: ${patch.type}
// Severity: ${patch.severity}
// Size: ${patch.size}
// Description: ${patch.description}
// Requires Restart: ${patch.requiresRestart}

// Return output ONLY in JSON format:
// {
//   "automated": "<full automated script>",
//   "manual": "<full manual instructions>"
// }
// `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     console.log("Gemini result text:", text); // <- debug

//     return JSON.parse(text);
//   } catch (err) {
//     console.error("Gemini Script Error:", err);
//     return {
//       automated: "# Unable to generate script via Gemini",
//       manual: "# Unable to generate manual steps",
//     };
//   }
// };
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
// In Vite, use import.meta.env instead of process.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ VITE_GEMINI_API_KEY is not set in .env file");
  console.log(
    "Please create a .env file with: VITE_GEMINI_API_KEY=your_api_key_here"
  );
}

const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Generate patch installation scripts using Gemini AI
 * @param {Object} patch - The patch object containing details
 * @returns {Promise<Object>} - Object with automated and manual scripts
 */
export const generateScriptUsingGemini = async (patch) => {
  try {
    console.log("Generating script for patch:", patch.id);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a detailed prompt based on patch information
    const prompt = `Generate two scripts for installing the following software patch:

Patch Details:
- ID: ${patch.id}
- Name: ${patch.name}
- Type: ${patch.type}
- Severity: ${patch.severity}
- Size: ${patch.size}
- Description: ${patch.description}
- Requires Restart: ${patch.requiresRestart ? "Yes" : "No"}
- Release Date: ${patch.releaseDate}

Please provide:
1. An AUTOMATED script that can be run without user intervention
2. A MANUAL step-by-step guide for users who prefer manual installation

For the automated script:
- Include error handling
- Add logging statements
- Handle service restarts if needed
- Create backups where appropriate
- Be platform-appropriate (Windows PowerShell, Linux Bash, etc.)

For the manual script:
- Provide clear, numbered steps
- Include verification commands
- Mention prerequisites
- Add troubleshooting tips

Format your response EXACTLY as follows (keep the markers):
===AUTOMATED_SCRIPT_START===
[automated script here]
===AUTOMATED_SCRIPT_END===

===MANUAL_SCRIPT_START===
[manual steps here]
===MANUAL_SCRIPT_END===`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw Gemini response received");

    // Parse the response to extract automated and manual scripts
    const automatedMatch = text.match(
      /===AUTOMATED_SCRIPT_START===([\s\S]*?)===AUTOMATED_SCRIPT_END===/
    );
    const manualMatch = text.match(
      /===MANUAL_SCRIPT_START===([\s\S]*?)===MANUAL_SCRIPT_END===/
    );

    const automatedScript = automatedMatch
      ? automatedMatch[1].trim()
      : generateFallbackAutomatedScript(patch);

    const manualScript = manualMatch
      ? manualMatch[1].trim()
      : generateFallbackManualScript(patch);

    console.log("Scripts generated successfully");

    return {
      automated: automatedScript,
      manual: manualScript,
    };
  } catch (error) {
    console.error("Error generating script with Gemini:", error);

    // Return fallback scripts if AI generation fails
    return {
      automated: generateFallbackAutomatedScript(patch),
      manual: generateFallbackManualScript(patch),
    };
  }
};

/**
 * Generate a fallback automated script if Gemini fails
 */
function generateFallbackAutomatedScript(patch) {
  // Determine script type based on patch ID or type
  if (patch.id.startsWith("KB") || patch.type === "Security") {
    return `# Windows Update Installation Script
# Patch: ${patch.name}

Write-Host "Installing ${patch.name}..." -ForegroundColor Cyan

try {
    # Download patch
    Write-Host "Downloading patch..." -ForegroundColor Yellow
    $patchFile = "$env:TEMP\\${patch.id}.msu"
    
    # Install patch silently
    Write-Host "Installing patch..." -ForegroundColor Yellow
    Start-Process -FilePath "wusa.exe" -ArgumentList "$patchFile /quiet /norestart" -Wait -NoNewWindow
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Patch installed successfully!" -ForegroundColor Green
        ${
          patch.requiresRestart
            ? `
        # Schedule restart
        Write-Host "Scheduling restart..." -ForegroundColor Yellow
        shutdown /r /t 7200 /c "Security update requires restart"`
            : ""
        }
    } else {
        Write-Error "Patch installation failed with code: $LASTEXITCODE"
    }
} catch {
    Write-Error "Error during patch installation: $_"
}`;
  } else if (patch.type === "Installation") {
    return `# Software Installation Script
# Application: ${patch.name}

echo "Installing ${patch.name}..."

# Download installer
echo "Downloading installer..."
INSTALLER="/tmp/${patch.id}_installer"

# Run installation
echo "Running installer..."
# Add installation commands here based on your environment

echo "Installation complete!"
${
  patch.requiresRestart
    ? 'echo "Please restart your system to complete installation"'
    : ""
}`;
  } else {
    return `# Update/Upgrade Script
# ${patch.name}

echo "Updating ${patch.name}..."

# Create backup
echo "Creating backup..."
# Add backup commands

# Stop service if running
echo "Stopping services..."
# Add service stop commands

# Update software
echo "Installing update..."
# Add update commands

# Start service
echo "Starting services..."
# Add service start commands

echo "Update complete!"`;
  }
}

/**
 * Generate a fallback manual script if Gemini fails
 */
function generateFallbackManualScript(patch) {
  if (patch.id.startsWith("KB") || patch.type === "Security") {
    return `# Manual Installation Steps for ${patch.name}

**Prerequisites:**
- Administrator access required
- Ensure system is backed up

**Steps:**

1. **Download the patch**
   - Visit Windows Update Catalog
   - Search for ${patch.id}
   - Download the appropriate version for your system

2. **Install the patch**
   - Double-click the downloaded .msu file
   - Follow the Windows Update Standalone Installer wizard
   - Accept the license agreement
   - Wait for installation to complete

3. **Verify installation**
   - Open Settings → Update & Security → Windows Update
   - Click "View update history"
   - Confirm ${patch.id} is listed as installed

${
  patch.requiresRestart
    ? `
4. **Restart your computer**
   - Save all work
   - Restart your computer to complete the installation
`
    : ""
}

**Troubleshooting:**
- If installation fails, check Windows Update logs
- Ensure no other updates are in progress
- Try running Windows Update Troubleshooter`;
  } else {
    return `# Manual Installation Steps for ${patch.name}

**Prerequisites:**
- Verify system requirements
- Backup your data
- Close all related applications

**Installation Steps:**

1. **Preparation**
   - Download ${patch.name} (${patch.size})
   - Verify download integrity
   - Read release notes

2. **Installation**
   - Run the installer
   - Follow on-screen instructions
   - Choose appropriate installation options

3. **Configuration**
   - Configure settings as needed
   - Apply recommended security settings

4. **Verification**
   - Verify installation completed successfully
   - Test basic functionality
   - Check version number

${
  patch.requiresRestart
    ? `
5. **Restart**
   - Restart your system if prompted
   - Verify application starts correctly after restart
`
    : ""
}

**Troubleshooting:**
- Check system logs for errors
- Verify all dependencies are installed
- Consult vendor documentation if issues persist`;
  }
}

/**
 * Test the Gemini API connection
 */
export const testGeminiConnection = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say hello!");
    const response = await result.response;
    const text = response.text();
    console.log("Gemini connection successful:", text);
    return { success: true, message: text };
  } catch (error) {
    console.error("Gemini connection failed:", error);
    return { success: false, error: error.message };
  }
};
