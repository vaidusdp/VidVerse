import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function VideoCard({ video }) {
  if (!video) return null;

  const {
    _id,
    title,
    thumbnail,
    durationInMinutes,
    views,
    createdAt,
    owner,
  } = video;

  return (
    <div className="group flex flex-col gap-2.5 font-sans">
      {/* Thumbnail */}
      <Link
        to={`/watch/${_id}`}
        className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-800 border border-brand-border relative block"
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-brand-surface">
            <Play size={24} fill="currentColor" />
          </div>
        )}

        {durationInMinutes && (
          <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wider text-white">
            {durationInMinutes} min
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex gap-3 px-1">
        {owner && (
          <Link to={`/c/${owner._id}`} className="mt-0.5">
            <Avatar
              src={owner.avatar}
              name={owner.fullname || owner.username}
              size="sm"
              className="hover:border-zinc-500 transition-colors"
            />
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <Link
            to={`/watch/${_id}`}
            className="text-sm font-semibold text-white line-clamp-2 hover:text-brand-accent transition-colors leading-snug"
          >
            {title}
          </Link>

          {owner && (
            <Link
              to={`/c/${owner.username}`}
              className="text-xs text-zinc-400 hover:text-white transition-colors block mt-1"
            >
              {owner.fullname}
            </Link>
          )}

          <div className="text-[11px] sm:text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-0.5">
            <span>{views} views</span>
            <span>&bull;</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 