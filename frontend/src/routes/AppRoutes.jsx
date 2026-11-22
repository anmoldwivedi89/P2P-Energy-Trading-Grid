import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts (Static for fast shell rendering)
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Common Components
import ProtectedRoute from '../components/common/ProtectedRoute';

// Lazy Loaded Pages - General & Auth
const Landing = lazy(() => import('../pages/Landing'));
const AuthSplitScreen = lazy(() => import('../components/auth/AuthSplitScreen'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

// Lazy Loaded Pages - Seller
const SellerDashboard = lazy(() => import('../pages/seller/SellerDashboard'));
const CreateListing = lazy(() => import('../pages/seller/CreateListing'));
const MyListings = lazy(() => import('../pages/seller/MyListings'));
const SellerOrders = lazy(() => import('../pages/seller/SellerOrders'));

// Lazy Loaded Pages - Buyer
const BuyerDashboard = lazy(() => import('../pages/buyer/BuyerDashboard'));
const Marketplace = lazy(() => import('../pages/buyer/Marketplace'));
const EnergyDetails = lazy(() => import('../pages/buyer/EnergyDetails'));
const MyOrders = lazy(() => import('../pages/buyer/MyOrders'));
const Transactions = lazy(() => import('../pages/buyer/Transactions'));

// Lazy Loaded Pages - Admin
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const Users = lazy(() => import('../pages/admin/Users'));
const Listings = lazy(() => import('../pages/admin/Listings'));
const AdminTransactions = lazy(() => import('../pages/admin/Transactions'));

// Lazy Loaded Pages - Common
const Profile = lazy(() => import('../pages/common/Profile'));
const Notifications = lazy(() => import('../pages/common/Notifications'));
const NotFound = lazy(() => import('../pages/common/NotFound'));
const ThemeTransitionDemo = lazy(() => import('../components/ui/demo'));

import { USER_ROLES } from '../utils/constants';

// Fast minimal page loader
const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      <span className="text-xs text-slate-400 font-medium tracking-wide">
        Loading Grid...
      </span>
    </div>
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/energy/:id" element={<EnergyDetails />} />
        <Route path="/theme-demo" element={<ThemeTransitionDemo />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthSplitScreen initialMode="login" />} />
          <Route path="/register" element={<AuthSplitScreen initialMode="register" />} />
        </Route>

        {/* Seller Portal Routes (Dashboard Layout) */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="create-listing" element={<CreateListing />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>

        {/* Buyer Portal Routes (Dashboard Layout) */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.BUYER, USER_ROLES.ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/buyer/dashboard" replace />} />
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        {/* Admin Portal Routes (Admin Layout) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="listings" element={<Listings />} />
          <Route path="transactions" element={<AdminTransactions />} />
        </Route>

        {/* Common Authenticated Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
