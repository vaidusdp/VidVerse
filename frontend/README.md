# Frontend Project Documentation

This document provides the full directory tree structure and source code file contents for the frontend project to serve as context.

## Directory Structure

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   └── endpoints.js
│   ├── assets/
│   ├── components/
│   │   ├── channel/
│   │   │   └── ChannelCard.jsx
│   │   ├── comment/
│   │   │   └── CommentCard.jsx
│   │   ├── dashboard/
│   │   │   └── DashboardCard.jsx
│   │   ├── playlist/
│   │   │   └── PlaylistCard.jsx
│   │   ├── ui/
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ConfirmationDialog.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Tabs.jsx
│   │   │   └── Textarea.jsx
│   │   ├── video/
│   │   │   ├── UploadDialog.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   └── VideoPlayer.jsx
│   │   ├── GuestRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Channel.jsx
│   │   ├── CreatorDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LikedVideos.jsx
│   │   ├── Login.jsx
│   │   ├── MyVideos.jsx
│   │   ├── NotFound.jsx
│   │   ├── PlaylistDetails.jsx
│   │   ├── Playlists.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Settings.jsx
│   │   ├── Subscriptions.jsx
│   │   └── WatchVideo.jsx
│   ├── services/
│   │   └── auth.services.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
└── vite.config.js
```

## File Contents

### [.env](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/.env)

```plaintext
VITE_API_URL=http://localhost:8000/api/v1
```

### [.gitignore](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/.gitignore)

```plaintext
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### [.oxlintrc.json](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/.oxlintrc.json)

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

### [index.html](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/index.html)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VidVerse — Premium Creator Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#09090b] text-[#ffffff] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### [package.json](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/package.json)

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.18.1",
    "framer-motion": "^12.42.2",
    "lucide-react": "^1.23.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.80.0",
    "react-hot-toast": "^2.6.0",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "tailwindcss": "^4.3.2",
    "vite": "^8.1.1"
  }
}
```

### [src\api\axios.js](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/api/axios.js)

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;
```

### [src\api\endpoints.js](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/api/endpoints.js)

```javascript

```

### [src\App.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/App.jsx)

```javascript
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
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreatorDashboard from "./pages/CreatorDashboard";
import MyVideos from "./pages/MyVideos";

export default function App() {
  useEffect(() => {
    console.log("Base URL:", api.defaults.baseURL);
  }, []);

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
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route
              path="/playlists/:playlistId"
              element={<PlaylistDetails />}
            />
            <Route path="/settings" element={<Settings />} />
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
```

### [src\components\channel\ChannelCard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/channel/ChannelCard.jsx)

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

// TODO: Backend Integration
export default function ChannelCard({ channel, onToggleSubscribe }) {
  if (!channel) return null;

  const {
    username,
    fullname,
    avatar,
    subscribersCount,
    videosCount,
    isSubscribed
  } = channel;

  return (
    <div className="flex items-center justify-between gap-4 p-4 border border-brand-border bg-brand-surface/30 rounded-xl hover:bg-brand-surface/50 transition-colors font-sans">
      <Link to={`/c/${username}`} className="flex items-center gap-4 min-w-0">
        <Avatar src={avatar} name={fullname || username} size="lg" />
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-white truncate hover:underline">
            {fullname || username}
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">
            @{username}
          </p>
          <div className="text-[11px] sm:text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-1">
            <span>{subscribersCount} subscribers</span>
            <span>&bull;</span>
            <span>{videosCount} videos</span>
          </div>
        </div>
      </Link>

      <Button
        variant={isSubscribed ? 'secondary' : 'primary'}
        size="sm"
        onClick={() => onToggleSubscribe?.(username)}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
}
```

### [src\components\comment\CommentCard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/comment/CommentCard.jsx)

```javascript
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
```

### [src\components\dashboard\DashboardCard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/dashboard/DashboardCard.jsx)

```javascript
import React from 'react';
import Card from '../ui/Card';

// TODO: Backend Integration
export default function DashboardCard({ title, value, description, icon: Icon }) {
  return (
    <Card hoverable={false} className="flex items-start justify-between gap-4 font-sans bg-brand-surface">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-zinc-400 select-none uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-bold text-white mt-1.5 tabular-nums">
          {value !== undefined ? value : '—'}
        </span>
        {description && (
          <span className="text-xs text-zinc-500 font-medium mt-1">
            {description}
          </span>
        )}
      </div>

      {Icon && (
        <div className="bg-brand-bg p-2.5 rounded-lg border border-brand-border text-zinc-400">
          <Icon size={18} />
        </div>
      )}
    </Card>
  );
}
```

### [src\components\GuestRoute.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/GuestRoute.jsx)

```javascript
import React from 'react';
import { Outlet } from 'react-router-dom';

// TODO: Backend Authentication
export default function GuestRoute() {
  return <Outlet />;
}
```

### [src\components\playlist\PlaylistCard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/playlist/PlaylistCard.jsx)

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ListVideo } from 'lucide-react';

// TODO: Backend Integration
export default function PlaylistCard({ playlist }) {
  if (!playlist) return null;

  const { id, name, description, videosCount, thumbnail } = playlist;

  return (
    <Link 
      to={`/playlists/${id}`} 
      className="group flex flex-col gap-2 font-sans relative"
    >
      {/* Visual Folder Stack effect */}
      <div className="relative aspect-video w-full rounded-lg bg-zinc-800 border border-brand-border overflow-hidden select-none">
        {/* Layer Stack Backings */}
        <div className="absolute top-0 left-2 right-2 -translate-y-[4px] h-full bg-zinc-700/50 rounded-lg -z-10 border-t border-white/5 transition-transform group-hover:-translate-y-[6px]" />
        <div className="absolute top-0 left-4 right-4 -translate-y-[8px] h-full bg-zinc-600/30 rounded-lg -z-20 border-t border-white/5 transition-transform group-hover:-translate-y-[11px]" />
        
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-brand-surface">
            <ListVideo size={32} />
          </div>
        )}

        {/* Overlay showing play list tag */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-brand-accent p-2.5 rounded-full flex items-center justify-center text-white shadow-lg">
            <Play size={16} fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wider text-white flex items-center gap-1.5">
          <ListVideo size={12} />
          <span>{videosCount || 0} videos</span>
        </div>
      </div>

      {/* Playlist metadata */}
      <div className="px-1 mt-1">
        <h4 className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors truncate">
          {name}
        </h4>
        {description && (
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
```

### [src\components\ProtectedRoute.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ProtectedRoute.jsx)

```javascript
import React from 'react';
import { Outlet } from 'react-router-dom';

// TODO: Backend Authentication
export default function ProtectedRoute() {
  return <Outlet />;
}
```

### [src\components\ui\Avatar.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Avatar.jsx)

```javascript
import React from 'react';

export default function Avatar({ src, name = 'U', size = 'md', className = '' }) {
  const getInitials = (n) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-16 h-16 text-lg font-bold',
    xl: 'w-24 h-24 text-2xl font-extrabold',
  };

  return (
    <div 
      className={`rounded-full shrink-0 flex items-center justify-center border border-brand-border bg-zinc-800 text-zinc-300 overflow-hidden select-none ${sizes[size]} ${className}`}
    >
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
```

### [src\components\ui\Badge.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Badge.jsx)

```javascript
import React from 'react';

export default function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    accent: 'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
    gray: 'bg-zinc-800 text-zinc-300 border-zinc-700/50',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wide border uppercase select-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

### [src\components\ui\Button.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Button.jsx)

```javascript
import React from 'react';
import Loader from './Loader'; // We'll write Loader soon

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-sm',
    secondary: 'bg-brand-surface border border-brand-border text-zinc-300 hover:text-white hover:bg-white/5',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader size="sm" className="mr-1" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : null}
      {children}
    </button>
  );
}
```

### [src\components\ui\Card.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Card.jsx)

```javascript
import React from 'react';

