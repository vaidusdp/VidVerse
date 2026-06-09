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

---

## 📡 API Endpoints (Auth & Profile)

All authentication/user routes are mapped under the prefix `/api/v1/users`.

| Endpoint | HTTP Method | Auth Required | Description | Request Body / Files |
| :--- | :--- | :---: | :--- | :--- |
| `/register` | `POST` | No | Creates a new user profile and uploads media | Form-Data: `fullname`, `username`, `email`, `password`, files: `avatar` (required), `coverImage` (optional) |
| `/login` | `POST` | No | Authenticates user and issues HTTP-only cookies | JSON: `email`, `password` |
| `/logout` | `POST` | Yes | Logs out the current user and clears credentials | None |
| `/current-user` | `GET` | Yes | Retrieves user account metadata | None |
| `/change-password` | `POST` | Yes | Modifies password security credentials | JSON: `oldPassword`, `newPassword` |
| `/update-user-details` | `PATCH` | Yes | Modifies basic metadata | JSON: `fullname`, `username`, `email` |
| `/update-avatar` | `PATCH` | Yes | Modifies the profile photo on Cloudinary | Form-Data: file `avatar` (required) |
| `/update-cover-image`| `PATCH` | Yes | Modifies the cover backdrop on Cloudinary | Form-Data: file `coverImage` (required) |

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
- [ ] Initialize the Frontend React client inside the `/frontend` directory
- [ ] Implement video playback, playlists creation, and user dashboard UI
- [ ] Wire React interface actions to the Backend REST API handlers

---

## 📄 License

This project is open-source and distributed under the **ISC License**.
