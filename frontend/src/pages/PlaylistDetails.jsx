import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Play, ListVideo } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import VideoCard from '../components/video/VideoCard';

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  // Data states: playlist = null represents loading state
  // TODO: Backend Integration
  const [playlist, setPlaylist] = useState(null);

  // Dialog States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePlaylist = () => {
    setIsDeleting(true);
    // TODO: Backend Integration
    toast.success('Playlist deleted successfully');
    setIsDeleting(false);
    setIsDeleteOpen(false);
    navigate('/playlists');
  };

  const handleRemoveVideo = (videoId) => {
    // TODO: Backend Integration
    toast.success('Video removed from playlist');
  };

  return (
    <div className="font-sans text-white">
      {playlist === null ? (
        /* Loading Skeletons layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
            <Skeleton variant="rectangle" className="aspect-video w-full" />
            <Skeleton variant="text" className="w-3/4 h-5" />
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-1/2 h-3" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center p-3 border border-brand-border rounded-lg">
                <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton variant="text" className="w-1/2 h-3.5" />
                  <Skeleton variant="text" className="w-1/4 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Populated Playlist Details Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Playlist Cover / Metadata Left Column */}
          {/* TODO: Backend Integration */}
          <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4 sticky top-20 h-fit">
            <div className="aspect-video w-full rounded-lg bg-zinc-800 border border-brand-border overflow-hidden relative flex items-center justify-center text-zinc-500">
              {playlist.thumbnail ? (
                <img src={playlist.thumbnail} alt={playlist.name} className="w-full h-full object-cover" />
              ) : (
                <ListVideo size={36} />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-brand-accent p-3 rounded-full text-white shadow-lg">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {playlist.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {playlist.videosCount || 0} videos &bull; Created recently
              </p>
              {playlist.description && (
                <p className="text-xs text-zinc-500 leading-relaxed mt-3 whitespace-pre-wrap">
                  {playlist.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-brand-border pt-4 mt-2">
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Edit2}
                onClick={() => toast('Edit title placeholder / TODO')}
                className="flex-1"
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                icon={Trash2}
                onClick={() => setIsDeleteOpen(true)}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Videos List Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {!playlist.videos || playlist.videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-brand-surface/30 border border-brand-border rounded-xl text-center">
                <ListVideo size={24} className="text-zinc-500 mb-3" />
                <h4 className="text-sm font-semibold text-white">No videos in playlist</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Add videos to this playlist while watching them.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {playlist.videos.map((video, idx) => (
                  <div 
                    key={video.id} 
                    className="flex gap-4 items-center p-3 bg-brand-surface/20 border border-brand-border rounded-xl hover:border-zinc-800 transition-colors group/row"
                  >
                    <span className="text-xs font-semibold text-zinc-500 w-4 text-center tabular-nums">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <VideoCard video={video} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleRemoveVideo(video.id)}
                      className="text-zinc-500 hover:text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity"
                      title="Remove from playlist"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete playlist confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeletePlaylist}
        isConfirming={isDeleting}
        title="Delete Playlist?"
        message="This action will permanently delete the playlist folder. The videos inside the playlist will NOT be deleted."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
