import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Eye, 
  ThumbsUp, 
  Video,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

import DashboardCard from '../components/dashboard/DashboardCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import dashboardServices from '../services/dashboard.services';
import UploadDialog from '../components/video/UploadDialog';

export default function CreatorDashboard() {
  const [stats, setStats] = useState(null);
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsRes = await dashboardServices.getChannelStats();
        setStats(statsRes.data.data);

        const videosRes = await dashboardServices.getChannelVideos();
        setUpload(videosRes.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between">
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
        {loading || !stats ? (
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
            <DashboardCard 
              title="Subscribers" 
              value={stats.totalSubscribers || 0} 
              description="Lifetime total"
              icon={Users} 
            />
            <DashboardCard 
              title="Views" 
              value={stats.totalViews || 0} 
              description="Lifetime total"
              icon={Eye} 
            />
            <DashboardCard 
              title="Likes" 
              value={stats.totalLikes || 0} 
              description="Engagement rating"
              icon={ThumbsUp} 
            />
            <DashboardCard 
              title="Videos Published" 
              value={stats.totalVideos || 0} 
              description="Uploaded catalog"
              icon={Video} 
            />
          </>
        )}
      </div>

      {/* Recent Uploads (Full Width) */}
      <div className="bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Uploads
          </h3>
          <Button variant="ghost" size="sm" onClick={() => toast('Redirecting to videos list...')}>
            View All
          </Button>
        </div>

        {loading || !upload ? (
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
        ) : upload.length === 0 ? (
          /* Uploads empty state */
          <div className="flex flex-col items-center justify-center py-12 text-center max-w-xs mx-auto">
            <Video size={24} className="text-zinc-600 mb-3" />
            <h4 className="text-sm font-semibold text-white">No videos published</h4>
            <p className="text-xs text-zinc-500 mt-1 mb-4">
              Upload your first video to start growing your channel.
            </p>
            <Button 
              variant="primary" 
              size="sm" 
              icon={Upload} 
              onClick={() => setIsUploadOpen(true)}
            >
              Upload Video
            </Button>
          </div>
        ) : (
          /* Uploads populated layout structure */
          <div className="flex flex-col gap-3">
            {upload.map((video) => (
              <div key={video._id} className="flex gap-4 items-center p-3 bg-brand-bg border border-brand-border rounded-lg hover:border-zinc-800 transition-colors">
                <div className="w-20 aspect-video rounded overflow-hidden bg-zinc-800 shrink-0">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">{video.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{new Date(video.createdAt).toLocaleString()} &bull; {video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <UploadDialog 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSuccess={async () => {
          try {
            setLoading(true);
            const statsRes = await dashboardServices.getChannelStats();
            setStats(statsRes.data.data);

            const videosRes = await dashboardServices.getChannelVideos();
            setUpload(videosRes.data.data);
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Failed to fetch dashboard statistics."
            );
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
}
