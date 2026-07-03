import React, { useState } from 'react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';
import { Compass } from 'lucide-react';

export default function Home() {
  // videos = null represents loading state (skeletons)
  // videos = [] represents empty state
  // TODO: Backend Integration - replace with API fetch
  const [videos, setVideos] = useState(null); 
  
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Programming', 'Gaming', 'Music', 'Design', 'Science', 'Sports'];

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Categories Header */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 select-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none ${
                isActive 
                  ? 'bg-white text-black font-bold' 
                  : 'bg-brand-surface text-zinc-400 hover:text-white border border-brand-border'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Main Grid View */}
      {videos === null ? (
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
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
