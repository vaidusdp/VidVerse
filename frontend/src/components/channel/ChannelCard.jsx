import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

// TODO: Backend Integration
export default function ChannelCard({ channel, onToggleSubscribe }) {
  if (!channel) return null;

  const {
    username,
    fullname,
    avatar,
    subscribersCount,
    videosCount,
    isSubscribed
  } = channel;

  return (
    <div className="flex items-center justify-between gap-4 p-4 border border-brand-border bg-brand-surface/30 rounded-xl hover:bg-brand-surface/50 transition-colors font-sans">
      <Link to={`/c/${username}`} className="flex items-center gap-4 min-w-0">
        <Avatar src={avatar} name={fullname || username} size="lg" />
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-white truncate hover:underline">
            {fullname || username}
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">
            @{username}
          </p>
          <div className="text-[11px] sm:text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-1">
            <span>{subscribersCount} subscribers</span>
            <span>&bull;</span>
            <span>{videosCount} videos</span>
          </div>
        </div>
      </Link>

      <Button
        variant={isSubscribed ? 'secondary' : 'primary'}
        size="sm"
        onClick={() => onToggleSubscribe?.(username)}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
}
