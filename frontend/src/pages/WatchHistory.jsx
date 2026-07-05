import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, Search, Grid, List, Play, Eye, Calendar } from "lucide-react";
import Skeleton from "../components/ui/Skeleton";
import VideoCard from "../components/video/VideoCard";
import Avatar from "../components/ui/Avatar";
import userServices from "../services/user.services";
import toast from "react-hot-toast";

export default function WatchHistory() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'grid' or 'list'

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        setLoading(true);
        const response = await userServices.getHistory();
        setHistoryList(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load watch history."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchWatchHistory();
  }, []);

  // Filter history list based on local search query
  const filteredHistory = historyList.filter((item) => {
    if (!item) return false;
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const channelMatch = item.owner?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.owner?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || channelMatch || descMatch;
  });

  return (
    <div className="font-sans text-white flex flex-col gap-6 select-none animate-in fade-in duration-300">
      {/* Header section with glassmorphism styling */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-brand-surface/40 border border-brand-border/60 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="bg-brand-accent/10 p-3.5 rounded-xl border border-brand-accent/20 text-brand-accent shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <History size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Watch History</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Manage and view your recently watched videos.</p>
          </div>
        </div>

        {/* Search & Layout Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Local Search Input */}
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-bg/60 border border-brand-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-accent transition-colors"
            />
            <Search size={14} className="absolute left-3.5 top-3 text-zinc-500" />
          </div>

          {/* Grid/List View Toggles */}
          <div className="flex items-center bg-brand-bg/60 border border-brand-border rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="List View"
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        /* Loading Skeletons based on selected view mode */
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2.5">
                <Skeleton variant="rectangle" className="aspect-video w-full" />
                <div className="flex gap-3 px-1 mt-1">
                  <Skeleton variant="circle" className="w-8 h-8 shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton variant="text" className="w-5/6 h-3" />
                    <Skeleton variant="text" className="w-1/2 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-brand-surface/20 border border-brand-border/40 rounded-xl"
              >
                <Skeleton variant="rectangle" className="w-full sm:w-64 aspect-video shrink-0" />
                <div className="flex-1 flex flex-col gap-3 py-1">
                  <div className="flex flex-col gap-2">
                    <Skeleton variant="text" className="w-3/4 h-4" />
                    <Skeleton variant="text" className="w-1/3 h-3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton variant="circle" className="w-6 h-6" />
                    <Skeleton variant="text" className="w-24 h-3" />
                  </div>
                  <Skeleton variant="text" className="w-full h-3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        )
      ) : filteredHistory.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8 bg-brand-surface/10">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4 shadow-inner">
            <History size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            {searchQuery ? "No matching videos" : "Your watch history is empty"}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {searchQuery
              ? "Try adjusting your search keywords to find what you are looking for."
              : "Videos you watch will show up here. Go explore and start watching!"}
          </p>
        </div>
      ) : (
        /* Main watch history list */
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHistory.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredHistory.map((video) => {
              if (!video) return null;
              const {
                _id,
                title,
                thumbnail,
                durationInMinutes,
                views,
                createdAt,
                description,
                owner,
              } = video;

              return (
                <div
                  key={_id}
                  className="group flex flex-col sm:flex-row gap-5 p-4 bg-brand-surface/20 border border-brand-border/40 hover:border-brand-border hover:bg-brand-surface/30 rounded-xl transition-all duration-200"
                >
                  {/* Video Thumbnail (Left Side) */}
                  <Link
                    to={`/watch/${_id}`}
                    className="w-full sm:w-64 aspect-video rounded-lg overflow-hidden bg-zinc-800 border border-brand-border relative block shrink-0"
                  >
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-brand-surface">
                        <Play size={24} fill="currentColor" />
                      </div>
                    )}
                    {durationInMinutes && (
                      <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold text-white">
                        {durationInMinutes} min
                      </span>
                    )}
                  </Link>

                  {/* Video Info (Right Side) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 gap-2">
                    <div>
                      {/* Title */}
                      <Link
                        to={`/watch/${_id}`}
                        className="text-base font-bold text-white hover:text-brand-accent transition-colors line-clamp-2 leading-snug"
                      >
                        {title}
                      </Link>

                      {/* Views & Date */}
                      <div className="text-xs text-zinc-500 font-medium flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {views} views
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Owner Details */}
                    {owner && (
                      <div className="flex items-center gap-2.5 my-1">
                        <Link to={`/c/${owner.username}`}>
                          <Avatar
                            src={owner.avatar}
                            name={owner.fullname || owner.username}
                            size="sm"
                            className="hover:border-zinc-500 transition-colors border border-transparent"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            to={`/c/${owner.username}`}
                            className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                          >
                            {owner.fullname}
                          </Link>
                          <span className="text-[10px] text-zinc-500">@{owner.username}</span>
                        </div>
                      </div>
                    )}

                    {/* Description snippet */}
                    {description && (
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
