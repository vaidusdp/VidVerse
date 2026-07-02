# 🎥 VidVerse

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg)](https://nodejs.org)
[![Express Version](https://img.shields.io/badge/express-v5.2.x-lightgrey.svg)](https://expressjs.com)
[![Mongoose](https://img.shields.io/badge/mongoose-v9.x-green.svg)](https://mongoosejs.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Status: Active Development](https://img.shields.io/badge/status-active_development-orange.svg)]()

**VidVerse** is a modern, high-performance video streaming platform built for content creators and viewers. Designed with a modular architecture and clean code practices, VidVerse aims to provide seamless video uploads, high-quality streaming, interactive features, and deep analytics.

> [!NOTE]
> **Project Status:** This project is currently in **active development**. The backend server, database schemas, authentication systems, and cloud storage integration are fully implemented. The frontend workspace is ready for development.

---

## 🚀 Key Features

### Backend Services (Implemented)
- **Secure Authentication & Session Management:** JWT-based user authentication using custom Access and Refresh Tokens with cookie parsing.
- **Comprehensive Profile Management:** Endpoint APIs to change passwords, update profile details, and refresh access tokens.
- **Cloud Media Upload:** Direct file uploads to Cloudinary via local Multer disk-storage staging (avatar and cover image configurations).
- **Relational Data Modeling:** Complete Mongoose schemas including Users, Videos, Comments, Likes, Dislikes, Playlists, and Subscriptions.
- **Centralized Error & Response Handling:** Standardized API responses with `APIResponse` and structured `APIError` classes.

### Frontend Client (Planned)
- Modular frontend workspace to be built with React, Vite, and TailwindCSS.

---

## 🛠️ Technology Stack

| Layer | Technology | Version / Description |
| :--- | :--- | :--- |
| **Runtime Environment** | Node.js | v18.0.0 or higher |
| **Backend Framework** | Express.js | v5.2.x (Next-generation Express features) |
| **Database ORM** | Mongoose | v9.6.x (MongoDB Object Modeling) |
| **File Storage API** | Cloudinary | v2.10.x |
| **Multipart Middleware** | Multer | v2.1.x |
| **Authentication** | JSONWebToken & bcrypt | Access/Refresh token creation and security hashing |
| **Dev Tooling** | Prettier & Nodemon | Automated formatting & live code-reloads |

---

## 📂 Project Directory Structure

```text
VidVerse/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers & business logic (e.g. user.controller.js)
│   │   ├── db/            # Database connection setup (index.js using MONGO_URL)
│   │   ├── middlewares/   # Express middlewares (auth.middleware.js, multer.middleware.js)
│   │   ├── models/        # Mongoose schemas (user, video, comment, like, dislike, subscription, playlist)
│   │   ├── routes/        # Express router files (auth.route.js)
│   │   ├── utils/         # Helper utilities (APIError.js, APIResponse.js, asyncHandler.js, cloudinary.js)
│   │   ├── app.js         # Core Express application and routing setups
│   │   └── index.js       # Main server entrypoint (db connection & port activation)
│   ├── public/temp/       # Local temp folder for file uploading before cloud upload
│   ├── .env               # Server environment configurations
│   └── package.json       # Backend configurations and NPM scripts
├── frontend/              # Client application directory (initialized)
└── README.md              # Project documentation (You are here)
```

## 📡 API Endpoints

### 🔐 Authentication (`/api/v1/auth`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/register` | `POST` | No | Register a new user and upload profile media | Form-Data: `fullname`, `username`, `email`, `password`, files: `avatar` (req), `coverImage` (opt) |
| `/login` | `POST` | No | Authenticate user and issue cookies | JSON: `email` or `username`, `password` |
| `/logout` | `PATCH` | Yes | Log out the user and clear credentials | None |
| `/change-password` | `POST` | Yes | Update password security credentials | JSON: `oldPassword`, `newPassword` |

### 👤 User Profiles (`/api/v1/users`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/me` | `GET` | Yes | Get the current authenticated user | None |
| `/me` | `PATCH` | Yes | Update user details (fullname, email, username) | JSON: `fullname`, `username`, `email` |
| `/me/avatar` | `PATCH` | Yes | Update user avatar image | Form-Data: file `avatar` (required) |
| `/me/cover-image` | `PATCH` | Yes | Update user cover image | Form-Data: file `coverImage` (required) |
| `/channels/:username` | `GET` | Yes | Fetch channel profile details for a user | None |
| `/me/watch-history` | `GET` | Yes | Fetch watch history of the logged-in user | None |

### 📹 Videos (`/api/v1/videos`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/video` | `POST` | Yes | Publish a new video to the channel | Form-Data: `title`, `description`, files: `video` (req), `thumbnail` (req) |
| `/me` | `GET` | Yes | Fetch videos uploaded by the logged-in user | None |
| `/:videoId` | `GET` | Yes | Retrieve video details by ID | None |
| `/:videoId` | `DELETE` | Yes | Delete a video by ID | None |
| `/channels/:channelId` | `GET` | Yes | Fetch all videos for a specific channel | None |
| `/` | `GET` | Yes | Query and paginate videos (all channels) | Query parameters (page, limit, query, sortBy, sortType) |
| `/:videoId/publish` | `PATCH` | Yes | Toggle publish/unpublish status | None |
| `/update-video/:videoId` | `PATCH` | Yes | Update video title, description, or thumbnail | Form-Data: `title`, `description`, file: `thumbnail` |

### 💬 Comments (`/api/v1/comments`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/:videoId/comments` | `POST` | Yes | Add a comment to a video | JSON: `content` |
| `/:videoId/comments` | `GET` | Yes | Get all comments for a video (paginated) | Query parameters (page, limit) |
| `/:commentId/comments` | `PATCH` | Yes | Edit an existing comment | JSON: `content` |
| `/:commentId/comments` | `DELETE` | Yes | Delete a comment | None |

### 👍 Likes (`/api/v1/likes`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/:videoId/likes` | `POST` | Yes | Toggle like status on a video | None |
| `/c/:commentId/likes` | `POST` | Yes | Toggle like status on a comment | None |
| `/me/liked-videos` | `GET` | Yes | Get list of all videos liked by the user | None |

### 🔔 Subscriptions (`/api/v1/subscription`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/channels/:channelId` | `POST` | Yes | Toggle channel subscription (subscribe/unsubscribe) | None |
| `/users/:userId` | `GET` | Yes | Get list of channels the user is subscribed to | None |
| `/channels/:channelId/subscribers` | `GET` | Yes | Get list of subscribers for a channel | None |

### 📂 Playlists (`/api/v1/playlists`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/playlist` | `POST` | Yes | Create a new playlist | JSON: `name`, `description` |
| `/:playlistId` | `GET` | Yes | Get playlist details by ID | None |
| `/:playlistId` | `PATCH` | Yes | Update playlist name and description | JSON: `name`, `description` |
| `/:playlistId` | `DELETE` | Yes | Delete a playlist | None |
| `/p/:playlistId/v/:videoId` | `PATCH` | Yes | Add a video to a playlist | None |
| `/p/:playlistId/v/:videoId` | `DELETE` | Yes | Remove a video from a playlist | None |
| `/users/:userId` | `GET` | Yes | Fetch all playlists created by a user | None |

### 📊 Dashboard (`/api/v1/dashboard`)

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/channel-stats/:userId` | `GET` | Yes | Get channel statistics (subscribers, views, likes, videos) | None |
| `/channel-videos/:userId` | `GET` | Yes | Get all videos created by the channel owner | None |

---

## ⚙️ Getting Started

Follow these instructions to run the application locally:

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **NPM** (v9.0.0 or higher)
- **MongoDB** (Local instance or MongoDB Atlas connection cluster)

### Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/VidVerse.git
   cd VidVerse
   ```

2. **Configure Environment Variables:**
   Navigate to the `/backend` folder and create a `.env` file:
   ```bash
   cd backend
   touch .env
   ```
   Populate it with the following configuration details:
   ```env
   PORT=8000
   CORS_ORIGIN=*
   MONGO_URL=your_mongodb_connection_string

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_CLOUD_API_KEY=your_cloudinary_api_key
   CLOUDINARY_CLOUD_API_SECRET=your_cloudinary_api_secret

   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d

   NODE_ENV=development
   ```

3. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

4. **Run Backend in Development Mode:**
   ```bash
   npm run dev
   ```
   The backend server will launch at `http://localhost:8000` with hot-reloading active.

---

## 🗺️ Project Roadmap

- [x] Design directory structure & workspace layout
- [x] Set up Express server with CORS & JSON parsing
- [x] Configure Mongoose connection & MongoDB Atlas cluster
- [x] Code schemas for Users, Videos, Comments, Likes, Dislikes, Subscriptions, and Playlists
- [x] Implement robust JWT access/refresh token authentication flow
- [x] Integrate Cloudinary storage and Multer middleware for file uploads
- [x] Develop secure endpoints for user details, avatar, and cover image editing
- [x] Code and expose full Backend API endpoints (Videos, Comments, Likes, Subscriptions, Playlists, and Dashboard stats)
- [ ] Initialize the Frontend React client inside the `/frontend` directory
- [ ] Implement video playback, playlists creation, and user dashboard UI
- [ ] Wire React interface actions to the Backend REST API handlers

---

## 📄 License

This project is open-source and distributed under the **ISC License**.
