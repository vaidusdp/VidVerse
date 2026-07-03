import React, { useState } from 'react';
import { Heart, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';

// TODO: Backend Integration
export default function CommentCard({ 
  comment, 
  onEdit, 
  onDelete,
  currentUserUsername
}) {
  if (!comment) return null;

  const {
    id,
    content,
    createdAt,
    likesCount,
    isLiked,
    owner
  } = comment;

  const isOwner = currentUserUsername === owner?.username;

  return (
    <div className="flex gap-4 p-4 bg-brand-surface/30 hover:bg-brand-surface/50 border border-brand-border rounded-xl font-sans transition-colors group">
      {/* User Avatar */}
      {owner && (
        <Avatar 
          src={owner.avatar} 
          name={owner.fullname || owner.username} 
          size="sm" 
        />
      )}

      {/* Comment Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-white">
              {owner?.fullname || owner?.username}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              {createdAt}
            </span>
          </div>

          {/* Action Trigger for comment owner */}
          {isOwner && (
            <Dropdown
              trigger={
                <button className="p-1 hover:bg-white/5 rounded text-zinc-500 hover:text-white transition-colors">
                  <MoreVertical size={14} />
                </button>
              }
            >
              <button 
                onClick={() => onEdit?.(id, content)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <Edit2 size={12} />
                Edit
              </button>
              <button 
                onClick={() => onDelete?.(id)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/5 transition-colors text-left font-medium"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </Dropdown>
          )}
        </div>

        {/* Content */}
        <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>

        {/* Action buttons (Like, Reply placeholders) */}
        <div className="flex items-center gap-4 mt-3">
          <button 
            onClick={() => {
              // TODO: Backend Integration
            }}
            className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              isLiked ? 'text-brand-accent' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likesCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
