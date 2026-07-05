import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

import playlistService from "../../services/playlist.services";

export default function EditPlaylistDialog({
  isOpen,
  onClose,
  playlist,
  onUpdated,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (playlist) {
      reset({
        name: playlist.name,
        description: playlist.description,
      });
    }
  }, [playlist, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await playlistService.updatePlaylist(
        playlist._id,
        data
      );

      onUpdated(response.data);

      toast.success("Playlist updated successfully");

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update playlist."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Playlist"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <Input
          label="Playlist Name"
          placeholder="Playlist Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Playlist name is required",
          })}
        />

        <Textarea
          label="Description"
          rows={4}
          placeholder="Playlist description..."
          {...register("description")}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}