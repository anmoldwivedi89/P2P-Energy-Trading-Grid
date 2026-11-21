import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Wallet, ArrowRight, AlertCircle } from 'lucide-react';
import RoleSelector from './RoleSelector';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import { authService } from '../../services/authService';

export const RegisterForm = ({ onSwitchToLogin }) => {
  const [role, setRole] = useState(USER_ROLES.BUYER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in your name, email, and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter both carefully.');
      return;
    }

    // Security check: Client-side par bhi admin role registration strictly block hai
    if (role === USER_ROLES.ADMIN) {
      setError('Admin registration is restricted to system administrators.');
      return;
    }

    setLoading(true);
    try {
      // Backend ko buyer ya seller role ke sath registration request bhej rahe hain
      const res = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
        role: role === USER_ROLES.SELLER ? USER_ROLES.SELLER : USER_ROLES.BUYER,
        walletAddress: walletAddress.trim() || undefined,
      });

      const user = res.data?.user || res.user;
      const token = res.data?.token || res.token;

      if (!token || !user) {
        throw new Error('Registration completed but session token was not returned.');
      }

      login(user, token);

      // Selected role ke according user ko unke hub par redirect karte hain
      if (role === USER_ROLES.SELLER) {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 w-full auth-crisp-text">
      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 text-xs rounded-xl flex items-start gap-2 shadow-2xs animate-fadeIn font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* Role Selection */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
          Select Your Participation Role
        </label>
        <RoleSelector selectedRole={role} onSelectRole={setRole} />
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
          Full Name / Node Identifier
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="e.g. John Doe or Solaris Microgrid"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            placeholder="you@energygrid.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Password & Confirm Password in 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 chars"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-xs sm:text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5A655C] hover:text-[#0F2922] transition-colors focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-xs sm:text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs font-mono"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5A655C] hover:text-[#0F2922] transition-colors focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Wallet / Smart Meter (Optional) */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[#142E25] tracking-wide flex items-center justify-between font-sans">
          <span>Web3 Wallet / Smart Meter Node</span>
          <span className="text-[10px] text-[#5A655C] font-normal">Optional</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
            <Wallet className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="0x... or Smart Meter Node UUID"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-xs sm:text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs font-mono"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-5 rounded-xl font-semibold text-sm text-[#F4EFE3] bg-[#073D30] hover:bg-[#062D24] active:scale-[0.99] border border-[#B58A45]/50 shadow-md shadow-[#062D24]/20 hover:shadow-lg hover:shadow-[#062D24]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#F4EFE3]/30 border-t-[#F4EFE3] rounded-full animate-spin" />
            <span>Registering Smart Node...</span>
          </div>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 text-[#E5C378] group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {/* Switch to Login link */}
      <p className="text-xs text-center text-[#46524B] pt-1 font-medium">
        Already have an account?{' '}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#073D30] hover:text-[#966E2E] font-bold underline decoration-[#B58A45]/50 hover:decoration-[#B58A45] cursor-pointer focus:outline-none transition-colors ml-1"
          >
            Sign In here
          </button>
        ) : (
          <Link
            to="/login"
            className="text-[#073D30] hover:text-[#966E2E] font-bold underline decoration-[#B58A45]/50 hover:decoration-[#B58A45] transition-colors ml-1"
          >
            Sign In here
          </Link>
        )}
      </p>
    </form>
  );
};

export default RegisterForm;
