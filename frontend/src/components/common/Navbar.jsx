import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Zap, LogIn, UserPlus, LogOut, Bell, User, Sun } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-[#DDE8E1] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A] group-hover:bg-[#dcfce7] transition-all duration-200">
            <Sun className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-[#12372A]">
              Grid<span className="text-[#16A34A]">P2P</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-[#475569] -mt-1">
              Clean Energy Trading
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
          <Link to="/" className="hover:text-[#16A34A] transition-colors">Home</Link>
          <Link to="/marketplace" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5">
            <span>Marketplace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          </Link>
          {isAuthenticated && role === 'seller' && (
            <Link to="/seller/dashboard" className="hover:text-[#16A34A] transition-colors">Seller Hub</Link>
          )}
          {isAuthenticated && role === 'buyer' && (
            <Link to="/buyer/dashboard" className="hover:text-[#16A34A] transition-colors">Buyer Hub</Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-[#16A34A] transition-colors">Admin Panel</Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/notifications"
                className="p-2 text-[#475569] hover:text-[#12372A] rounded-xl hover:bg-[#ECFDF3] transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16A34A] rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#DDE8E1] text-xs text-[#12372A] hover:border-[#16A34A] transition"
              >
                <User className="w-4 h-4 text-[#16A34A]" />
                <span className="capitalize font-medium">{user?.name || role || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-[#475569] hover:text-rose-600 rounded-xl hover:bg-rose-50 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-3.5 py-2 text-xs font-semibold text-[#475569] hover:text-[#12372A] rounded-xl hover:bg-[#ECFDF3] transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-sm transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
