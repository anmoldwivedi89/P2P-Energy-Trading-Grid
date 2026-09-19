import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

export const Register = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Join the Smart Energy Grid</h2>
        <p className="text-sm text-slate-400 mt-1">Trade clean renewable energy directly with your community</p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
