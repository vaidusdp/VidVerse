import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

import videoServices from '../../services/video.services';

export default function EditVideoDialog({ isOpen, onClose, video, onSuccess }) {
  const {
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset fields when the dialog opens or the selected video changes
  useEffect(() => {
    if (isOpen && video) {
      reset({
        title: video.title || '',
        description: video.description || '',
      });
      setThumbnailFile(null);
    }
  }, [isOpen, video, reset]);

  const handleThumbnailChange = (e) => {
    if (e.target.files?.[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (data) => {
    if (!video?._id) return;
    
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const response = await videoServices.updateVideo(video._id, formData);

      toast.success(response.message || 'Video updated successfully');

      if (onSuccess) {
        onSuccess(response.data);
      }
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update video."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Video Details" className="max-w-2xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6 font-sans">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Metadata Inputs Column */}
          <div className="flex flex-col gap-4">
            <Input
              label="Video Title"
              placeholder="e.g. Building VidVerse Streaming Platform"
              error={errors.title?.message}
              {...register('title', { 
                required: 'A title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
            />

            <Textarea
              label="Description"
              placeholder="Tell viewers about your video..."
              rows={5}
              error={errors.description?.message}
              {...register('description', {
                required: "Description is required"
              })}
            />
          </div>

          {/* Thumbnail Preview and Upload Column */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 select-none">
              Video Thumbnail
            </label>
            
            {/* Show preview of the new thumbnail file if selected, otherwise show current thumbnail */}
            {thumbnailFile ? (
              <div className="flex-1 rounded-lg border border-brand-border bg-brand-surface overflow-hidden relative min-h-[160px] group/thumb">
                <img 
                  src={URL.createObjectURL(thumbnailFile)} 
                  alt="New Thumbnail preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    type='button'
                    variant="danger" 
                    size="sm" 
                    onClick={() => setThumbnailFile(null)}
                    icon={X}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : video?.thumbnail ? (
              <div className="flex-1 rounded-lg border border-brand-border bg-brand-surface overflow-hidden relative min-h-[160px] group/thumb">
                <img 
                  src={video.thumbnail} 
                  alt="Current Thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-1.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow">
                      <UploadCloud size={14} />
                      Change Thumbnail
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-brand-border hover:border-brand-accent/50 rounded-lg p-5 text-center relative group min-h-[160px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <ImageIcon size={20} className="text-zinc-500 group-hover:text-brand-accent transition-colors mb-2" />
                <span className="text-[11px] font-semibold text-zinc-400">
                  Upload Image
                </span>
                <span className="text-[9px] text-zinc-600 mt-1 max-w-[140px]">
                  JPG or PNG, max 2MB
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-brand-border pt-4 mt-2">
          <Button type='button' variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
