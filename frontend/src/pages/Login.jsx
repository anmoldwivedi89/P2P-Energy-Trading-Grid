import React from 'react';
import LoginForm from '../components/auth/LoginForm';

export const Login = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Welcome Back</h2>
        <p className="text-sm text-slate-400 mt-1">Access your peer-to-peer energy account</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
