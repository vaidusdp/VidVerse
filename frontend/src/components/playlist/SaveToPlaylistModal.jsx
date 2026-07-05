import React from "react";
import Modal from "../ui/Modal";
import Skeleton from "../ui/Skeleton";

export default function SaveToPlaylistModal({
  isOpen,
  onClose,
  playlists = [],
  loading = false,
  currentVideoId,
  onTogglePlaylist,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save to Playlist"
    >
      <div className="flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-brand-border rounded-xl p-3"
            >
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton variant="text" className="w-32 h-4" />
                <Skeleton variant="text" className="w-20 h-3" />
              </div>

              <Skeleton
                variant="rectangle"
                className="w-5 h-5 rounded"
              />
            </div>
          ))
        ) : playlists.length === 0 ? (
          <div className="py-8 text-center text-sm text-zinc-500">
            No playlists found.
          </div>
        ) : (
          playlists.map((playlist) => {
            const checked = playlist.videos?.some(
              (video) => video._id === currentVideoId
            );

            return (
              <label
                key={playlist._id}
                className="flex items-center justify-between rounded-xl border border-brand-border p-3 cursor-pointer hover:bg-brand-surface transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {playlist.name}
                  </h4>

                  <p className="mt-1 text-xs text-zinc-500">
                    {playlist.videos?.length || 0} videos
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onTogglePlaylist(
                      playlist._id,
                      checked
                    )
                  }
                  className="h-5 w-5 cursor-pointer accent-brand-accent"
                />
              </label>
            );
          })
        )}
      </div>
    </Modal>
  );
}