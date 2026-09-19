import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ZapOff } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-100">
      <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-3xl mb-4">
        <ZapOff className="w-12 h-12" />
      </div>
      <h1 className="text-2xl font-semibold text-white">404 - Grid Node Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-6">
        The energy marketplace route or resource you are looking for does not exist or has been relocated.
      </p>
      <Link to="/">
        <Button>Return to Main Marketplace</Button>
      </Link>
    </div>
  );
};

export default NotFound;
