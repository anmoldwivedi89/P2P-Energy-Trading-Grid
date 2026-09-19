import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import RoleSelector from './RoleSelector';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export const RegisterForm = () => {
  const [role, setRole] = useState(USER_ROLES.BUYER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(
        { id: '2', name, email, role, walletAddress },
        'demo-jwt-token-placeholder'
      );
      setLoading(false);

      if (role === USER_ROLES.SELLER) navigate('/seller/dashboard');
      else if (role === USER_ROLES.ADMIN) navigate('/admin/dashboard');
      else navigate('/buyer/dashboard');
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
          Step 1: Choose Your Account Role
        </label>
        <RoleSelector selectedRole={role} onSelectRole={setRole} />
      </div>

      <div className="pt-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
          Step 2: Profile Details
        </label>
        <div className="space-y-3">
          <Input
            label="Full Name / Organization"
            placeholder="John Doe or Green Energy Co."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="•••••••• (Min. 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Wallet / Node Address (Optional)"
            placeholder="0x71C...3a9F"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            helperText="Can be connected later for smart contract settlement"
          />
        </div>
      </div>

      <Button type="submit" isLoading={loading} className="w-full mt-4">
        Create {role.toUpperCase()} Account
      </Button>

      <p className="text-xs text-center text-slate-400 pt-2">
        Already registered?{' '}
        <Link to="/login" className="text-emerald-400 hover:underline font-medium">
          Sign In here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
