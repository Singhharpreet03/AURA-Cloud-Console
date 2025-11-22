import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optionally render a loading spinner or skeleton screen
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold" style={{ color: "#12283C" }}>Loading AURA...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page,
    // saving the current location so they can be redirected back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;