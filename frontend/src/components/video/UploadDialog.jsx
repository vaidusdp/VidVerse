import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadCloud, Film, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

import videoServices from '../../services/video.services';

export default function UploadDialog({ isOpen, onClose, onSuccess }) {
  const {
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (e) => {
    if (e.target.files?.[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files?.[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (data) => {
    if (!videoFile) {
      toast.error('Please select a video file to upload');
      return;
    }

    if(!thumbnailFile){
      toast.error('Please select a thumbnail file to upload');
      return;
    }
    
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("thumbnail", thumbnailFile);
      formData.append("video", videoFile);

      const response = await videoServices.publishVideo(formData);

      toast.success(response.message);

      reset();
      setVideoFile(null);
      setThumbnailFile(null);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to upload video."
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Video" className="max-w-2xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6 font-sans">
        
        {/* Step 1: Video File Selection */}
        {!videoFile ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-brand-border hover:border-brand-accent/50 transition-colors rounded-xl p-10 text-center relative group">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-brand-bg p-4 rounded-full border border-brand-border text-zinc-400 group-hover:text-brand-accent transition-colors mb-4">
              <UploadCloud size={32} />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Drag and drop video files
            </h4>
            <p className="text-xs text-zinc-500 max-w-xs">
              Your videos will remain private until you publish them. Supports MP4, MOV, or WebM formats.
            </p>
            <div className="mt-5">
              <Button variant="secondary" size="sm" className="pointer-events-none">
                Select File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-brand-surface rounded-lg border border-brand-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-brand-bg p-2 rounded-md border border-brand-border text-brand-accent">
                <Film size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate max-w-xs">
                  {videoFile.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVideoFile(null)}
              className="p-1 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Video metadata grid details */}
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
              rows={3}
              error={errors.description?.message}
              {...register('description', {
                required: "Description is required"
              })}
            />
          </div>

          {/* Thumbnail Dropzone Column */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 select-none">
              Video Thumbnail
            </label>
            
            {!thumbnailFile ? (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-brand-border hover:border-brand-accent/50 rounded-lg p-5 text-center relative group min-h-[140px]">
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
            ) : (
              <div className="flex-1 rounded-lg border border-brand-border bg-brand-surface overflow-hidden relative min-h-[140px] group/thumb">
                <img 
                  src={URL.createObjectURL(thumbnailFile)} 
                  alt="Thumbnail preview" 
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
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-brand-border pt-4 mt-2">
          <Button type='button' variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
