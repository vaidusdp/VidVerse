import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import ChannelCard from '../components/channel/ChannelCard';
import toast from 'react-hot-toast';

export default function Subscriptions() {
  // Data states: channels = [] defaults to the natural empty state
  // TODO: Backend Integration - replace with subscriptions fetch call
  const [channels, setChannels] = useState([]);

  const handleToggleSubscribe = (username) => {
    // TODO: Backend Integration
    toast.success(`Unsubscribed from @${username}`);
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Subscriptions</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Channels you subscribe to.</p>
      </div>

      {channels === null ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-brand-border rounded-xl">
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" className="w-16 h-16" />
                <div className="flex flex-col gap-2">
                  <Skeleton variant="text" className="w-24 h-3.5" />
                  <Skeleton variant="text" className="w-16 h-3" />
                  <Skeleton variant="text" className="w-32 h-3" />
                </div>
              </div>
              <Skeleton variant="rectangle" className="w-20 h-8" />
            </div>
          ))}
        </div>
      ) : channels.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Users size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No subscriptions yet
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Channels you subscribe to will appear here. Find creators by exploring the homepage.
          </p>
        </div>
      ) : (
        /* Populated Channel Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TODO: Backend Integration */}
          {channels.map((channel) => (
            <ChannelCard 
              key={channel.username} 
              channel={channel} 
              onToggleSubscribe={handleToggleSubscribe} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
