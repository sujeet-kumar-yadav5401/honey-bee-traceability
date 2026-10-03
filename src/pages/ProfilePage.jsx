import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Key,
  Edit3,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/common/Modal';
import FormInput, { SelectInput } from '../components/common/FormInput';

export const ProfilePage = () => {
  const { currentUser, setCurrentUser, switchRole } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, ...editForm }));
    setIsEditModalOpen(false);
    setSaveMessage('Profile information updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    setSaveMessage('Password updated successfully (Demo Mode)!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Profile & Node Identity</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Consortium participant credentials and cryptographic signing role
        </p>
      </div>

      {saveMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-500/20 shadow-sm"
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-slate-950 p-1 rounded-lg text-xs">
              🐝
            </span>
          </div>

          {/* Core Info */}
          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{currentUser?.name}</h2>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">{currentUser?.product}</p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white w-fit mx-auto sm:mx-0">
                {currentUser?.role}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-3">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail size={14} className="text-slate-400" />
                <span>{currentUser?.email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone size={14} className="text-slate-400" />
                <span>{currentUser?.phone}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin size={14} className="text-slate-400" />
                <span>{currentUser?.location}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Calendar size={14} className="text-slate-400" />
                <span>Member Since: {currentUser?.joined || 'Jan 2025'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit Profile & Change Password (Requirement 18) */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditForm({
                  name: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: currentUser?.phone || '',
                  location: currentUser?.location || ''
                });
                setIsEditModalOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-2xs flex items-center gap-2"
            >
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Key size={14} />
              <span>Change Password</span>
            </button>
          </div>

          {/* Presentation Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Presentation Perspective:
            </span>
            <button
              onClick={() => switchRole('beekeeper')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                currentUser?.roleKey === 'beekeeper' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              Beekeeper
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                currentUser?.roleKey === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => switchRole('customer')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                currentUser?.roleKey === 'customer' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              Customer
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
      >
        <form onSubmit={handleEditSave} className="space-y-4">
          <FormInput
            label="Full Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
          />
          <FormInput
            label="Email Address"
            type="email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            required
          />
          <FormInput
            label="Phone Number"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            required
          />
          <FormInput
            label="Apiary / Farm Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            required
          />
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Security Password"
      >
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <FormInput
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            placeholder="••••••••••••"
            required
          />
          <FormInput
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="••••••••••••"
            required
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="••••••••••••"
            required
          />
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
