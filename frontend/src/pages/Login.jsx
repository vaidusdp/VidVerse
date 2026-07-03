import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setLoading(true);
    // TODO: Backend Integration
    toast.success('Logged in successfully! (TODO: Backend Integration)');
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-white text-center sm:text-left">
          Welcome back
        </h2>
        <p className="text-xs text-zinc-500 text-center sm:text-left mt-1">
          Access your streaming catalog and creator dashboard.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <Input
          label="Username or Email"
          placeholder="e.g. johndoe"
          error={errors.identity?.message}
          {...register('identity', { 
            required: 'Please enter your username or email address' 
          })}
        />

        <div className="flex flex-col">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Please enter your password',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <div className="flex justify-end mt-1">
            <button 
              type="button" 
              onClick={() => toast('Password recovery / TODO: Contact Support')}
              className="text-[10px] font-semibold text-brand-accent hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={loading}
          icon={LogIn}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Toggle Sign Up link */}
      <div className="text-center text-xs text-zinc-500 mt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-accent hover:underline font-semibold">
          Create Account
        </Link>
      </div>
    </div>
  );
}
