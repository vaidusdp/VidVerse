import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';
import ChannelCard from '../components/channel/ChannelCard';
import videoServices from '../services/video.services';
import toast from 'react-hot-toast';

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setResults(null);
        if (!query.trim()) {
          setResults([]);
          return;
        }
        const response = await videoServices.getAllVideos({ search: query });
        setResults(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to search.");
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Search Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Search Results</h2>
        {query ? (
          <p className="text-xs text-zinc-500 mt-0.5">
            Displaying results matching "<span className="text-brand-accent font-semibold">{query}</span>"
          </p>
        ) : (
          <p className="text-xs text-zinc-500 mt-0.5">Please enter a search query in the header.</p>
        )}
      </div>

      {results === null ? (
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
      ) : results.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Search size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No results found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We couldn't find any videos or channels matching "{query}". Try checking for spelling errors or search for other topics.
          </p>
        </div>
      ) : (
        /* Populated grid layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {results.map((item) => (
            item.type === 'channel' ? (
              <ChannelCard key={item.username} channel={item} />
            ) : (
              <VideoCard key={item._id} video={item} />
            )
          ))}
        </div>
      )}
    </div>
  );
}
