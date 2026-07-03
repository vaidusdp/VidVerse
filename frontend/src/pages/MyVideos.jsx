import React, { useState } from 'react';
import { Video, Edit, Trash2, Eye, Calendar, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import Badge from '../components/ui/Badge';

export default function MyVideos() {
  // Data states (null represents loading state)
  // TODO: Backend Integration
  const [videos, setVideos] = useState(null);

  // Deletion States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetVideoId, setTargetVideoId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTrigger = (videoId) => {
    setTargetVideoId(videoId);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    // TODO: Backend Integration
    toast.success('Video deleted successfully');
    setIsDeleting(false);
    setIsDeleteOpen(false);
  };

  const handleTogglePublish = (videoId) => {
    // TODO: Backend Integration
    toast.success('Publish status toggled');
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Video Management</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Edit metadata, check stats, or delete uploads.</p>
      </div>

      {/* Videos List Container */}
      <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
        {videos === null ? (
          /* Table loading skeleton rows */
          <div className="divide-y divide-brand-border p-4 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2">
                <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton variant="text" className="w-1/2 h-3.5" />
                  <Skeleton variant="text" className="w-1/4 h-3" />
                </div>
                <Skeleton variant="rectangle" className="w-16 h-8" />
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          /* Table empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
            <Video size={28} className="text-zinc-600 mb-3" />
            <h4 className="text-sm font-semibold text-white">No content uploaded</h4>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              You haven't uploaded any videos to your channel yet. Upload videos to display them here.
            </p>
          </div>
        ) : (
          /* Populated Table of Videos */
          <div className="overflow-x-auto">
            {/* TODO: Backend Integration */}
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-brand-border text-zinc-400 font-semibold text-xs uppercase tracking-wider select-none bg-brand-surface">
                  <th className="p-4">Video</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-white/2 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="p-4 flex gap-3.5 items-center min-w-[280px]">
                      <div className="w-20 aspect-video rounded overflow-hidden bg-zinc-800 shrink-0 border border-brand-border">
                        {video.thumbnail && <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-semibold text-white line-clamp-2 leading-snug">
                        {video.title}
                      </span>
                    </td>
                    
                    {/* Visibility Status */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={video.isPublished ? 'green' : 'gray'}>
                          {video.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <button 
                          onClick={() => handleTogglePublish(video.id)}
                          className="text-xs text-zinc-500 hover:text-white transition-colors underline"
                        >
                          Change
                        </button>
                      </div>
                    </td>
                    
                    {/* Date Uploaded */}
                    <td className="p-4 text-zinc-400 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Calendar size={13} />
                        {video.createdAt}
                      </span>
                    </td>

                    {/* View Statistics */}
                    <td className="p-4 text-zinc-400 tabular-nums whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Eye size={13} />
                        {video.views}
                      </span>
                    </td>

                    {/* Video Row Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={Edit} 
                          onClick={() => toast('Edit details dialog / TODO')}
                          title="Edit Details"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={Trash2} 
                          onClick={() => handleDeleteTrigger(video.id)}
                          className="text-red-500 hover:bg-red-500/10"
                          title="Delete Video"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation overlay */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        isConfirming={isDeleting}
        title="Delete video forever?"
        message="This action will permanently delete this video, and comments linked to it. This cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
