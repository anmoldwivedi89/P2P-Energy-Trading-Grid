import React, { useState, useEffect } from 'react';
import UserTable from '../../components/admin/UserTable';
import { authService } from '../../services/authService';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await authService.getAllUsers();
        const data = Array.isArray(res) ? res : res?.data || [];
        setUsers(data);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">Grid Participants Management</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          Supervise registered solar prosumers, clean energy buyers, and node operators.
        </p>
      </div>

      <UserTable users={users} loading={loading} />
    </div>
  );
};

export default Users;