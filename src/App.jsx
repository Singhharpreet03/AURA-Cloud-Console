import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PatchManagement from "./pages/PatchManagement";
import IntelligentAlerts from "./pages/IntelligentAlerts";
import ResourceMonitor from "./pages/ResourceMonitor";
import DriftManagement from "./pages/DriftManagement";
import Installation from "./pages/Installation";
import PolicyManagement from "./pages/PolicyManagement";
// Import the new components
import LoginPage from "./pages/Login.jsx"; 
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1EFEC" }}>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTE: Login Page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* PUBLIC ROUTE: Home Page (Updated!) */}
        <Route path="/" element={<Home />} /> 
        
        {/* PROTECTED ROUTES: Wrap the rest of the application routes */}
        <Route 
          path="/patch-management" 
          element={
            <ProtectedRoute>
              <PatchManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/intelligent-alerts" 
          element={
            <ProtectedRoute>
              <IntelligentAlerts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resource-monitor" 
          element={
            <ProtectedRoute>
              <ResourceMonitor />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drift-management" 
          element={
            <ProtectedRoute>
              <DriftManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/installation" 
          element={
            <ProtectedRoute>
              <Installation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policy-management" 
          element={
            <ProtectedRoute>
              <PolicyManagement />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;