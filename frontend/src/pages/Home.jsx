import React, { useState, useEffect } from 'react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';
import { Compass } from 'lucide-react';
import videoServices from '../services/video.services';
import toast from "react-hot-toast";

export default function Home() {
  const [videos, setVideos] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await videoServices.getAllVideos();
        setVideos(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to fetch videos."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [])
  
  const [activeCategory, setActiveCategory] = useState('All');


  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Main Grid View */}
      {loading ? (
        /* Loading Skeletons State */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2.5">
              <Skeleton variant="rectangle" className="aspect-video w-full" />
              <div className="flex gap-3 px-1 mt-1">
                <Skeleton variant="circle" className="w-8 h-8" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton variant="text" className="w-5/6 h-3" />
                  <Skeleton variant="text" className="w-1/2 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Compass size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No videos found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            There are no videos uploaded in the {activeCategory} category yet. Check back later or upload your own.
          </p>
        </div>
      ) : (
        /* Populated State */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
