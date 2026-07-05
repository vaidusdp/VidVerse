import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Heart, ListPlus, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

import videoServices from '../services/video.services';

import VideoPlayer from '../components/video/VideoPlayer';
import CommentCard from '../components/comment/CommentCard';
import VideoCard from '../components/video/VideoCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import playlistService from '../services/playlist.services';
import likeServices from '../services/like.services';
import subscribeService from '../services/subscribe.services';
import commentServices from '../services/comment.services';
import useAuthStore from "../store/auth.store";
import SaveToPlaylistModal from '../components/playlist/SaveToPlaylistModal';

export default function WatchVideo() {
  const user = useAuthStore((state) => state.user);

  const { videoId } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const [isTheaterMode, setIsTheaterMode] = useState(false);
  
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubmitComment, setIsSubmitComment] = useState(false);  

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);

  const [isAddingToPlaylist, setIsAddingToPlaylist] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await videoServices.getVideoById(videoId);
        setVideo(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to fetch video."
        );
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentServices.getVideoComments(videoId);
        setComments(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to fetch comments."
        );
      }
    }

    fetchComments();
  }, [videoId])

  useEffect(() => {
    const fetchReccomendation = async () => {
      try {
        const response = await videoServices.getReccomendedVideo(videoId);
        setRecommendations(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to fetch reccomended videos."
        );
      }
    }

    fetchReccomendation();
  }, [videoId])

  const handleSubscribe = async () => {
    try {
      setIsSubscribing(true);
      await subscribeService.toggleSubscribe(video.owner._id);
      setVideo(prev => ({
        ...prev,
        owner: {
          ...prev.owner,
          isSubscribed: !prev.owner.isSubscribed,
          subscribersCount: prev.owner.isSubscribed
            ? prev.owner.subscribersCount - 1
            : prev.owner.subscribersCount + 1,
        }
      }));

      toast.success(
        video.owner.isSubscribed
          ? "Unsubscribed successfully"
          : "Subscribed successfully"
      );
    } catch (error) {
        toast.error(
        error.response?.data?.message ||
        "Failed to update subscription."
      );
    } finally {
      setIsSubscribing(false);
    }
  }

  const handleCommentSubmit = async (data) => {
    if (!data.commentContent.trim()) return;
    
    try {
      setIsSubmitComment(true);
      const response = await commentServices.publishComment(videoId, {
        commentContent: data.commentContent 
      });

      setComments(prev => ([response.data, ...prev]))
      toast.success("Comment added successfully");
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to post comment."
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentServices.deleteComment(commentId);

      setComments(prev =>
        prev.filter(comment => comment._id !== commentId)
      );

      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete comment."
      );
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const response = await commentServices.updateComment(commentId, {
        updatedContent: content,
      });

      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? response.data
            : comment
        )
      );

      toast.success("Comment updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update comment."
      );
    }
  };

  const handleToggleLike = async () => {
    try {
      await likeServices.toggleVideoLike(video._id);

      setVideo(prev => ({...prev, isLiked: !prev.isLiked, likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1}))
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update like."
      );
    }
  };

  const handleSaveToPlaylist = async () => {
    try {
      setPlaylistLoading(true);

      const response = await playlistService.getUserPlaylists(user._id);

      setPlaylists(response.data);

      setIsPlaylistModalOpen(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch playlists."
      );
    } finally {
      setPlaylistLoading(false);
    }
  };

  const handleTogglePlaylist = async (playlistId, checked) => {
    try {
      if (checked) {
        await playlistService.deleteVideoFromPlaylist(
          playlistId,
          videoId
        );
      } else {
        await playlistService.addVideoToPlaylist(
          playlistId,
          videoId
        );
      }

      setPlaylists(prev =>
        prev.map(playlist => {
          if (playlist._id !== playlistId) return playlist;

          if (checked) {
            return {
              ...playlist,
              videos: playlist.videos.filter(
                video => video._id !== videoId
              ),
            };
          }

          return {
            ...playlist,
            videos: [
              ...playlist.videos,
              { _id: videoId },
            ],
          };
        })
      );

      toast.success(
        checked
          ? "Removed from playlist"
          : "Added to playlist"
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update playlist."
      );
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Video link copied to clipboard!');
  };

  const handleCommentLike = async (commentId) => {
    try {
      await likeServices.toggleCommentLike(commentId);
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likesCount: comment.isLiked
                  ? comment.likesCount - 1
                  : comment.likesCount + 1,
              }
            : comment
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update like."
      );
    }
  }


  return (
    <div className="font-sans text-white flex flex-col gap-6">  
      {/* Upper Section: Theater Mode vs Standard grid */}
      <div className={`grid grid-cols-1 ${isTheaterMode ? 'w-full' : 'lg:grid-cols-3'} gap-6`}>
        {/* Main Video Segment */}
        <div className={isTheaterMode ? 'w-full' : 'lg:col-span-2'}>
          {/* Custom Video Player */}
          <VideoPlayer 
            src={video?.videoFile} 
            poster={video?.thumbnail}
            onTheaterModeToggle={setIsTheaterMode}
          />

          {/* Under-Player Metadata & Details */}
          {video === null ? (
            /* Loading Details skeleton */
            <div className="flex flex-col gap-4 mt-5">
              <Skeleton variant="text" className="w-3/4 h-5" />
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4">
                <div className="flex items-center gap-3">
                  <Skeleton variant="circle" className="w-10 h-10" />
                  <div className="flex flex-col gap-1">
                    <Skeleton variant="text" className="w-24 h-3.5" />
                    <Skeleton variant="text" className="w-16 h-3" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton variant="rectangle" className="w-20 h-8" />
                  <Skeleton variant="rectangle" className="w-20 h-8" />
                </div>
              </div>
              <Skeleton variant="rectangle" className="w-full h-24" />
            </div>
          ) : (
            /* Populated video metadata details */
            <div className="flex flex-col gap-4 mt-5">
              {/* TODO: Backend Integration */}
              <h1 className="text-xl font-bold text-white leading-snug">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4">
                {/* Channel / Subscriber Info */}
                <div className="flex items-center gap-3">
                {video.owner && (
                  <Link
                    to={`/c/${video.owner.username}`}
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <Avatar
                      src={video.owner.avatar}
                      name={video.owner.fullname}
                      size="md"
                    />

                    <div>
                      <h4 className="text-sm font-semibold text-white hover:text-brand-accent transition-colors">
                        {video.owner.fullname}
                      </h4>

                      <p className="text-xs text-zinc-400">
                        {video.owner.subscribersCount} subscribers
                      </p>
                    </div>
                  </Link>
                )}

                <Button
                  size="sm"
                  className="ml-2"
                  disabled={isSubscribing}
                  variant={video.owner.isSubscribed ? "secondary" : "primary"}
                  onClick={handleSubscribe}
                >
                  {video.owner.isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>

                {/* Video Action Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Heart}
                    onClick={handleToggleLike}
                    className={video.isLiked ? "text-brand-accent border-brand-accent/20 bg-brand-accent/5" : ""}
                  >
                    {video.likesCount}
                  </Button>
                  <Button variant="secondary" size="sm" icon={ListPlus} onClick={handleSaveToPlaylist}>
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" icon={Share2} onClick={handleShare}>
                    Share
                  </Button>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-brand-surface border border-brand-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold mb-2">
                  <span>{video.views} views</span>
                  <span>&bull;</span>
                  <span>{new Date(video.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-8 flex flex-col gap-6">
            <h3 className="text-base font-semibold text-white">Comments</h3>

            {/* Comment Form Input */}
            <form onSubmit={handleSubmit(handleCommentSubmit)} className="flex items-start gap-4">
              <Avatar name="Me" size="sm" />
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  placeholder="Add a public comment..."
                  rows={2}
                  {...register('commentContent', { required: true })}
                  className="w-full bg-transparent border-b border-brand-border focus:border-white focus:outline-none text-sm text-white py-1 transition-colors resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm">
                    Comment
                  </Button>
                </div>
              </div>
            </form>

            {/* Comments Lists */}
            {comments === null ? (
              /* Comments loading state skeleton */
              <div className="flex flex-col gap-4 mt-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border border-brand-border rounded-xl">
                    <Skeleton variant="circle" className="w-8 h-8" />
                    <div className="flex-1 flex flex-col gap-2">
                      <Skeleton variant="text" className="w-24 h-3.5" />
                      <Skeleton variant="text" className="w-full h-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              /* Comments empty state */
              <p className="text-xs text-zinc-500 py-6 text-center">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              /* Comments populated state */
              <div className="flex flex-col gap-4 mt-2">
                {/* TODO: Backend Integration */}
                {comments.map((comment) => (
                  <CommentCard key={comment._id} comment={comment} onDelete={handleDeleteComment} onEdit={handleEditComment} onLike={handleCommentLike} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side Column: Recommendations (Only visible in standard grid) */}
        {!isTheaterMode && (
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-zinc-400 select-none uppercase tracking-wider mb-1">
              Up Next
            </h3>

            {recommendations === null ? (
              /* Recommendations loading skeletons */
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-2.5">
                    <Skeleton variant="rectangle" className="aspect-video w-full" />
                    <div className="flex gap-3 mt-1">
                      <Skeleton variant="circle" className="w-7 h-7" />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <Skeleton variant="text" className="w-5/6 h-3" />
                        <Skeleton variant="text" className="w-1/2 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations.length === 0 ? (
              /* Recommendations empty state */
              <p className="text-xs text-zinc-500 py-6 text-center">
                No recommendations available.
              </p>
            ) : (
              /* Recommendations populated state */
              <div className="flex flex-col gap-4">
                {/* TODO: Backend Integration */}
                {recommendations.map((rec) => (
                  <VideoCard key={rec._id} video={rec} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Recommendations drawer when Theater mode is active */}
      {isTheaterMode && (
        <div className="border-t border-brand-border pt-8 mt-6">
          <h3 className="text-sm font-semibold text-zinc-400 select-none uppercase tracking-wider mb-4">
            Recommended Videos
          </h3>
          {recommendations === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                  <Skeleton variant="rectangle" className="aspect-video w-full" />
                  <div className="flex gap-3 mt-1">
                    <Skeleton variant="circle" className="w-7 h-7" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <Skeleton variant="text" className="w-5/6 h-3" />
                      <Skeleton variant="text" className="w-1/2 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* TODO: Backend Integration */}
              {recommendations.map((rec) => (
                <VideoCard key={rec.id} video={rec} />
              ))}
            </div>
          )}
        </div>
      )}
      <SaveToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        playlists={playlists}
        loading={playlistLoading}
        currentVideoId={videoId}
        onTogglePlaylist={handleTogglePlaylist}
      />
    </div>
  );
}
