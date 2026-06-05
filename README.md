# 🎥 VidVerse

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg)](https://nodejs.org)
[![Express Version](https://img.shields.io/badge/express-v5.2.x-lightgrey.svg)](https://expressjs.com)
[![Mongoose](https://img.shields.io/badge/mongoose-v8.x-green.svg)](https://mongoosejs.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Status: In Development](https://img.shields.io/badge/status-active_development-orange.svg)]()

**VidVerse** is a modern, high-performance video streaming platform built for content creators and viewers. Designed with a modular architecture and clean code practices, VidVerse aims to provide seamless video uploads, high-quality streaming, interactive features, and deep analytics.

> [!NOTE]
> **Project Status:** This project is currently in **active development** (Under Construction). The backend infrastructure is being built out, and the frontend workspace is initialized for future development.

---

## 🚀 Key Features (Planned & In-Progress)

- **User Authentication & Authorization**: Secure sign-up, login, password reset, and JWT-based session management.
- **Video Processing & Streaming**: Efficient video upload, cloud storage integration (e.g., Cloudinary/AWS S3), transcoding, and adaptive bitrate streaming.
- **Creator Dashboard**: Video analytics, view count tracking, engagement statistics, and content management.
- **Engagement Loop**: Likes, comments, channel subscriptions, and custom playlists.
- **Smart Recommendations**: A personalized feed based on user watch history and preferences.
- **Search & Discovery**: Advanced search with filtering, tags, and category navigation.

---

## 🛠️ Technology Stack

### Backend (`/backend`)
- **Runtime Environment:** Node.js
- **Framework:** Express.js (v5.2+)
- **Database ORM:** Mongoose / MongoDB
- **Security & Config:** CORS, dotenv
- **Formatting & Linting:** Prettier
- **Development Tooling:** Nodemon

### Frontend (`/frontend`)
- **Status:** *Pending Implementation* (Workspace initialized)
- **Target Tech:** React / Vite, TailwindCSS (suggested)

---

## 📂 Project Structure

The project is structured as a monorepo split into frontend and backend services:

```text
VidVerse/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers & business logic
│   │   ├── db/            # Database connection & setup
│   │   ├── middlewares/   # Express middlewares (auth, upload, etc.)
│   │   ├── models/        # Mongoose schemas & database models
│   │   ├── routes/        # API endpoints routing mapping
│   │   ├── utils/         # Helper functions & utility classes
│   │   ├── validators/    # Request payload schema validation
│   │   ├── app.js         # Express app configurations & settings
│   │   └── index.js       # App entry point & server initiation
│   ├── public/            # Static assets
│   ├── .env               # Environment configuration file
│   └── package.json       # Backend dependencies and scripts
├── frontend/              # Frontend project (To be built)
└── README.md              # Project documentation (You are here)
```

---

## ⚙️ Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **NPM** (v9.0.0 or higher) or Yarn
- **MongoDB** (Local instance or MongoDB Atlas URI)

### Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/VidVerse.git
   cd VidVerse
   ```

2. **Configure Environment Variables:**
   Navigate to the `backend` folder and create a `.env` file (or update the existing one):
   ```bash
   cd backend
   ```
   Add the following variables (adjust values as needed):
   ```env
   PORT=8000
   CORS_ORIGIN=http://localhost:5173,http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   # Cloud Storage (Planned)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

4. **Run Backend in Development Mode:**
   ```bash
   npm run dev
   ```
   The server will start running on the port specified in your `.env` file (e.g., `http://localhost:8000`).

---

## 🗺️ Roadmap & Current Tasks

- [x] Set up backend directory structure
- [x] Configure Express server with CORS & JSON middlewares
- [ ] Establish MongoDB connection using Mongoose
- [ ] Build models for Users, Videos, Comments, and Likes
- [ ] Implement secure JWT Authentication flow (Access & Refresh tokens)
- [ ] Integrate Cloudinary for video and image/thumbnail uploads
- [ ] Initialize Frontend with React and styling
- [ ] Connect Frontend dashboard with Backend API endpoints

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` (if available) or `package.json` for details.
