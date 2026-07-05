import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import api from "./api/axios";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Visual Route Wrappers
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// Pages
import Home from "./pages/Home";
import WatchVideo from "./pages/WatchVideo";
import Channel from "./pages/Channel";
import Subscriptions from "./pages/Subscriptions";
import LikedVideos from "./pages/LikedVideos";
import WatchHistory from "./pages/WatchHistory";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreatorDashboard from "./pages/CreatorDashboard";
import MyVideos from "./pages/MyVideos";

import useAuthStore from "./store/auth.store";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "bg-zinc-900 text-white border border-white/5 rounded-lg text-sm font-sans",
          duration: 3000,
        }}
      />

      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<WatchVideo />} />
            <Route path="/c/:username" element={<Channel />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/history" element={<WatchHistory />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route
              path="/playlists/:playlistId"
              element={<PlaylistDetails />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/studio" element={<DashboardLayout />}>
            <Route index element={<CreatorDashboard />} />
            <Route path="videos" element={<MyVideos />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
