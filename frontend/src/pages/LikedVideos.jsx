import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';

export default function LikedVideos() {
  // Data states: likedVideos = [] defaults to the natural Empty state
  // TODO: Backend Integration - replace with liked video endpoint fetch
  const [likedVideos, setLikedVideos] = useState([]);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Liked Videos</h2>
        <p className="text-xs text-zinc-500 mt-0.5">A history of videos you have liked.</p>
      </div>

      {likedVideos === null ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
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
      ) : likedVideos.length === 0 ? (
        /* Elegant Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <ThumbsUp size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No liked videos yet
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Videos you like will show up here. Explore the home catalog to find videos to watch.
          </p>
        </div>
      ) : (
        /* Populated State Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {likedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
