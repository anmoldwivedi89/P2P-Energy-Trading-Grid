import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import { authService } from '../../services/authService';

export const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const user = res.data?.user || res.user;
      const token = res.data?.token || res.token;

      if (!token || !user) {
        throw new Error('Authentication response invalid. Please try again.');
      }

      login(user, token);

      // Login success hone par server se verified role ke according dashboard par redirect karte hain
      const targetRole = (user.role || '').toLowerCase();
      if (targetRole === USER_ROLES.ADMIN) {
        navigate('/admin/dashboard');
      } else if (targetRole === USER_ROLES.SELLER) {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full auth-crisp-text">
      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 text-xs rounded-xl flex items-start gap-2 shadow-2xs animate-fadeIn font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* Email Address Field */}
      <div className="space-y-1.5">
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

      {/* Password Field with Show/Hide Toggle */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#142E25] tracking-wide block font-sans">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A655C]">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full pl-10 pr-11 py-2.5 bg-white border border-[#D5CBBB] rounded-xl text-sm font-medium text-[#0F2922] placeholder-[#6E776F] focus:outline-none focus:border-[#B58A45] focus:ring-2 focus:ring-[#B58A45]/25 transition-all shadow-2xs font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5A655C] hover:text-[#0F2922] transition-colors focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password Row */}
      <div className="flex items-center justify-between text-xs pt-0.5">
        <label className="flex items-center gap-2 text-[#46524B] cursor-pointer select-none group font-medium">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-[#D5CBBB] text-[#073D30] focus:ring-[#B58A45] cursor-pointer accent-[#073D30]"
          />
          <span className="group-hover:text-[#0F2922] transition-colors">Remember me</span>
        </label>
        <a
          href="#forgot"
          onClick={(e) => {
            e.preventDefault();
            alert('Password reset instructions will be sent to your registered email address.');
          }}
          className="text-[#966E2E] hover:text-[#073D30] font-semibold transition-colors hover:underline"
        >
          Forgot password?
        </a>
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
            <span>Authenticating Node...</span>
          </div>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 text-[#E5C378] group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {/* Switch to Register link */}
      <p className="text-xs text-center text-[#46524B] pt-2 font-medium">
        Don't have an account?{' '}
        {onSwitchToRegister ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#073D30] hover:text-[#966E2E] font-bold underline decoration-[#B58A45]/50 hover:decoration-[#B58A45] cursor-pointer focus:outline-none transition-colors ml-1"
          >
            Create an Account
          </button>
        ) : (
          <Link
            to="/register"
            className="text-[#073D30] hover:text-[#966E2E] font-bold underline decoration-[#B58A45]/50 hover:decoration-[#B58A45] transition-colors ml-1"
          >
            Create an Account
          </Link>
        )}
      </p>
    </form>
  );
};

export default LoginForm;
