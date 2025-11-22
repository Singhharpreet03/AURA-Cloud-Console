# AURA - Autonomous Unified Resource Agent

<div align="center">

![AURA Logo](public/logo.jpg)

**Intelligent IT Infrastructure Management Powered by AI**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)

[Features](#features) • [Installation](#installation) • [Documentation](#documentation) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Core Modules](#core-modules)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

AURA (Autonomous Unified Resource Agent) is an enterprise-grade, AI-powered IT infrastructure management platform designed to automate patch management, monitor system resources, detect anomalies, and manage configuration drift with intelligent self-healing capabilities.

### Problem Statement

Modern IT infrastructure management faces several critical challenges:

- **Reactive Maintenance**: IT teams spend 70% of their time on reactive firefighting
- **Patch Management Complexity**: Manual patch deployment leads to security vulnerabilities
- **Configuration Drift**: Unauthorized changes go undetected until system failures occur
- **Resource Optimization**: Inefficient resource allocation causes performance bottlenecks
- **Alert Fatigue**: Teams are overwhelmed with false positives and noise

### Solution

AURA transforms IT operations from reactive to proactive through:

- **AI-Driven Automation**: Intelligent agents that reason, plan, and act autonomously
- **Predictive Analytics**: Machine learning models that detect anomalies before they become issues
- **Self-Healing Systems**: Automated remediation of common issues with audit trails
- **Git-Flow Configuration Management**: Version-controlled configuration with rollback capabilities
- **Unified Dashboard**: Single pane of glass for all IT operations

---

## ✨ Key Features

### 🔄 Patch Management

- **Automated Patch Deployment**: AI-driven patch scheduling and rollout
- **Intelligent Rollback**: Automatic rollback on deployment failures
- **Workflow Management**: Pre-defined and custom patch workflows
- **Compliance Tracking**: Audit trails for security and compliance requirements
- **Multi-OS Support**: Windows, Linux, and macOS (coming soon)

### 🚨 Intelligent Alerts

- **AI-Powered Anomaly Detection**: Machine learning-based behavioral baselines
- **Contextual Alerts**: Intelligent alerts with root cause analysis
- **Auto-Resolution**: AI agents can resolve common issues autonomously
- **Alert Prioritization**: Smart filtering to reduce alert fatigue
- **Integration Ready**: Connect with existing monitoring tools

### 📊 Resource Monitor

- **Real-Time Metrics**: Live monitoring of CPU, Memory, Disk, and Network
- **Predictive Analytics**: Forecast resource bottlenecks before they occur
- **Performance Baselines**: Learn normal behavior patterns for each application
- **Historical Analysis**: Trend analysis and capacity planning insights
- **Custom Dashboards**: Configurable views for different teams

### 🔀 Drift Management

- **Configuration Version Control**: Git-flow style configuration management
- **Automated Integrity Checks**: Continuous monitoring of critical files
- **Self-Healing**: Automatic restoration from secure backups
- **Audit Trails**: Complete history of who changed what and when
- **Branch & Merge**: Test configuration changes in isolation

---

## 🛠 Technology Stack

### Frontend

- **React 18.3.1** - Modern UI framework
- **React Router 7.9.4** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Recharts 3.2.1** - Data visualization library
- **Lucide React** - Beautiful icon library
- **Vite 5.4.2** - Next-generation frontend tooling

### Backend

- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **Axios 1.13.1** - HTTP client
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools

- **TypeScript 5.5.3** - Type-safe JavaScript
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries

- **Supabase** - Backend-as-a-Service (planned integration)

---

## 📁 Project Structure

```
aura/
├── public/                 # Static assets
│   └── logo.jpg           # AURA logo
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Modal.jsx     # Modal component
│   │   ├── Navbar.jsx    # Navigation bar
│   │   └── Toast.jsx     # Toast notifications
│   ├── pages/            # Page components
│   │   ├── Home.jsx              # Landing page
│   │   ├── PatchManagement.jsx   # Patch management module
│   │   ├── IntelligentAlerts.jsx # Alert monitoring module
│   │   ├── ResourceMonitor.jsx   # Resource monitoring module
│   │   ├── DriftManagement.jsx   # Configuration drift module
│   │   └── Installation.jsx      # Agent installation guide
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── backend/              # Backend API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── app.js        # Express app configuration
│   │   └── server.js     # Server entry point
│   └── package.json      # Backend dependencies
├── index.html            # HTML entry point
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/aura.git
   cd aura
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**

   Create a `.env` file in the backend directory:

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   PORT=5000
   AGENT_BASE_URL=http://localhost:8080
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   Backend will run on http://localhost:5000

2. **Start the frontend (in a new terminal)**

   ```bash
   npm run dev
   ```

   Frontend will run on http://localhost:5173

3. **Access the application**
   Open your browser and navigate to http://localhost:5173

#### Production Mode

1. **Build the frontend**

   ```bash
   npm run build
   ```

2. **Start the backend**

   ```bash
   cd backend
   npm start
   ```

3. **Serve the frontend**
   Use a static file server like `serve`:
   ```bash
   npm install -g serve
   serve -s dist
   ```

---

## 🔧 Core Modules

### 1. Patch Management

**Purpose**: Automate the deployment, tracking, and rollback of software patches across your infrastructure.

**Key Capabilities**:

- View all available patches with severity levels
- Deploy patches manually or via scheduled workflows
- AI-generated installation scripts (automated & manual)
- Real-time deployment progress tracking
- Automatic rollback on failure
- Compliance reporting and audit trails

**API Endpoints**:

- `GET /api/patches/workflows` - List all patch workflows
- `POST /api/patches/workflow/create` - Create new workflow
- `POST /api/patches/workflow/patch/:id` - Execute workflow
- `DELETE /api/patches/workflow/:id` - Delete workflow
- `GET /api/patches/managed/apps` - List managed applications

### 2. Intelligent Alerts

**Purpose**: AI-powered anomaly detection with automated resolution capabilities.

**Key Capabilities**:

- Real-time anomaly detection using ML baselines
- Contextual alerts with root cause analysis
- AI-suggested solutions for common issues
- Auto-resolution for approved scenarios
- Alert prioritization and filtering
- Integration with external security tools

**API Endpoints**:

- `GET /api/alerts` - List all alerts (with filters)
- `GET /api/alerts/:id` - Get alert details
- `POST /api/alerts/:id/acknowledge` - Acknowledge alert
- `DELETE /api/alerts/:id` - Dismiss alert
- `GET /api/alerts/stats` - Get alert statistics
- `GET /api/alerts/applications` - List monitored applications

### 3. Resource Monitor

**Purpose**: Real-time monitoring of system resources with predictive analytics.

**Key Capabilities**:

- Live monitoring (CPU, Memory, Disk, Network)
- Historical trend analysis
- Predictive resource forecasting
- Performance baseline learning
- Custom alert thresholds
- Data export (JSON/CSV)

**Features**:

- Interactive charts with 5-minute, 1-hour, and 24-hour views
- Device health status dashboard
- Quick actions for common tasks
- Configurable alert thresholds

### 4. Drift Management

**Purpose**: Git-flow style configuration management with automatic drift detection and remediation.

**Key Capabilities**:

- Configuration version control (branches, merges)
- Automated file integrity monitoring
- Self-healing from secure backups
- Visual drift flow visualization
- Audit trails for all changes
- Rollback to any previous state

**API Endpoints**:

- `GET /api/drifts/status` - Get drift monitoring status
- `POST /api/drifts/pipeline/start` - Start monitoring
- `POST /api/drifts/pipeline/stop` - Stop monitoring
- `GET /api/drifts/files` - List monitored files
- `POST /api/drifts/files/:path/check` - Check file integrity
- `POST /api/drifts/baseline/rebuild` - Rebuild baseline
- `GET /api/drifts/backups` - List backups
- `POST /api/drifts/backups` - Create backup
- `POST /api/drifts/backups/latest/restore` - Restore latest backup

---

## 🏗 Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      AURA Dashboard                          │
│                    (React Frontend)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTPS/REST API
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Backend API Server                          │
│                  (Express + Node.js)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP/WebSocket
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    AURA Agents                               │
│              (Installed on Endpoints)                        │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  Windows   │  │   Linux    │  │   macOS    │           │
│  │  Servers   │  │  Servers   │  │(Coming Soon)│          │
│  └────────────┘  └────────────┘  └────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

### Component Architecture

**Frontend (React)**

- Component-based architecture
- React Router for navigation
- Context API for state management
- Recharts for data visualization
- Tailwind CSS for styling

**Backend (Express)**

- RESTful API design
- Controller-Service-Route pattern
- Axios for agent communication
- CORS enabled for cross-origin requests

**Agent (Endpoint Software)**

- Lightweight agent (<100MB)
- Monitors system metrics
- Executes patch deployments
- Manages configuration files
- Reports to backend API

### Data Flow

1. **Monitoring**: Agents continuously collect metrics and send to backend
2. **Processing**: Backend processes data, detects anomalies using ML
3. **Alerting**: Intelligent alerts generated when thresholds exceeded
4. **Resolution**: AI agents can auto-resolve approved scenarios
5. **Reporting**: Dashboard displays real-time and historical data

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000
Production: https://api.yourdomain.com
```

### Authentication

Currently, the API uses basic authentication. Token-based authentication will be implemented in future releases.

### Common Headers

```
Content-Type: application/json
Authorization: Bearer <token>
```

### Response Format

All API responses follow this structure:

**Success Response**:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

**Error Response**:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Example API Calls

**Get All Alerts**

```bash
curl -X GET http://localhost:5000/api/alerts \
  -H "Content-Type: application/json"
```

**Create Patch Workflow**

```bash
curl -X POST http://localhost:5000/api/patches/workflow/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monthly Security Updates",
    "schedule": "0 2 * * 0",
    "devices": ["device1", "device2"]
  }'
```

**Execute Workflow**

```bash
curl -X POST http://localhost:5000/api/patches/workflow/patch/WF-001 \
  -H "Content-Type: application/json"
```

---

## ⚙️ Configuration

### Frontend Configuration

**Vite Configuration** (`vite.config.ts`):

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
```

**Tailwind Configuration** (`tailwind.config.js`):

- Custom color scheme for AURA branding
- Extended font family (Doto)
- Custom utility classes

### Backend Configuration

**Environment Variables** (`.env`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Agent Configuration
AGENT_BASE_URL=http://localhost:8080

# Database (Future)
DATABASE_URL=postgresql://user:password@localhost:5432/aura

# Security
JWT_SECRET=your_jwt_secret_here
```

### Agent Configuration

**Agent Installation Token**: Required for agent authentication
**Monitoring Interval**: Default 60 seconds
**Backup Location**: `/var/lib/aura/backups`

---

## 🚢 Deployment

### Docker Deployment (Recommended)

1. **Build Docker Images**

   ```bash
   docker-compose build
   ```

2. **Start Services**

   ```bash
   docker-compose up -d
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

### Manual Deployment

#### Frontend (Static Hosting)

1. Build for production:

   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to:
   - **Vercel**: `vercel deploy`
   - **Netlify**: `netlify deploy`
   - **AWS S3**: Configure as static website
   - **Nginx**: Copy to `/var/www/html`

#### Backend (Node.js Server)

1. Set production environment:

   ```bash
   export NODE_ENV=production
   ```

2. Start with PM2 (recommended):

   ```bash
   pm2 start backend/src/server.js --name aura-backend
   pm2 save
   pm2 startup
   ```

3. Configure reverse proxy (Nginx):

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📸 Screenshots

<!-- Add your screenshots here in the next message -->

### Dashboard Home

![Dashboard Home](screenshots/home.png)
_Overview dashboard with system stats and quick access to all modules_

### Patch Management

![Patch Management](screenshots/patch-management.png)
_Comprehensive patch deployment and workflow management_

### Intelligent Alerts

![Intelligent Alerts](screenshots/intelligent-alerts.png)
_AI-powered anomaly detection with contextual insights_

### Resource Monitor

![Resource Monitor](screenshots/resource-monitor.png)
_Real-time system metrics with historical trend analysis_

### Drift Management

![Drift Management](screenshots/drift-management.png)
_Git-flow style configuration management with visual drift tracking_

### Installation Guide

![Installation](screenshots/installation.png)
_Step-by-step agent installation with automated scripts_

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/aura.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/branch-name
   ```

3. **Make your changes**

   - Write clean, documented code
   - Follow the existing code style
   - Add tests if applicable

4. **Commit your changes**

   ```bash
   git commit -m 'Commit Message'
   ```

5. **Push to your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all tests pass

---

<div align="center">

**Made with ❤️ by the AURA Team**

</div>
