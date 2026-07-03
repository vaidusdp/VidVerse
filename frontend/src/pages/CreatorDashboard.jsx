import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  ThumbsUp, 
  Video, 
  MessageSquare,
  TrendingUp,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

import DashboardCard from '../components/dashboard/DashboardCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import UploadDialog from '../components/video/UploadDialog';

export default function CreatorDashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Stats / Metrics States (null represents loading)
  // TODO: Backend Integration - replace with API statistics calls
  const [stats, setStats] = useState(null);
  const [recentUploads, setRecentUploads] = useState(null);
  const [recentComments, setRecentComments] = useState(null);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Channel Dashboard</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Analyze and manage your content library.</p>
        </div>
        
        <Button 
          variant="primary" 
          size="sm"
          icon={Upload} 
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Video
        </Button>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats === null ? (
          /* Stats loading skeleton card loop */
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-3">
              <Skeleton variant="text" className="w-16 h-3" />
              <Skeleton variant="text" className="w-24 h-6" />
              <Skeleton variant="text" className="w-32 h-3" />
            </div>
          ))
        ) : (
          /* Populated metrics statistics structure */
          <>
            {/* TODO: Backend Integration */}
            <DashboardCard 
              title="Subscribers" 
              value={stats.subscribers} 
              description="Lifetime total"
              icon={Users} 
            />
            <DashboardCard 
              title="Views" 
              value={stats.views} 
              description="Last 30 days"
              icon={Eye} 
            />
            <DashboardCard 
              title="Likes" 
              value={stats.likes} 
              description="Engagement rating"
              icon={ThumbsUp} 
            />
            <DashboardCard 
              title="Videos Published" 
              value={stats.videosCount} 
              description="Uploaded catalog"
              icon={Video} 
            />
          </>
        )}
      </div>

      {/* Split layout: Recent Uploads & Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Uploads */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Uploads
            </h3>
            <Button variant="ghost" size="sm" onClick={() => toast('Redirecting to videos list...')}>
              View All
            </Button>
          </div>

          {recentUploads === null ? (
            /* Uploads loading state skeletons */
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex gap-4 items-center p-3 border border-brand-border rounded-lg">
                  <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton variant="text" className="w-3/4 h-3.5" />
                    <Skeleton variant="text" className="w-1/3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentUploads.length === 0 ? (
            /* Uploads empty state */
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-xs mx-auto">
              <Video size={24} className="text-zinc-600 mb-3" />
              <h4 className="text-sm font-semibold text-white">No videos published</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Upload your first video to start growing your channel.
              </p>
            </div>
          ) : (
            /* Uploads populated layout structure */
            <div className="flex flex-col gap-3">
              {/* TODO: Backend Integration */}
              {recentUploads.map((video) => (
                <div key={video.id} className="flex gap-4 items-center p-3 bg-brand-bg border border-brand-border rounded-lg hover:border-zinc-800 transition-colors">
                  <div className="w-20 aspect-video rounded overflow-hidden bg-zinc-800 shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{video.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{video.createdAt} &bull; {video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Comments */}
        <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
          <div className="border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Comments
            </h3>
          </div>

          {recentComments === null ? (
            /* Comments loading state skeletons */
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex gap-3 p-3 border border-brand-border rounded-lg">
                  <Skeleton variant="circle" className="w-7 h-7" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton variant="text" className="w-16 h-3" />
                    <Skeleton variant="text" className="w-full h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentComments.length === 0 ? (
            /* Comments empty state */
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-[200px] mx-auto">
              <MessageSquare size={24} className="text-zinc-600 mb-3" />
              <h4 className="text-sm font-semibold text-white">No comments yet</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Comments from your viewers will appear here.
              </p>
            </div>
          ) : (
            /* Comments populated layout structure */
            <div className="flex flex-col gap-3">
              {/* TODO: Backend Integration */}
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-brand-bg border border-brand-border rounded-lg">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-zinc-300">@{comment.owner.username}</span>
                    <span className="text-[8px] text-zinc-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialogue Modal */}
      <UploadDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}
