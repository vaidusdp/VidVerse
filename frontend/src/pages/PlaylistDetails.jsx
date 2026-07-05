import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Trash2, Edit2, ListVideo } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import EditPlaylistDialog from "../components/playlist/EditPlaylistDialog";

import playlistService from "../services/playlist.services";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await playlistService.getPlaylist(playlistId);
        setPlaylist(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load playlist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await playlistService.deletePlaylist(playlistId);

      toast.success("Playlist deleted");
      navigate("/playlists");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      await playlistService.deleteVideoFromPlaylist(playlistId, videoId);

      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));

      toast.success("Video removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  if (loading || !playlist) {
    return (
      <div className="grid lg:grid-cols-3 gap-6">
        <Skeleton variant="rectangle" className="h-80 rounded-xl" />
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangle" className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 text-white">

      {/* Left */}

      <div className="bg-brand-surface border border-brand-border rounded-xl p-5 h-fit sticky top-20">

        <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900">
          {playlist.videos?.length ? (
            <img
              src={playlist.videos[0].thumbnail}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ListVideo size={42} className="text-zinc-500" />
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mt-4">
          {playlist.name}
        </h2>

        <p className="text-xs text-zinc-500 mt-1">
          {playlist.videos?.length || 0} videos •{" "}
          {new Date(playlist.createdAt).toLocaleDateString()}
        </p>

        {playlist.description && (
          <p className="text-sm text-zinc-400 mt-4">
            {playlist.description}
          </p>
        )}

        <div className="flex gap-3 mt-6">

          <Button
            variant="secondary"
            className="flex-1"
            icon={Edit2}
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            className="flex-1"
            icon={Trash2}
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </Button>

        </div>
      </div>

      {/* Right */}

      <div className="lg:col-span-2 flex flex-col gap-3">

        {!playlist.videos?.length ? (
          <div className="border border-brand-border rounded-xl p-12 text-center">
            <ListVideo size={32} className="mx-auto text-zinc-500 mb-3" />
            <h3>No videos in playlist</h3>
          </div>
        ) : (
          playlist.videos.map((video, index) => (
            <div
              key={video._id}
              className="flex items-center gap-4 border border-brand-border rounded-xl p-3"
            >
              <span className="w-6 text-zinc-500">
                {index + 1}
              </span>

              <Link to={`/watch/${video._id}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-44 aspect-video rounded-lg object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/watch/${video._id}`}
                  className="font-semibold hover:text-brand-accent line-clamp-2"
                >
                  {video.title}
                </Link>

                <p className="text-sm text-zinc-400 mt-1">
                  {video.owner?.fullname}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  {video.views} views •{" "}
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Button
                variant="ghost"
                icon={Trash2}
                onClick={() => handleRemoveVideo(video._id)}
              />
            </div>
          ))
        )}

      </div>

      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        title="Delete Playlist?"
        message="This action cannot be undone."
      />

      <EditPlaylistDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        playlist={playlist}
        onUpdated={setPlaylist}
      />
    </div>
  );
}