import React from 'react';
import UserTable from '../../components/admin/UserTable';

export const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Grid Participants Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Supervise registered solar prosumers, clean energy buyers, and node operators.
        </p>
      </div>

      <UserTable />
    </div>
  );
};

export default Users;
