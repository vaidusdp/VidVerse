import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Compass, FolderHeart } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import Tabs from '../components/ui/Tabs';
import VideoCard from '../components/video/VideoCard';
import PlaylistCard from '../components/playlist/PlaylistCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import userServices from '../services/user.services';
import videoServices from '../services/video.services';
import subscribeService from '../services/subscribe.services';
import toast from 'react-hot-toast';
import playlistService from '../services/playlist.services';

export default function Channel() {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('videos');

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const responseChannel = await userServices.channelProfile(username);
        setChannel(responseChannel.data);
  
        const responseVideo = await videoServices.getChannelVideos(responseChannel.data._id);
        setVideos(responseVideo.data);

        const responsePlaylist = await playlistService.getUserPlaylists(responseChannel.data._id);
        setPlaylists(responsePlaylist.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch channel."
        );
      }
    }
    fetchChannel();
  }, [username]);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    try {
      await subscribeService.toggleSubscribe(channel._id);
      setChannel(prev => ({
        ...prev,
        isSubscribed: !prev.isSubscribed,
        subscribersCount: prev.isSubscribed
          ? prev.subscribersCount - 1
          : prev.subscribersCount + 1
      }));
      toast.success(channel.isSubscribed ? "Unsubscribed successfully" : "Subscribed Successfully")
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update subscription."
      );
    } finally {
      setIsSubscribing(false);
    }
  }

  const tabs = [
    { id: 'videos', label: 'Videos' },
    { id: 'playlists', label: 'Playlists' },
  ];

  return (
    <div className="font-sans text-white flex flex-col">
      {/* Banner Cover Image */}
      {channel === null ? (
        <Skeleton variant="rectangle" className="w-full h-32 sm:h-44 md:h-56 rounded-xl" />
      ) : (
        <div className="w-full h-32 sm:h-44 md:h-56 rounded-xl bg-zinc-800 border border-brand-border overflow-hidden">
          {channel.coverImage && (
            <img 
              src={channel.coverImage} 
              alt="Channel Cover Banner" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Profile Details header */}
      {channel === null ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 border-b border-brand-border pb-6 px-1">
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="w-16 h-16 sm:w-20 sm:h-20" />
            <div className="flex flex-col gap-2">
              <Skeleton variant="text" className="w-32 h-4" />
              <Skeleton variant="text" className="w-24 h-3" />
              <Skeleton variant="text" className="w-48 h-3" />
            </div>
          </div>
          <Skeleton variant="rectangle" className="w-24 h-9" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 border-b border-brand-border pb-6 px-1">
          <div className="flex items-center gap-4">
            <Avatar src={channel.avatar} name={channel.fullname} size="xl" />
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {channel.fullname}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                @{channel.username}
              </p>
              <div className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-1.5">
                <span>{channel.subscribersCount} subscribers</span>
                <span>&bull;</span>
                <span>{channel.videosCount} videos</span>
              </div>
            </div>
          </div>
          <Button disabled={isSubscribing} variant={channel.isSubscribed ? 'secondary' : 'primary'} onClick={handleSubscribe}>
            {channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      )}

      {/* Tabs list navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mt-4" />

      {/* Tab Panels */}
      <div className="py-6">
        {activeTab === 'videos' && (
          <div>
            {videos === null ? (
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
            ) : videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center max-w-sm mx-auto">
                <Compass size={24} className="text-zinc-500 mb-3" />
                <h4 className="text-sm font-semibold text-white">No videos published</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  This channel hasn't uploaded any videos yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* TODO: Backend Integration */}
                {videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            {playlists === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-2.5">
                    <Skeleton variant="rectangle" className="aspect-video w-full" />
                    <Skeleton variant="text" className="w-2/3 h-3.5 mt-2" />
                  </div>
                ))}
              </div>
            ) : playlists.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center max-w-sm mx-auto">
                <FolderHeart size={24} className="text-zinc-500 mb-3" />
                <h4 className="text-sm font-semibold text-white">No playlists found</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  This channel has no public playlists available.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* TODO: Backend Integration */}
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist._id} playlist={playlist} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
