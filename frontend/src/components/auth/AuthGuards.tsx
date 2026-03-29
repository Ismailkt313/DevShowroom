import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute - Redirects to /auth if the user is not logged in.
 * Used for the Dashboard and other private pages.
 */
export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

/**
 * PublicRoute - Redirects to /dashboard if the user is already logged in.
 * Used for the Landing Page and Auth Page.
 */
export const PublicRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        {/* Silent loading or small indicator to avoid flicker */}
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