export default function Card({ children, className = '', hoverable = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-brand-card border border-brand-border rounded-xl p-5 overflow-hidden transition-all duration-200 ${
        hoverable ? 'hover:border-zinc-700/60 hover:-translate-y-[1px]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
```

### [src\components\ui\ConfirmationDialog.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/ConfirmationDialog.jsx)

```javascript
import React from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isConfirming = false,
  variant = 'danger'
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-5 font-sans">
        <p className="text-sm text-zinc-400 leading-relaxed">
          {message}
        </p>
        
        <div className="flex items-center justify-end gap-3 mt-2">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            onClick={onConfirm} 
            isLoading={isConfirming}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

### [src\components\ui\Dropdown.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Dropdown.jsx)

```javascript
import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({ trigger, children, align = 'right', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-48 bg-brand-surface border border-brand-border rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
```

### [src\components\ui\Input.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Input.jsx)

```javascript
import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {label && (
        <label className="text-xs font-semibold text-zinc-400 select-none">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-brand-surface border rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-brand-border focus:border-brand-accent'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 mt-0.5 animate-in fade-in duration-100">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
```

### [src\components\ui\Loader.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Loader.jsx)

```javascript
import React from 'react';

export default function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizes[size]} border-zinc-700 border-t-brand-accent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
```

### [src\components\ui\Modal.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Modal.jsx)

```javascript
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className={`relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 max-h-[75vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

### [src\components\ui\Pagination.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Pagination.jsx)

```javascript
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6 font-sans">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 bg-brand-surface border border-brand-border rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-medium text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 bg-brand-surface border border-brand-border rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
```

### [src\components\ui\SearchBar.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/SearchBar.jsx)

```javascript
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search...',
  className = '',
}) {
  return (
    <form onSubmit={onSubmit} className={`relative flex items-center w-full max-w-md ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-brand-surface border border-brand-border rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-accent transition-colors"
      />
      <Search size={16} className="absolute left-3.5 text-zinc-500" />
    </form>
  );
}
```

### [src\components\ui\Skeleton.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Skeleton.jsx)

```javascript
import React from 'react';

export default function Skeleton({ variant = 'rectangle', className = '', ...props }) {
  const baseStyle = 'bg-zinc-800 animate-pulse';
  
  const variants = {
    circle: 'rounded-full',
    text: 'h-4 rounded',
    rectangle: 'rounded-lg',
  };

  return (
    <div 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
```

### [src\components\ui\Tabs.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Tabs.jsx)

```javascript
import React from 'react';

export default function Tabs({ tabs = [], activeTab, onChange, className = '' }) {
  return (
    <div className={`border-b border-brand-border flex items-center gap-6 overflow-x-auto scrollbar-none font-sans ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-3 text-sm font-semibold border-b-2 transition-all relative select-none whitespace-nowrap focus:outline-none ${
              isActive 
                ? 'border-brand-accent text-white' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
```

### [src\components\ui\Textarea.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/ui/Textarea.jsx)

```javascript
import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  placeholder,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {label && (
        <label className="text-xs font-semibold text-zinc-400 select-none">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-brand-surface border rounded-lg px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
          error ? 'border-red-500 focus:border-red-500' : 'border-brand-border focus:border-brand-accent'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 mt-0.5 animate-in fade-in duration-100">
          {error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
```

### [src\components\video\UploadDialog.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/video/UploadDialog.jsx)

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadCloud, Film, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

export default function UploadDialog({ isOpen, onClose }) {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleVideoChange = (e) => {
    if (e.target.files?.[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files?.[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (data) => {
    if (!videoFile) {
      toast.error('Please select a video file to upload');
      return;
    }
    
    // TODO: Backend Integration
    toast.success('Upload workspace submitted! (TODO: Backend Integration)');
    
    // Reset Form
    reset();
    setVideoFile(null);
    setThumbnailFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Video" className="max-w-2xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6 font-sans">
        
        {/* Step 1: Video File Selection */}
        {!videoFile ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-brand-border hover:border-brand-accent/50 transition-colors rounded-xl p-10 text-center relative group">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-brand-bg p-4 rounded-full border border-brand-border text-zinc-400 group-hover:text-brand-accent transition-colors mb-4">
              <UploadCloud size={32} />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">
              Drag and drop video files
            </h4>
            <p className="text-xs text-zinc-500 max-w-xs">
              Your videos will remain private until you publish them. Supports MP4, MOV, or WebM formats.
            </p>
            <div className="mt-5">
              <Button variant="secondary" size="sm" className="pointer-events-none">
                Select File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-brand-surface rounded-lg border border-brand-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-brand-bg p-2 rounded-md border border-brand-border text-brand-accent">
                <Film size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate max-w-xs">
                  {videoFile.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVideoFile(null)}
              className="p-1 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Video metadata grid details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Metadata Inputs Column */}
          <div className="flex flex-col gap-4">
            <Input
              label="Video Title"
              placeholder="e.g. Building VidVerse Streaming Platform"
              error={errors.title?.message}
              {...register('title', { 
                required: 'A title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
            />

            <Textarea
              label="Description"
              placeholder="Tell viewers about your video..."
              rows={3}
              error={errors.description?.message}
              {...register('description')}
            />
          </div>

          {/* Thumbnail Dropzone Column */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 select-none">
              Video Thumbnail
            </label>
            
            {!thumbnailFile ? (
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-brand-border hover:border-brand-accent/50 rounded-lg p-5 text-center relative group min-h-[140px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <ImageIcon size={20} className="text-zinc-500 group-hover:text-brand-accent transition-colors mb-2" />
                <span className="text-[11px] font-semibold text-zinc-400">
                  Upload Image
                </span>
                <span className="text-[9px] text-zinc-600 mt-1 max-w-[140px]">
                  JPG or PNG, max 2MB
                </span>
              </div>
            ) : (
              <div className="flex-1 rounded-lg border border-brand-border bg-brand-surface overflow-hidden relative min-h-[140px] group/thumb">
                <img 
                  src={URL.createObjectURL(thumbnailFile)} 
                  alt="Thumbnail preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => setThumbnailFile(null)}
                    icon={X}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-brand-border pt-4 mt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Upload Video
          </Button>
        </div>
      </form>
    </Modal>
  );
}
```

### [src\components\video\VideoCard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/video/VideoCard.jsx)

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Avatar from '../ui/Avatar';

// TODO: Backend Integration
export default function VideoCard({ video }) {
  if (!video) return null;

  const {
    id,
    title,
    thumbnail,
    duration,
    views,
    createdAt,
    channel
  } = video;

  return (
    <div className="group flex flex-col gap-2.5 font-sans">
      {/* Thumbnail Container */}
      <Link 
        to={`/watch/${id}`} 
        className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-800 border border-brand-border relative block"
      >
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-brand-surface">
            <Play size={24} fill="currentColor" />
          </div>
        )}
        
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold tracking-wider text-white">
            {duration}
          </span>
        )}
      </Link>

      {/* Video Info */}
      <div className="flex gap-3 px-1">
        {channel && (
          <Link to={`/c/${channel.username}`} className="mt-0.5">
            <Avatar 
              src={channel.avatar} 
              name={channel.fullname || channel.username} 
              size="sm" 
              className="hover:border-zinc-500 transition-colors"
            />
          </Link>
        )}
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/watch/${id}`} 
            className="text-sm font-semibold text-white line-clamp-2 hover:text-brand-accent transition-colors leading-snug"
          >
            {title}
          </Link>
          
          {channel && (
            <Link 
              to={`/c/${channel.username}`} 
              className="text-xs text-zinc-400 hover:text-white transition-colors block mt-1"
            >
              {channel.fullname || channel.username}
            </Link>
          )}

          <div className="text-[11px] sm:text-xs text-zinc-500 font-medium flex items-center gap-1.5 mt-0.5">
            <span>{views} views</span>
            <span>&bull;</span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### [src\components\video\VideoPlayer.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/components/video/VideoPlayer.jsx)

```javascript
import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  MonitorPlay, 
  Layout, 
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function VideoPlayer({ src, poster, onTheaterModeToggle }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Player Controls State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls timer
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Sync state from HTML5 video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  // Action Controllers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleTimelineChange = (e) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const toggleTheater = () => {
    const nextTheater = !isTheater;
    setIsTheater(nextTheater);
    if (onTheaterModeToggle) {
      onTheaterModeToggle(nextTheater);
    }
  };

  const handlePictureInPicture = () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else {
      videoRef.current.requestPictureInPicture().catch(() => {
        toast.error('Picture-in-Picture not supported by your browser');
      });
    }
  };

  // Time Formatter
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Keyboard navigation helpers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only execute keyboard hotkeys if page cursor is focused on the document body
      if (document.activeElement !== document.body) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
          e.preventDefault();
          toggleTheater();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isTheater]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-brand-border select-none group/player"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* Centered Large Play/Pause Toggle Indicator */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer transition-opacity"
        >
          <div className="bg-brand-accent/95 p-5 rounded-full text-white shadow-xl hover:scale-105 transition-transform">
            <Play size={24} fill="currentColor" className="ml-0.5" />
          </div>
        </div>
      )}

      {/* Control Tray Overlay - Visible when hovered or paused */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Slider Bar */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleTimelineChange}
            className="w-full h-1 bg-zinc-700 accent-brand-accent rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
          />
        </div>

        {/* Lower Tray Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button onClick={togglePlay} className="hover:text-brand-accent transition-colors">
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            {/* Volume Control Box */}
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="hover:text-brand-accent transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 overflow-hidden group-hover/volume:w-16 h-1 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer transition-all duration-200"
              />
            </div>

            {/* Time Stamp text */}
            <div className="text-xs text-zinc-300 font-medium tabular-nums select-none">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-zinc-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Picture in Picture */}
            <button 
              onClick={handlePictureInPicture} 
              className="hover:text-brand-accent transition-colors"
              title="Picture in Picture"
            >
              <MonitorPlay size={18} />
            </button>

            {/* Theater Mode Toggle */}
            <button 
              onClick={toggleTheater} 
              className={`hover:text-brand-accent transition-colors ${isTheater ? 'text-brand-accent' : ''}`}
              title="Theater Mode (T)"
            >
              <Layout size={18} />
            </button>

            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen} 
              className="hover:text-brand-accent transition-colors"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### [src\index.css](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/index.css)

```css
@import "tailwindcss";

@theme {
  --color-brand-bg: #09090b;
  --color-brand-surface: #18181b;
  --color-brand-card: #1f1f23;
  --color-brand-accent: #ff3d3d;
  --color-brand-border: rgba(255, 255, 255, 0.06);
  --color-zinc-400: #a1a1aa;
  
  --font-sans: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
}

:root {
  color-scheme: dark;
}

body {
  background-color: var(--color-brand-bg);
  color: #ffffff;
  font-family: var(--font-sans);
  overflow-x: hidden;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}
```

### [src\layouts\AuthLayout.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/layouts/AuthLayout.jsx)

```javascript
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      {/* Brand logo header */}
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="bg-brand-accent p-2.5 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,61,61,0.2)]">
          <Play size={20} fill="currentColor" className="text-white" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight font-display text-white">
          Vid<span className="text-brand-accent">Verse</span>
        </span>
      </div>

      {/* Auth Card container */}
      <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-xl p-6 sm:p-8 shadow-2xl">
        <Outlet />
      </div>

      {/* Minimal Footer */}
      <p className="text-xs text-zinc-400 mt-8 font-medium">
        &copy; {new Date().getFullYear()} VidVerse. All rights reserved.
      </p>
    </div>
  );
}
```

### [src\layouts\DashboardLayout.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/layouts/DashboardLayout.jsx)

```javascript
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Video, 
  ArrowLeft, 
  LogOut, 
  Play, 
  Menu,
  X,
  User,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Backend Integration
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const studioLinks = [
    { name: 'Dashboard', path: '/studio', icon: BarChart3, exact: true },
    { name: 'My Videos', path: '/studio/videos', icon: Video, exact: false },
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
          <span className="text-zinc-500 text-sm hidden sm:inline-block">/ Creator Workspace</span>
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
                      ? 'bg-brand-accent text-white font-semibold shadow-md shadow-brand-accent/10' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-zinc-400'} />
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
                          ? 'bg-brand-accent text-white font-semibold' 
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
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
```

### [src\layouts\MainLayout.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/layouts/MainLayout.jsx)

```javascript
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
```

### [src\main.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/main.jsx)

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### [src\pages\Channel.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Channel.jsx)

```javascript
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Compass, FolderHeart } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import Tabs from '../components/ui/Tabs';
import VideoCard from '../components/video/VideoCard';
import PlaylistCard from '../components/playlist/PlaylistCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

export default function Channel() {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('videos');

  // Data states (null represents loading state)
  // TODO: Backend Integration
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const tabs = [
    { id: 'videos', label: 'Videos' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'about', label: 'About' },
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
          <Button variant={channel.isSubscribed ? 'secondary' : 'primary'}>
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
                  <VideoCard key={video.id} video={video} />
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
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-2xl bg-brand-surface/30 border border-brand-border rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-3">Description</h3>
            {channel === null ? (
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" className="w-full h-3" />
                <Skeleton variant="text" className="w-5/6 h-3" />
                <Skeleton variant="text" className="w-3/4 h-3" />
              </div>
            ) : (
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {channel.description || 'No description provided by the channel.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### [src\pages\CreatorDashboard.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/CreatorDashboard.jsx)

```javascript
import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  ThumbsUp, 
  Video, 
  MessageSquare,
  TrendingUp,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

import DashboardCard from '../components/dashboard/DashboardCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import UploadDialog from '../components/video/UploadDialog';

export default function CreatorDashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Stats / Metrics States (null represents loading)
  // TODO: Backend Integration - replace with API statistics calls
  const [stats, setStats] = useState(null);
  const [recentUploads, setRecentUploads] = useState(null);
  const [recentComments, setRecentComments] = useState(null);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Channel Dashboard</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Analyze and manage your content library.</p>
        </div>
        
        <Button 
          variant="primary" 
          size="sm"
          icon={Upload} 
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Video
        </Button>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats === null ? (
          /* Stats loading skeleton card loop */
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-3">
              <Skeleton variant="text" className="w-16 h-3" />
              <Skeleton variant="text" className="w-24 h-6" />
              <Skeleton variant="text" className="w-32 h-3" />
            </div>
          ))
        ) : (
          /* Populated metrics statistics structure */
          <>
            {/* TODO: Backend Integration */}
            <DashboardCard 
              title="Subscribers" 
              value={stats.subscribers} 
              description="Lifetime total"
              icon={Users} 
            />
            <DashboardCard 
              title="Views" 
              value={stats.views} 
              description="Last 30 days"
              icon={Eye} 
            />
            <DashboardCard 
              title="Likes" 
              value={stats.likes} 
              description="Engagement rating"
              icon={ThumbsUp} 
            />
            <DashboardCard 
              title="Videos Published" 
              value={stats.videosCount} 
              description="Uploaded catalog"
              icon={Video} 
            />
          </>
        )}
      </div>

      {/* Split layout: Recent Uploads & Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Uploads */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Uploads
            </h3>
            <Button variant="ghost" size="sm" onClick={() => toast('Redirecting to videos list...')}>
              View All
            </Button>
          </div>

          {recentUploads === null ? (
            /* Uploads loading state skeletons */
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex gap-4 items-center p-3 border border-brand-border rounded-lg">
                  <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton variant="text" className="w-3/4 h-3.5" />
                    <Skeleton variant="text" className="w-1/3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentUploads.length === 0 ? (
            /* Uploads empty state */
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-xs mx-auto">
              <Video size={24} className="text-zinc-600 mb-3" />
              <h4 className="text-sm font-semibold text-white">No videos published</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Upload your first video to start growing your channel.
              </p>
            </div>
          ) : (
            /* Uploads populated layout structure */
            <div className="flex flex-col gap-3">
              {/* TODO: Backend Integration */}
              {recentUploads.map((video) => (
                <div key={video.id} className="flex gap-4 items-center p-3 bg-brand-bg border border-brand-border rounded-lg hover:border-zinc-800 transition-colors">
                  <div className="w-20 aspect-video rounded overflow-hidden bg-zinc-800 shrink-0">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{video.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{video.createdAt} &bull; {video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Comments */}
        <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
          <div className="border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Comments
            </h3>
          </div>

          {recentComments === null ? (
            /* Comments loading state skeletons */
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex gap-3 p-3 border border-brand-border rounded-lg">
                  <Skeleton variant="circle" className="w-7 h-7" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton variant="text" className="w-16 h-3" />
                    <Skeleton variant="text" className="w-full h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentComments.length === 0 ? (
            /* Comments empty state */
            <div className="flex flex-col items-center justify-center py-12 text-center max-w-[200px] mx-auto">
              <MessageSquare size={24} className="text-zinc-600 mb-3" />
              <h4 className="text-sm font-semibold text-white">No comments yet</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Comments from your viewers will appear here.
              </p>
            </div>
          ) : (
            /* Comments populated layout structure */
            <div className="flex flex-col gap-3">
              {/* TODO: Backend Integration */}
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-brand-bg border border-brand-border rounded-lg">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-zinc-300">@{comment.owner.username}</span>
                    <span className="text-[8px] text-zinc-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialogue Modal */}
      <UploadDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}
```

### [src\pages\Home.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Home.jsx)

```javascript
import React, { useState } from 'react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';
import { Compass } from 'lucide-react';

export default function Home() {
  // videos = null represents loading state (skeletons)
  // videos = [] represents empty state
  // TODO: Backend Integration - replace with API fetch
  const [videos, setVideos] = useState(null); 
  
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Programming', 'Gaming', 'Music', 'Design', 'Science', 'Sports'];

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Categories Header */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 select-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none ${
                isActive 
                  ? 'bg-white text-black font-bold' 
                  : 'bg-brand-surface text-zinc-400 hover:text-white border border-brand-border'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Main Grid View */}
      {videos === null ? (
        /* Loading Skeletons State */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
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
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Compass size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No videos found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            There are no videos uploaded in the {activeCategory} category yet. Check back later or upload your own.
          </p>
        </div>
      ) : (
        /* Populated State */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### [src\pages\LikedVideos.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/LikedVideos.jsx)

```javascript
import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';

export default function LikedVideos() {
  // Data states: likedVideos = [] defaults to the natural Empty state
  // TODO: Backend Integration - replace with liked video endpoint fetch
  const [likedVideos, setLikedVideos] = useState([]);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Liked Videos</h2>
        <p className="text-xs text-zinc-500 mt-0.5">A history of videos you have liked.</p>
      </div>

      {likedVideos === null ? (
        /* Loading Skeletons */
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
      ) : likedVideos.length === 0 ? (
        /* Elegant Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <ThumbsUp size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No liked videos yet
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Videos you like will show up here. Explore the home catalog to find videos to watch.
          </p>
        </div>
      ) : (
        /* Populated State Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {likedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### [src\pages\Login.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Login.jsx)

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setLoading(true);
    // TODO: Backend Integration
    toast.success('Logged in successfully! (TODO: Backend Integration)');
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-white text-center sm:text-left">
          Welcome back
        </h2>
        <p className="text-xs text-zinc-500 text-center sm:text-left mt-1">
          Access your streaming catalog and creator dashboard.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <Input
          label="Username or Email"
          placeholder="e.g. johndoe"
          error={errors.identity?.message}
          {...register('identity', { 
            required: 'Please enter your username or email address' 
          })}
        />

        <div className="flex flex-col">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Please enter your password',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <div className="flex justify-end mt-1">
            <button 
              type="button" 
              onClick={() => toast('Password recovery / TODO: Contact Support')}
              className="text-[10px] font-semibold text-brand-accent hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={loading}
          icon={LogIn}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Toggle Sign Up link */}
      <div className="text-center text-xs text-zinc-500 mt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-accent hover:underline font-semibold">
          Create Account
        </Link>
      </div>
    </div>
  );
}
```

### [src\pages\MyVideos.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/MyVideos.jsx)

```javascript
import React, { useState } from 'react';
import { Video, Edit, Trash2, Eye, Calendar, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import Badge from '../components/ui/Badge';

export default function MyVideos() {
  // Data states (null represents loading state)
  // TODO: Backend Integration
  const [videos, setVideos] = useState(null);

  // Deletion States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetVideoId, setTargetVideoId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTrigger = (videoId) => {
    setTargetVideoId(videoId);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    // TODO: Backend Integration
    toast.success('Video deleted successfully');
    setIsDeleting(false);
    setIsDeleteOpen(false);
  };

  const handleTogglePublish = (videoId) => {
    // TODO: Backend Integration
    toast.success('Publish status toggled');
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Video Management</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Edit metadata, check stats, or delete uploads.</p>
      </div>

      {/* Videos List Container */}
      <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
        {videos === null ? (
          /* Table loading skeleton rows */
          <div className="divide-y divide-brand-border p-4 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center py-2">
                <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton variant="text" className="w-1/2 h-3.5" />
                  <Skeleton variant="text" className="w-1/4 h-3" />
                </div>
                <Skeleton variant="rectangle" className="w-16 h-8" />
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          /* Table empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
            <Video size={28} className="text-zinc-600 mb-3" />
            <h4 className="text-sm font-semibold text-white">No content uploaded</h4>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              You haven't uploaded any videos to your channel yet. Upload videos to display them here.
            </p>
          </div>
        ) : (
          /* Populated Table of Videos */
          <div className="overflow-x-auto">
            {/* TODO: Backend Integration */}
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-brand-border text-zinc-400 font-semibold text-xs uppercase tracking-wider select-none bg-brand-surface">
                  <th className="p-4">Video</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-white/2 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="p-4 flex gap-3.5 items-center min-w-[280px]">
                      <div className="w-20 aspect-video rounded overflow-hidden bg-zinc-800 shrink-0 border border-brand-border">
                        {video.thumbnail && <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-semibold text-white line-clamp-2 leading-snug">
                        {video.title}
                      </span>
                    </td>
                    
                    {/* Visibility Status */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={video.isPublished ? 'green' : 'gray'}>
                          {video.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <button 
                          onClick={() => handleTogglePublish(video.id)}
                          className="text-xs text-zinc-500 hover:text-white transition-colors underline"
                        >
                          Change
                        </button>
                      </div>
                    </td>
                    
                    {/* Date Uploaded */}
                    <td className="p-4 text-zinc-400 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Calendar size={13} />
                        {video.createdAt}
                      </span>
                    </td>

                    {/* View Statistics */}
                    <td className="p-4 text-zinc-400 tabular-nums whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Eye size={13} />
                        {video.views}
                      </span>
                    </td>

                    {/* Video Row Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={Edit} 
                          onClick={() => toast('Edit details dialog / TODO')}
                          title="Edit Details"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={Trash2} 
                          onClick={() => handleDeleteTrigger(video.id)}
                          className="text-red-500 hover:bg-red-500/10"
                          title="Delete Video"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation overlay */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        isConfirming={isDeleting}
        title="Delete video forever?"
        message="This action will permanently delete this video, and comments linked to it. This cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
```

### [src\pages\NotFound.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/NotFound.jsx)

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <h2 className="text-4xl font-extrabold text-brand-accent mb-4 font-display">404</h2>
      <p className="text-zinc-400 mb-6 font-sans">The page you are looking for does not exist.</p>
      <Link to="/" className="text-white hover:text-brand-accent transition-colors underline font-medium">
        Go back home
      </Link>
    </div>
  );
}
```

### [src\pages\PlaylistDetails.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/PlaylistDetails.jsx)

```javascript
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Play, ListVideo } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import VideoCard from '../components/video/VideoCard';

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  // Data states: playlist = null represents loading state
  // TODO: Backend Integration
  const [playlist, setPlaylist] = useState(null);

  // Dialog States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePlaylist = () => {
    setIsDeleting(true);
    // TODO: Backend Integration
    toast.success('Playlist deleted successfully');
    setIsDeleting(false);
    setIsDeleteOpen(false);
    navigate('/playlists');
  };

  const handleRemoveVideo = (videoId) => {
    // TODO: Backend Integration
    toast.success('Video removed from playlist');
  };

  return (
    <div className="font-sans text-white">
      {playlist === null ? (
        /* Loading Skeletons layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4">
            <Skeleton variant="rectangle" className="aspect-video w-full" />
            <Skeleton variant="text" className="w-3/4 h-5" />
            <Skeleton variant="text" className="w-full h-3" />
            <Skeleton variant="text" className="w-1/2 h-3" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center p-3 border border-brand-border rounded-lg">
                <Skeleton variant="rectangle" className="w-20 aspect-video rounded" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton variant="text" className="w-1/2 h-3.5" />
                  <Skeleton variant="text" className="w-1/4 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Populated Playlist Details Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Playlist Cover / Metadata Left Column */}
          {/* TODO: Backend Integration */}
          <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col gap-4 sticky top-20 h-fit">
            <div className="aspect-video w-full rounded-lg bg-zinc-800 border border-brand-border overflow-hidden relative flex items-center justify-center text-zinc-500">
              {playlist.thumbnail ? (
                <img src={playlist.thumbnail} alt={playlist.name} className="w-full h-full object-cover" />
              ) : (
                <ListVideo size={36} />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-brand-accent p-3 rounded-full text-white shadow-lg">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {playlist.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {playlist.videosCount || 0} videos &bull; Created recently
              </p>
              {playlist.description && (
                <p className="text-xs text-zinc-500 leading-relaxed mt-3 whitespace-pre-wrap">
                  {playlist.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-brand-border pt-4 mt-2">
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Edit2}
                onClick={() => toast('Edit title placeholder / TODO')}
                className="flex-1"
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                icon={Trash2}
                onClick={() => setIsDeleteOpen(true)}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Videos List Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {!playlist.videos || playlist.videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-brand-surface/30 border border-brand-border rounded-xl text-center">
                <ListVideo size={24} className="text-zinc-500 mb-3" />
                <h4 className="text-sm font-semibold text-white">No videos in playlist</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Add videos to this playlist while watching them.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {playlist.videos.map((video, idx) => (
                  <div 
                    key={video.id} 
                    className="flex gap-4 items-center p-3 bg-brand-surface/20 border border-brand-border rounded-xl hover:border-zinc-800 transition-colors group/row"
                  >
                    <span className="text-xs font-semibold text-zinc-500 w-4 text-center tabular-nums">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <VideoCard video={video} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleRemoveVideo(video.id)}
                      className="text-zinc-500 hover:text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity"
                      title="Remove from playlist"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete playlist confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeletePlaylist}
        isConfirming={isDeleting}
        title="Delete Playlist?"
        message="This action will permanently delete the playlist folder. The videos inside the playlist will NOT be deleted."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
```

### [src\pages\Playlists.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Playlists.jsx)

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FolderPlus, ListVideo } from 'lucide-react';
import toast from 'react-hot-toast';

import Skeleton from '../components/ui/Skeleton';
import PlaylistCard from '../components/playlist/PlaylistCard';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

export default function Playlists() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  // Data states: playlists = [] defaults to empty state
  // TODO: Backend Integration - replace with playlists fetch call
  const [playlists, setPlaylists] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreatePlaylist = (data) => {
    // TODO: Backend Integration
    toast.success('Playlist created successfully! (TODO: Backend Integration)');
    reset();
    setIsCreateOpen(false);
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Playlists</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Organize your streaming catalog.</p>
        </div>
        
        <Button 
          variant="primary" 
          size="sm"
          icon={FolderPlus} 
          onClick={() => setIsCreateOpen(true)}
        >
          New Playlist
        </Button>
      </div>

      {playlists === null ? (
        /* Loading Skeletons Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Skeleton variant="rectangle" className="aspect-video w-full" />
              <Skeleton variant="text" className="w-2/3 h-4 mt-2" />
            </div>
          ))}
        </div>
      ) : playlists.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <ListVideo size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No playlists found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Create folders to group and categorize videos. Click the button above to make a playlist.
          </p>
        </div>
      ) : (
        /* Populated Playlists Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}

      {/* Create Playlist Modal overlay */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Playlist">
        <form onSubmit={handleSubmit(handleCreatePlaylist)} className="flex flex-col gap-5">
          <Input
            label="Playlist Name"
            placeholder="e.g. Learning React 19"
            error={errors.name?.message}
            {...register('name', { 
              required: 'A name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />

          <Textarea
            label="Description"
            placeholder="What is this playlist about?"
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border mt-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Playlist
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
```

### [src\pages\Profile.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Profile.jsx)

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Save, Key } from 'lucide-react';
import toast from 'react-hot-toast';

import Avatar from '../components/ui/Avatar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { 
    register: registerPass, 
    handleSubmit: handleSubmitPass, 
    reset: resetPass,
    formState: { errors: errorsPass } 
  } = useForm();

  // Data states (null represents loading state)
  // TODO: Backend Integration - replace with profile endpoints fetch
  const [profile, setProfile] = useState({
    username: '',
    fullname: '',
    email: '',
    avatar: '',
    coverImage: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleProfileSubmit = (data) => {
    // TODO: Backend Integration
    toast.success('Profile details submitted! (TODO: Backend Integration)');
  };

  const handlePasswordSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    // TODO: Backend Integration
    toast.success('Password updated successfully! (TODO: Backend Integration)');
    resetPass();
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Update your channel graphics and personal credentials.</p>
      </div>

      {/* Graphics Banner Upload */}
      <div className="relative h-32 sm:h-44 bg-zinc-800 rounded-xl overflow-hidden border border-brand-border group">
        {coverFile ? (
          <img src={URL.createObjectURL(coverFile)} alt="Cover Banner" className="w-full h-full object-cover" />
        ) : profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover Banner" className="w-full h-full object-cover" />
        ) : null}
        
        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer select-none">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && setCoverFile(e.target.files[0])}
            className="hidden"
          />
          <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg">
            <Camera size={14} />
            Change Cover Banner
          </div>
        </label>
      </div>

      {/* Avatar circular upload */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 px-4 relative z-10">
        <div className="relative group rounded-full overflow-hidden border-4 border-brand-bg bg-zinc-800 shadow-xl">
          <Avatar 
            src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar} 
            name={profile.fullname || 'U'} 
            size="xl" 
          />
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer select-none">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && setAvatarFile(e.target.files[0])}
              className="hidden"
            />
            <Camera size={18} className="text-white" />
          </label>
        </div>
        <div className="mb-2">
          <h3 className="text-base font-bold text-white">Channel Icon</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">PNG or JPG, square resolution recommended.</p>
        </div>
      </div>

      {/* Form Details */}
      {/* TODO: Backend Integration */}
      <form onSubmit={handleSubmit(handleProfileSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5 mt-4">
        <div className="border-b border-brand-border pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Personal Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            defaultValue={profile.fullname}
            error={errors.fullname?.message}
            {...register('fullname', { required: 'Full name is required' })}
          />

          <Input
            label="Username"
            placeholder="e.g. johndoe"
            defaultValue={profile.username}
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          defaultValue={profile.email}
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
        />

        <div className="flex justify-end mt-2">
          <Button type="submit" icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>

      {/* Password Change Form */}
      {/* TODO: Backend Integration */}
      <form onSubmit={handleSubmitPass(handlePasswordSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5">
        <div className="border-b border-brand-border pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Change Password
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.oldPassword?.message}
            {...registerPass('oldPassword', { required: 'Old password is required' })}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.newPassword?.message}
            {...registerPass('newPassword', { 
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={errorsPass.confirmPassword?.message}
            {...registerPass('confirmPassword', { required: 'Please confirm password' })}
          />
        </div>

        <div className="flex justify-end mt-2">
          <Button type="submit" variant="secondary" icon={Key}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
```

### [src\pages\Register.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Register.jsx)

```javascript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files?.[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (data) => {
    if (!avatarFile) {
      toast.error('An avatar image file is required for registration');
      return;
    }
    
    setLoading(true);
    // TODO: Backend Integration
    toast.success('Registration details submitted! (TODO: Backend Integration)');
    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="font-sans flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-white text-center sm:text-left">
          Create creator account
        </h2>
        <p className="text-xs text-zinc-500 text-center sm:text-left mt-1">
          Join VidVerse as a creator and start uploading content.
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        
        {/* Cover Image Upload (Optional) */}
        <div className="relative h-20 bg-zinc-800 rounded-lg overflow-hidden border border-brand-border group select-none">
          {coverFile && (
            <img src={URL.createObjectURL(coverFile)} alt="Cover preview" className="w-full h-full object-cover" />
          )}
          <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
            <span className="text-[10px] font-semibold text-white bg-brand-surface px-2.5 py-1.5 rounded border border-brand-border">
              Add Cover Image (Optional)
            </span>
          </label>
        </div>

        {/* Avatar Image Selector (Required) */}
        <div className="flex items-center gap-3 bg-brand-surface/40 p-3 rounded-lg border border-brand-border">
          <div className="relative group w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-brand-border shrink-0">
            {avatarFile ? (
              <img src={URL.createObjectURL(avatarFile)} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-bold uppercase">
                U
              </div>
            )}
            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Camera size={14} className="text-white" />
            </label>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Avatar Profile Icon *</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Please upload a profile photo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            error={errors.fullname?.message}
            {...register('fullname', { required: 'Full name is required' })}
          />

          <Input
            label="Username"
            placeholder="e.g. johndoe"
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
        />

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={loading}
          icon={UserPlus}
          className="w-full mt-2"
        >
          Sign Up
        </Button>
      </form>

      {/* Toggle Sign In link */}
      <div className="text-center text-xs text-zinc-500 mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-accent hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
```

### [src\pages\SearchResults.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/SearchResults.jsx)

```javascript
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import VideoCard from '../components/video/VideoCard';
import ChannelCard from '../components/channel/ChannelCard';

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Data states: results = [] defaults to the natural empty state
  // TODO: Backend Integration - replace with search query endpoint fetch
  const [results, setResults] = useState([]);

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Search Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Search Results</h2>
        {query ? (
          <p className="text-xs text-zinc-500 mt-0.5">
            Displaying results matching "<span className="text-brand-accent font-semibold">{query}</span>"
          </p>
        ) : (
          <p className="text-xs text-zinc-500 mt-0.5">Please enter a search query in the header.</p>
        )}
      </div>

      {results === null ? (
        /* Loading Skeletons */
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
      ) : results.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Search size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No results found
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We couldn't find any videos or channels matching "{query}". Try checking for spelling errors or search for other topics.
          </p>
        </div>
      ) : (
        /* Populated grid layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* TODO: Backend Integration */}
          {results.map((item) => (
            item.type === 'channel' ? (
              <ChannelCard key={item.username} channel={item} />
            ) : (
              <VideoCard key={item.id} video={item} />
            )
          ))}
        </div>
      )}
    </div>
  );
}
```

### [src\pages\Settings.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Settings.jsx)

```javascript
import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

export default function Settings() {
  const { register, handleSubmit } = useForm();

  const handleSettingsSubmit = (data) => {
    // TODO: Backend Integration
    toast.success('Settings updated successfully! (TODO: Backend Integration)');
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">System Settings</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Configure theme selections, system notifications, and security options.</p>
      </div>

      {/* Settings Options Box */}
      <form onSubmit={handleSubmit(handleSettingsSubmit)} className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 flex flex-col gap-5">
        
        {/* Theme Preferences */}
        <div className="flex flex-col gap-1.5 pb-4 border-b border-brand-border">
          <h3 className="text-sm font-semibold text-white">Interface Theme</h3>
          <p className="text-[11px] text-zinc-500">Select how VidVerse appears on your screen.</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="p-3 bg-brand-bg rounded-lg border border-brand-accent/50 text-center text-xs font-semibold text-white select-none">
              Dark Mode (Active)
            </div>
            <div 
              onClick={() => toast('Light theme is under development / TODO')}
              className="p-3 bg-zinc-800/40 hover:bg-zinc-800/70 cursor-pointer rounded-lg border border-brand-border text-center text-xs font-semibold text-zinc-500 hover:text-zinc-400 select-none"
            >
              Light Mode
            </div>
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="flex flex-col gap-4 pb-4 border-b border-brand-border">
          <h3 className="text-sm font-semibold text-white">Channel Privacy</h3>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Keep liked videos private</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">When enabled, other viewers cannot see what videos you have liked on your channel profile.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('privateLikes')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Keep subscriptions private</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Hide subscribed channel grids from public channel profiles.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('privateSubs')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>
        </div>

        {/* Email Alerts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Email Notifications</h3>
          
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">New subscribers alerts</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Send daily/weekly reports on new subscribers listing.</p>
            </div>
            <input 
              type="checkbox" 
              {...register('emailSubscribers')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-300">Comment alerts</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Notify when comments are posted on your uploaded videos.</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              {...register('emailComments')}
              className="w-4 h-4 rounded accent-brand-accent cursor-pointer bg-brand-bg border border-brand-border"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-3 border-t border-brand-border mt-2">
          <Button type="submit" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
```

### [src\pages\Subscriptions.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/Subscriptions.jsx)

```javascript
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import ChannelCard from '../components/channel/ChannelCard';
import toast from 'react-hot-toast';

export default function Subscriptions() {
  // Data states: channels = [] defaults to the natural empty state
  // TODO: Backend Integration - replace with subscriptions fetch call
  const [channels, setChannels] = useState([]);

  const handleToggleSubscribe = (username) => {
    // TODO: Backend Integration
    toast.success(`Unsubscribed from @${username}`);
  };

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Subscriptions</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Channels you subscribe to.</p>
      </div>

      {channels === null ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-brand-border rounded-xl">
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" className="w-16 h-16" />
                <div className="flex flex-col gap-2">
                  <Skeleton variant="text" className="w-24 h-3.5" />
                  <Skeleton variant="text" className="w-16 h-3" />
                  <Skeleton variant="text" className="w-32 h-3" />
                </div>
              </div>
              <Skeleton variant="rectangle" className="w-20 h-8" />
            </div>
          ))}
        </div>
      ) : channels.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-20 border border-brand-border border-dashed rounded-2xl text-center max-w-md mx-auto mt-8">
          <div className="bg-brand-surface p-4 rounded-full border border-brand-border text-zinc-500 mb-4">
            <Users size={28} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">
            No subscriptions yet
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Channels you subscribe to will appear here. Find creators by exploring the homepage.
          </p>
        </div>
      ) : (
        /* Populated Channel Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TODO: Backend Integration */}
          {channels.map((channel) => (
            <ChannelCard 
              key={channel.username} 
              channel={channel} 
              onToggleSubscribe={handleToggleSubscribe} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

### [src\pages\WatchVideo.jsx](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/pages/WatchVideo.jsx)

```javascript
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Heart, ListPlus, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

import VideoPlayer from '../components/video/VideoPlayer';
import CommentCard from '../components/comment/CommentCard';
import VideoCard from '../components/video/VideoCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

export default function WatchVideo() {
  const { videoId } = useParams();
  const { register, handleSubmit, reset } = useForm();

  // Layout states
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  
  // Data states (null represents loading state)
  // TODO: Backend Integration
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleCommentSubmit = (data) => {
    if (!data.commentText.trim()) return;
    // TODO: Backend Integration
    toast.success('Comment submitted! (TODO: Backend Integration)');
    reset();
  };

  const handleToggleLike = () => {
    // TODO: Backend Integration
    toast.success('Video liked status toggled');
  };

  const handleSaveToPlaylist = () => {
    // TODO: Backend Integration
    toast.success('Added to playlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Video link copied to clipboard!');
  };

  // Sample open source video stream for custom player controls testing
  const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const samplePoster = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="font-sans text-white flex flex-col gap-6">
      {/* Upper Section: Theater Mode vs Standard grid */}
      <div className={`grid grid-cols-1 ${isTheaterMode ? 'w-full' : 'lg:grid-cols-3'} gap-6`}>
        {/* Main Video Segment */}
        <div className={isTheaterMode ? 'w-full' : 'lg:col-span-2'}>
          {/* Custom Video Player */}
          <VideoPlayer 
            src={sampleVideoUrl} 
            poster={samplePoster}
            onTheaterModeToggle={(val) => setIsTheaterMode(val)}
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
                  {video.channel && (
                    <>
                      <Avatar src={video.channel.avatar} name={video.channel.fullname} size="md" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{video.channel.fullname}</h4>
                        <p className="text-xs text-zinc-400">{video.channel.subscribersCount} subscribers</p>
                      </div>
                    </>
                  )}
                  <Button variant="primary" size="sm" className="ml-2">
                    Subscribe
                  </Button>
                </div>

                {/* Video Action Controls */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={Heart} 
                    onClick={handleToggleLike}
                    className={video.isLiked ? 'text-brand-accent border-brand-accent/20 bg-brand-accent/5' : ''}
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
                  <span>{video.createdAt}</span>
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
                  {...register('commentText', { required: true })}
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
                  <CommentCard key={comment.id} comment={comment} />
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
                  <VideoCard key={rec.id} video={rec} />
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
    </div>
  );
}
```

### [src\services\auth.services.js](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/services/auth.services.js)

```javascript

```

### [src\utils\errorHandler.js](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/src/utils/errorHandler.js)

```javascript

```

### [vite.config.js](file:///C:/Users/vaidu/Desktop/VidVerse/frontend/vite.config.js)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

