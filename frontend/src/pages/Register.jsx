import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files?.[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (data) => {
    if (!avatarFile) {
      toast.error('An avatar image file is required for registration');
      return;
    }
    
    setLoading(true);
    // TODO: Backend Integration
    toast.success('Registration details submitted! (TODO: Backend Integration)');
    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-white text-center sm:text-left">
          Create creator account
        </h2>
        <p className="text-xs text-zinc-500 text-center sm:text-left mt-1">
          Join VidVerse as a creator and start uploading content.
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        
        {/* Cover Image Upload (Optional) */}
        <div className="relative h-20 bg-zinc-800 rounded-lg overflow-hidden border border-brand-border group select-none">
          {coverFile && (
            <img src={URL.createObjectURL(coverFile)} alt="Cover preview" className="w-full h-full object-cover" />
          )}
          <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
            <span className="text-[10px] font-semibold text-white bg-brand-surface px-2.5 py-1.5 rounded border border-brand-border">
              Add Cover Image (Optional)
            </span>
          </label>
        </div>

        {/* Avatar Image Selector (Required) */}
        <div className="flex items-center gap-3 bg-brand-surface/40 p-3 rounded-lg border border-brand-border">
          <div className="relative group w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-brand-border shrink-0">
            {avatarFile ? (
              <img src={URL.createObjectURL(avatarFile)} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-bold uppercase">
                U
              </div>
            )}
            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Camera size={14} className="text-white" />
            </label>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Avatar Profile Icon *</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Please upload a profile photo.</p>
          </div>
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

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
        />

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={loading}
          icon={UserPlus}
          className="w-full mt-2"
        >
          Sign Up
        </Button>
      </form>

      {/* Toggle Sign In link */}
      <div className="text-center text-xs text-zinc-500 mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-accent hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
