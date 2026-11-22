import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { authService } from '../../services/authService';
import { User, Shield, Wallet, Cpu, Lock, CheckCircle2, AlertCircle, Edit3, X, Check } from 'lucide-react';

export const Profile = () => {
  const { user, role, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [smartMeterId, setSmartMeterId] = useState('');
  const [solarCapacityKw, setSolarCapacityKw] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const syncFormWithUser = () => {
    if (user) {
      setName(user.name || '');
      setLocation(user.location || '');
      setSmartMeterId(user.smartMeterId || '');
      setSolarCapacityKw(user.solarCapacityKw !== undefined ? String(user.solarCapacityKw) : '');
      setWalletAddress(user.walletAddress || '');
    }
  };

  useEffect(() => {
    syncFormWithUser();
  }, [user]);

  const handleCancel = () => {
    syncFormWithUser();
    setIsEditing(false);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Frontend validation on name
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMsg('Full Name is required and cannot be empty.');
      return;
    }
    if (trimmedName.length < 2) {
      setErrorMsg('Full Name must be at least 2 characters in length.');
      return;
    }
    if (trimmedName.length > 100) {
      setErrorMsg('Full Name cannot exceed 100 characters in length.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: trimmedName,
        location: location.trim(),
        smartMeterId: smartMeterId.trim() || null,
        solarCapacityKw: Math.max(0, Number(solarCapacityKw) || 0),
        walletAddress: walletAddress.trim() || null,
      };

      const res = await authService.updateProfile(payload);
      const updated = res?.data?.user || res?.user || res?.data;

      if (updated && updateUser) {
        updateUser(updated);
      }

      setIsEditing(false);
      setSuccessMsg('Account profile successfully updated and synchronized across all dashboards.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile. Please verify your connection.');
    } finally {
      setSaving(false);
    }
  };

  const normalizedRole = (role || user?.role || '').toLowerCase();
  const roleLabel =
    normalizedRole === 'admin'
      ? 'Grid Administrator'
      : normalizedRole === 'seller'
      ? 'Clean Energy Seller / Prosumer'
      : 'Clean Energy Buyer';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">Account Profile</h1>
          <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1">
            Manage your verified grid participant identity, smart meter node, and settlement wallet.
          </p>
        </div>

        {!isEditing && (
          <Button
            type="button"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="self-start sm:self-auto gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Button>
        )}
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-[#6B8F71]/15 dark:bg-[#DAA520]/15 border border-[#6B8F71]/30 dark:border-[#DAA520]/30 text-[#6B8F71] dark:text-[#DAA520] text-xs rounded-2xl flex items-center gap-2.5 animate-fadeIn shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#6B8F71] dark:text-[#DAA520] shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs rounded-2xl flex items-center gap-2.5 animate-fadeIn shadow-2xs">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Profile Form Card */}
      <form onSubmit={handleSubmit} className="bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-3xl p-6 sm:p-8 space-y-6 neu-card">
        {/* Profile Header Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-bold text-lg uppercase shrink-0 shadow-sm ${
              normalizedRole === 'admin'
                ? 'bg-purple-500/10 text-purple-600 dark:text-[#DAA520] border-purple-500/30 dark:border-[#DAA520]/30'
                : normalizedRole === 'seller'
                ? 'bg-[#DAA520]/10 text-[#DAA520] dark:text-[#DAA520] border-[#DAA520]/30 dark:border-[#DAA520]/30'
                : 'bg-[#FF6F61]/10 text-[#FF6F61] dark:text-[#DAA520] border-[#FF6F61]/30 dark:border-[#DAA520]/30'
            }`}>
              {user?.name ? user.name.slice(0, 2) : <User className="w-8 h-8" />}
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#292824] dark:text-[#F5E8D8] truncate">
                {user?.name || 'Energy Participant'}
              </h3>
              <p className="text-xs text-[#77736B] dark:text-[#B5A898] font-mono truncate">
                {user?.email || 'user@gridp2p.io'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 shadow-2xs ${
                normalizedRole === 'admin'
                  ? 'bg-purple-500/15 text-purple-600 dark:text-[#DAA520] border-purple-500/30 dark:border-[#DAA520]/30'
                  : normalizedRole === 'seller'
                  ? 'bg-[#DAA520]/15 text-[#DAA520] dark:text-[#DAA520] border-[#DAA520]/30 dark:border-[#DAA520]/30'
                  : 'bg-[#FF6F61]/15 text-[#FF6F61] dark:text-[#DAA520] border-[#FF6F61]/30 dark:border-[#DAA520]/30'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#DCD6CB] dark:border-[#383430]">
          {/* Full Name Field: Editable when isEditing is true */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8] flex items-center justify-between">
              <span>Full Name</span>
              {isEditing ? (
                <span className="text-[11px] text-[#6B8F71] dark:text-[#DAA520] font-medium">Editable</span>
              ) : (
                <span className="text-[11px] text-muted-foreground">Locked</span>
              )}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              disabled={!isEditing}
              readOnly={!isEditing}
              required
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                isEditing
                  ? 'bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#FF6F61] dark:border-[#FF6F61] text-[#292824] dark:text-[#F5E8D8] ring-2 ring-[#FF6F61]/25 neu-inset-sm'
                  : 'bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] text-[#77736B] dark:text-[#B5A898] cursor-not-allowed'
              }`}
            />
            {isEditing && (
              <p className="text-[11px] text-[#77736B] dark:text-[#B5A898]">
                Minimum 2 characters, maximum 100 characters.
              </p>
            )}
          </div>

          {/* Email Address Field: Strictly Read-Only */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8] flex items-center justify-between">
              <span>Registered Email</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#DAA520]" /> Read-only
              </span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              disabled
              className="w-full px-3.5 py-2.5 bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] rounded-lg text-[#77736B] dark:text-[#B5A898] cursor-not-allowed text-sm font-mono"
            />
            <p className="text-[11px] text-[#77736B] dark:text-[#B5A898]">
              Account email is bound to your cryptographic grid credential and cannot be changed.
            </p>
          </div>

          {/* Grid Location Field */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8]">
              Grid Zone / Physical Node Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Zone 4, Node 12"
              disabled={!isEditing}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                isEditing
                  ? 'bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#FF6F61] dark:border-[#FF6F61] text-[#292824] dark:text-[#F5E8D8] ring-2 ring-[#FF6F61]/25 neu-inset-sm'
                  : 'bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] text-[#77736B] dark:text-[#B5A898] cursor-not-allowed'
              }`}
            />
          </div>

          {/* Smart Meter ID Field */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8]">
              Smart Meter / Telemetry Node ID
            </label>
            <input
              type="text"
              value={smartMeterId}
              onChange={(e) => setSmartMeterId(e.target.value)}
              placeholder="e.g. MTR-9824-A"
              disabled={!isEditing}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm font-mono transition-all ${
                isEditing
                  ? 'bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#FF6F61] dark:border-[#FF6F61] text-[#292824] dark:text-[#F5E8D8] ring-2 ring-[#FF6F61]/25 neu-inset-sm'
                  : 'bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] text-[#77736B] dark:text-[#B5A898] cursor-not-allowed'
              }`}
            />
          </div>

          {/* Solar Capacity Field */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8]">
              Registered Solar Capacity (kW)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={solarCapacityKw}
              onChange={(e) => setSolarCapacityKw(e.target.value)}
              placeholder="e.g. 5.5"
              disabled={!isEditing}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                isEditing
                  ? 'bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#FF6F61] dark:border-[#FF6F61] text-[#292824] dark:text-[#F5E8D8] ring-2 ring-[#FF6F61]/25 neu-inset-sm'
                  : 'bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] text-[#77736B] dark:text-[#B5A898] cursor-not-allowed'
              }`}
            />
          </div>

          {/* Web3 Wallet Address Field */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8]">
              Settlement Web3 Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              disabled={!isEditing}
              readOnly={!isEditing}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm font-mono transition-all ${
                isEditing
                  ? 'bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#FF6F61] dark:border-[#FF6F61] text-[#292824] dark:text-[#F5E8D8] ring-2 ring-[#FF6F61]/25 neu-inset-sm'
                  : 'bg-[#F0E8DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] text-[#77736B] dark:text-[#B5A898] cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DCD6CB] dark:border-[#383430]">
          <p className="text-[11px] text-[#77736B] dark:text-[#B5A898] order-2 sm:order-1">
            Account privileges are strictly validated against MongoDB backend records.
          </p>

          {isEditing ? (
            <div className="flex items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto justify-end">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCancel}
                disabled={saving}
                className="gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                size="sm"
                isLoading={saving}
                className="gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <div className="order-1 sm:order-2">
              <Button
                type="button"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
