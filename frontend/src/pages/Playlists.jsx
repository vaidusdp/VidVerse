import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FolderPlus, ListVideo } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import PlaylistCard from '../components/playlist/PlaylistCard';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

export default function Playlists() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  // Data states: playlists = [] defaults to empty state
  // TODO: Backend Integration - replace with playlists fetch call
  const [playlists, setPlaylists] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreatePlaylist = (data) => {
    // TODO: Backend Integration
    toast.success('Playlist created successfully! (TODO: Backend Integration)');
    reset();
    setIsCreateOpen(false);
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Playlists</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Organize your streaming catalog.</p>
        </div>
        
        <Button 
          variant="primary" 
          size="sm"
          icon={FolderPlus} 
          onClick={() => setIsCreateOpen(true)}
        >
          New Playlist
        </Button>
      </div>

      {playlists === null ? (
        /* Loading Skeletons Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Skeleton variant="rectangle" className="aspect-video w-full" />
              <Skeleton variant="text" className="w-2/3 h-4 mt-2" />
            </div>
          ))}
        </div>
      ) : playlists.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <ListVideo size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No playlists found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Create folders to group and categorize videos. Click the button above to make a playlist.
          </p>
        </div>
      ) : (
        /* Populated Playlists Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}

      {/* Create Playlist Modal overlay */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Playlist">
        <form onSubmit={handleSubmit(handleCreatePlaylist)} className="flex flex-col gap-5">
          <Input
            label="Playlist Name"
            placeholder="e.g. Learning React 19"
            error={errors.name?.message}
            {...register('name', { 
              required: 'A name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />

          <Textarea
            label="Description"
            placeholder="What is this playlist about?"
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border mt-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Playlist
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
