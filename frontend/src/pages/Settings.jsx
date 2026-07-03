import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

export default function Settings() {
  const { register, handleSubmit } = useForm();

  const handleSettingsSubmit = (data) => {
    // TODO: Backend Integration
    toast.success('Settings updated successfully! (TODO: Backend Integration)');
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">System Settings</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Configure theme selections, system notifications, and security options.</p>
      </div>

      {/* Settings Options Box */}
      <form onSubmit={handleSubmit(handleSettingsSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5">
        
        {/* Theme Preferences */}
        <div className="flex flex-col gap-1.5 pb-4 border-b border-brand-border">
          <h3 className="text-sm font-semibold text-white">Interface Theme</h3>
          <p className="text-[11px] text-zinc-500">Select how VidVerse appears on your screen.</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="p-3 bg-brand-bg rounded-lg border border-brand-accent/50 text-center text-xs font-semibold text-white select-none">
              Dark Mode (Active)
            </div>
            <div 
              onClick={() => toast('Light theme is under development / TODO')}
              className="p-3 bg-zinc-800/40 hover:bg-zinc-800/70 cursor-pointer rounded-lg border border-brand-border text-center text-xs font-semibold text-zinc-500 hover:text-zinc-400 select-none"
            >
              Light Mode
            </div>
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="flex flex-col gap-4 pb-4 border-b border-brand-border">
          <h3 className="text-sm font-semibold text-white">Channel Privacy</h3>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Keep liked videos private</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">When enabled, other viewers cannot see what videos you have liked on your channel profile.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('privateLikes')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Keep subscriptions private</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Hide subscribed channel grids from public channel profiles.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('privateSubs')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>
        </div>

        {/* Email Alerts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Email Notifications</h3>
          
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">New subscribers alerts</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Send daily/weekly reports on new subscribers listing.</p>
            </div>
            <input 
              type="checkbox" 
              {...register('emailSubscribers')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Comment alerts</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Notify when comments are posted on your uploaded videos.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('emailComments')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-3 border-t border-brand-border mt-2">
          <Button type="submit" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
