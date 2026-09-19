import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Common Components
import ProtectedRoute from '../components/common/ProtectedRoute';

// Pages - General & Auth
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Pages - Seller
import SellerDashboard from '../pages/seller/SellerDashboard';
import CreateListing from '../pages/seller/CreateListing';
import MyListings from '../pages/seller/MyListings';
import SellerOrders from '../pages/seller/SellerOrders';

// Pages - Buyer
import BuyerDashboard from '../pages/buyer/BuyerDashboard';
import Marketplace from '../pages/buyer/Marketplace';
import EnergyDetails from '../pages/buyer/EnergyDetails';
import MyOrders from '../pages/buyer/MyOrders';
import Transactions from '../pages/buyer/Transactions';

// Pages - Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Listings from '../pages/admin/Listings';
import AdminTransactions from '../pages/admin/Transactions';

// Pages - Common
import Profile from '../pages/common/Profile';
import Notifications from '../pages/common/Notifications';
import NotFound from '../pages/common/NotFound';

import { USER_ROLES } from '../utils/constants';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/energy/:id" element={<EnergyDetails />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
  );
};

export default AppRoutes;
