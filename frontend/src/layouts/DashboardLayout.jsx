import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Video,
  ArrowLeft,
  LogOut,
  Play,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Backend Integration
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const studioLinks = [
    { name: "Dashboard", path: "/studio", icon: BarChart3, exact: true },
    { name: "My Videos", path: "/studio/videos", icon: Video, exact: false },
  ];

  const isActiveLink = (link) => {
    if (link.exact) {
      return location.pathname === link.path;
    }
    return location.pathname.startsWith(link.path);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-sans">
      {/* Studio Header */}
      <header className="h-16 border-b border-brand-border bg-brand-surface sticky top-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors md:hidden flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link to="/studio" className="flex items-center gap-2 select-none">
            <div className="bg-brand-accent p-1.5 rounded-md flex items-center justify-center">
              <Play size={14} fill="currentColor" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight font-display text-white">
              Studio
            </span>
          </Link>
          <span className="text-zinc-500 text-sm hidden sm:inline-block">
            / Creator Workspace
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/5 transition-colors text-zinc-300 hover:text-white text-xs sm:text-sm font-medium rounded-lg border border-brand-border"
          >
            <ArrowLeft size={14} />
            <span>Streaming</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-bg border border-brand-border hover:border-brand-accent transition-colors focus:outline-none overflow-hidden text-sm font-bold text-white"
            >
              C
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2.5 w-48 bg-brand-surface border border-brand-border rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User size={15} />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings size={15} />
                    Settings
                  </Link>
                  <div className="border-t border-brand-border my-1.5" />
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-colors text-left font-medium"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Left Sidebar - Desktop */}
        <aside className="w-60 border-r border-brand-border bg-brand-surface hidden md:block shrink-0">
          <div className="sticky top-16 p-3 flex flex-col gap-1.5 h-[calc(100vh-4rem)]">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3.5 mb-2 select-none">
              Creator Studio
            </div>

            {studioLinks.map((link) => {
              const Icon = link.icon;
              const active = isActiveLink(link);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium ${
                    active
                      ? "bg-brand-accent text-white font-semibold shadow-md shadow-brand-accent/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-white" : "text-zinc-400"}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="fixed left-0 top-16 bottom-0 w-64 bg-brand-surface border-r border-brand-border z-50 p-4 animate-in slide-in-from-left duration-200 md:hidden">
              <div className="flex flex-col gap-1.5">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3.5 mb-2 select-none">
                  Creator Studio
                </div>

                {studioLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActiveLink(link);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium ${
                        active
                          ? "bg-brand-accent text-white font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </>
        )}

        {/* Dashboard Content Outlet */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
