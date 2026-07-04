import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Save, Key } from 'lucide-react';
import toast from 'react-hot-toast';

import Avatar from '../components/ui/Avatar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import userServices from '../services/user.services';
import useAuthStore from '../store/auth.store';

export default function Profile() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { 
    register: registerPass, 
    handleSubmit: handleSubmitPass, 
    reset: resetPass,
    formState: { errors: errorsPass } 
  } = useForm();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    if(!user){
      return;
    }

    reset({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    });
  }, [user, reset])

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleAvatarChange = async (e) => {
    const files = e.target.files?.[0];

    if(!files) return;

    try {
      setAvatarFile(files);
      const formData = new FormData();
      formData.append("avatar", files);

      const response = await userServices.updateAvatar(formData);

      setUser(response.data);
      setAvatarFile(null);
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed To Update Avatar"
      )
    }
  }

  const handleCoverImageChange = async (e) => {
    const files = e.target.files?.[0];

    if(!files) return;

    try {
      setCoverFile(files);
      const formData = new FormData();
      formData.append("coverImage", files);

      const response = await userServices.updateCoverImage(formData);

      setUser(response.data);
      setCoverFile(null);
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed To Update Cover Image"
      )
    }
  }

  const handleProfileSubmit = async (data) => {
    try {
      const response = await userServices.updateDetails(data);
      setUser(response.data);
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update profile."
      )
    }    
  };

  const handlePasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      await userServices.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });

      toast.success("Password updated successfully.");
      resetPass();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update password."
      );
    }
    
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Update your channel graphics and personal credentials.</p>
      </div>

      {/* Graphics Banner Upload */}
      <div className="relative h-32 sm:h-44 bg-zinc-800 rounded-xl overflow-hidden border border-brand-border group">
        {coverFile ? (
          <img src={URL.createObjectURL(coverFile)} alt="Cover Banner" className="w-full h-full object-cover" />
        ) : user?.coverImage ? (
          <img src={user?.coverImage} alt="Cover Banner" className="w-full h-full object-cover" />
        ) : null}
        
        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer select-none">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
          />
          <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg">
            <Camera size={14} />
            Change Cover Banner
          </div>
        </label>
      </div>

      {/* Avatar circular upload */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 px-4 relative z-10">
        <div className="relative group rounded-full overflow-hidden border-4 border-brand-bg bg-zinc-800 shadow-xl">
          <Avatar 
            src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar} 
            name={user?.fullname || 'U'} 
            size="xl" 
          />
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer select-none">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Camera size={18} className="text-white" />
          </label>
        </div>
        <div className="mb-2">
          <h3 className="text-base font-bold text-white">Channel Icon</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">PNG or JPG, square resolution recommended.</p>
        </div>
      </div>

      {/* Form Details */}
      {/* TODO: Backend Integration */}
      <form onSubmit={handleSubmit(handleProfileSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5 mt-4">
        <div className="border-b border-brand-border pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Personal Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            error={errors.fullname?.message}
            {...register('fullname', { required: 'Full name is required' })}
          />

          <Input
            label="Username"
            placeholder="e.g. johndoe"
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
        />

        <div className="flex justify-end mt-2">
          <Button type="submit" icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>

      {/* Password Change Form */}
      {/* TODO: Backend Integration */}
      <form onSubmit={handleSubmitPass(handlePasswordSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5">
        <div className="border-b border-brand-border pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Change Password
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.oldPassword?.message}
            {...registerPass('oldPassword', { required: 'Old password is required' })}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.newPassword?.message}
            {...registerPass('newPassword', { 
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.confirmPassword?.message}
            {...registerPass('confirmPassword', { required: 'Please confirm password' })}
          />
        </div>

        <div className="flex justify-end mt-2">
          <Button type="submit" variant="secondary" icon={Key}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
