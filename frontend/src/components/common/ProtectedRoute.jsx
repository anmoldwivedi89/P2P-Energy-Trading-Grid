import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Route protection guard: Check karta hai ki user logged in hai aur uske paas required role hai ya nahi
 */
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Agar user authenticated nahi hai toh use login page par bhejte hain
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar specific roles required hain toh case-insensitive check perform karte hain
  if (allowedRoles) {
    const normalizedRole = (role || '').toLowerCase();
    const isAllowed = allowedRoles.some((r) => String(r).toLowerCase() === normalizedRole);
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
