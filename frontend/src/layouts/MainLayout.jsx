import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ThumbsUp, 
  ListVideo, 
  Settings, 
  Tv, 
  Search, 
  Upload, 
  Sun, 
  User, 
  LogOut, 
  Play, 
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Placeholder upload state (hooked to Phase 3 UploadDialog)
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    // TODO: Backend Integration
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Subscriptions', path: '/subscriptions', icon: Users },
    { name: 'Liked Videos', path: '/liked-videos', icon: ThumbsUp },
    { name: 'Playlists', path: '/playlists', icon: ListVideo },
    { name: 'Creator Studio', path: '/studio', icon: Tv },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-sans selection:bg-brand-accent/20 selection:text-white">
      {/* Top Navbar */}
      <header className="h-16 border-b border-brand-border bg-brand-bg/85 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between gap-4">
        {/* Brand Logo & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white hidden md:flex items-center justify-center"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu size={18} />
          </button>
          
          <Link to="/" className="flex items-center gap-2 select-none">
            <div className="bg-brand-accent p-1.5 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(255,61,61,0.15)]">
              <Play size={14} fill="currentColor" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight font-display text-white">
              Vid<span className="text-brand-accent">Verse</span>
            </span>
          </Link>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search videos, creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-accent transition-colors"
          />
          <Search size={16} className="absolute left-3.5 text-zinc-500" />
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile search navigation trigger */}
          <Link to="/search" className="sm:hidden p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <Search size={18} />
          </Link>

          {/* Upload Button */}
          <button 
            onClick={() => {
              // TODO: Backend Integration
              toast('Opening Upload Workspace...', { icon: '📤' });
              setIsUploadOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-accent hover:bg-brand-accent/90 transition-colors text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm"
          >
            <Upload size={14} />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Theme Toggle Placeholder */}
          <button 
            onClick={() => toast('Theme selection details / TODO: Dark/Light Mode', { icon: '🌓' })}
            className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Theme Selection"
          >
            <Sun size={18} />
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-surface border border-brand-border hover:border-brand-accent transition-colors focus:outline-none overflow-hidden text-sm font-bold text-white uppercase"
            >
              U
            </button>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
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

      {/* Main Layout Body */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Desktop & Tablet */}
        <aside className={`border-r border-brand-border bg-brand-bg transition-all duration-300 hidden md:block shrink-0 ${isSidebarCollapsed ? 'w-16' : 'w-60'}`}>
          <div className="sticky top-16 p-3 flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium ${
                    isActive 
                      ? 'bg-brand-accent text-white font-semibold shadow-md shadow-brand-accent/10' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={isSidebarCollapsed ? link.name : ''}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'} />
                  {!isSidebarCollapsed && <span>{link.name}</span>}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Dynamic Route Content Area */}
        <main className="flex-1 min-w-0 pb-20 md:pb-6 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet context={{ isUploadOpen, setIsUploadOpen }} />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-brand-surface border-t border-brand-border z-40 md:hidden flex items-center justify-around px-2">
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
                isActive ? 'text-brand-accent' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] mt-1 font-medium tracking-tight">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
