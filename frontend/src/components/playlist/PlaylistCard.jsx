import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ListVideo } from 'lucide-react';

export default function PlaylistCard({ playlist }) {
  if (!playlist) return null;

  const { _id, name, description, videosCount, thumbnail } = playlist;

  return (
    <Link 
      to={`/playlists/${_id}`} 
      className="group flex flex-col gap-2 font-sans relative"
    >
      {/* Visual Folder Stack effect */}
      <div className="relative aspect-video w-full rounded-lg bg-zinc-800 border border-brand-border overflow-hidden select-none">
        {/* Layer Stack Backings */}
        <div className="absolute top-0 left-2 right-2 -translate-y-[4px] h-full bg-zinc-700/50 rounded-lg -z-10 border-t border-white/5 transition-transform group-hover:-translate-y-[6px]" />
        <div className="absolute top-0 left-4 right-4 -translate-y-[8px] h-full bg-zinc-600/30 rounded-lg -z-20 border-t border-white/5 transition-transform group-hover:-translate-y-[11px]" />
        
        {playlist.videos?.[0]?.thumbnail ? (
          <img 
            src={playlist.videos[0].thumbnail} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-brand-surface">
            <ListVideo size={32} />
          </div>
        )}

        {/* Overlay showing play list tag */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-brand-accent p-2.5 rounded-full flex items-center justify-center text-white shadow-lg">
            <Play size={16} fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wider text-white flex items-center gap-1.5">
          <ListVideo size={12} />
          <span>{playlist.videos?.length || 0} videos</span>
        </div>
      </div>

      {/* Playlist metadata */}
      <div className="px-1 mt-1">
        <h4 className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors truncate">
          {name}
        </h4>
        {description && (
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
