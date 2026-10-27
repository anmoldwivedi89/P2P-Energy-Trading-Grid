import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

import { authService } from '../../services/authService';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(USER_ROLES.BUYER);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const user = res.data?.user || res.user;
      const token = res.data?.token || res.token;

      if (!token || !user) {
        throw new Error('Authentication response invalid');
      }

      login(user, token);

      const targetRole = user.role || role;
      if (targetRole === USER_ROLES.SELLER) navigate('/seller/dashboard');
      else if (targetRole === USER_ROLES.ADMIN) navigate('/admin/dashboard');
      else navigate('/buyer/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-slate-300 block mb-1.5">
          Select Role
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[USER_ROLES.BUYER, USER_ROLES.SELLER, USER_ROLES.ADMIN].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-2 text-xs font-medium rounded-lg border capitalize transition ${
                role === r
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
          <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500" />
          <span>Remember me</span>
        </label>
        <a href="#forgot" className="text-emerald-400 hover:underline">Forgot password?</a>
      </div>

      <Button type="submit" isLoading={loading} className="w-full">
        Sign In
      </Button>

      <p className="text-xs text-center text-slate-400 pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-emerald-400 hover:underline font-medium">
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
