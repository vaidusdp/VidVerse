# VidVerse

VidVerse is a full-stack, video streaming web application inspired by YouTube. Built on the MERN stack (MongoDB, Express, React, Node.js), it supports core video sharing operations, user subscriptions, custom video playlists, search filtering, and channel performance metrics. 

The application utilizes an express backend server to handle secure data transactions, MongoDB aggregation pipelines to efficiently fetch relational data (like view metrics and subscription counts), and a React client layout styled with Tailwind CSS. Media uploads are handled through Multer and stored on Cloudinary.

---

## Why I Built This

I built VidVerse to understand the inner workings of media-centric platforms. Building a video sharing site from scratch forced me to deal with real-world problems that simple CRUD apps don't face. I wanted to learn how to handle multi-part form data containing both text files and large video blobs, how to design database schemas that cleanly connect users, videos, likes, and comments, and how to query complex relationships without tanking application performance.

During development, my main focus was backend data structure and API design. Writing custom aggregation pipelines to fetch subscriber counts or compute channel-wide analytics helped me understand how database aggregation works in real applications. On the frontend, the challenge was managing state across nested routes (like tracking user authentication and keeping page layouts synchronized) without overcomplicating the codebase.

---

## Features

### Authentication
*   **JWT Session Handling**: Secure login and register flows using access and refresh tokens stored in HTTP-only cookies.
*   **Protected Routing**: Client-side route blocking to prevent unauthenticated access to personal spaces like liked videos or watch history.
*   **Persistent Auth State**: Smooth session recovery on page refresh via a Zustand authentication store.

### Video Operations
*   **Media Streaming & Upload**: Direct upload of video files and thumbnails using Multer multipart middleware and Cloudinary storage.
*   **HTML5 Custom Controls**: A polished video player layout built using standard HTML5 attributes.
*   **Engagement Tracking**: Like and dislike tracking, automatic view counting on play, and interactive comment threads.
*   **Related Content Feed**: Dynamic sidebar suggestions displaying recommended videos from the same creator.

### Playlists
*   **Content Curation**: Create, edit, and delete custom playlists to group favorite videos.
*   **Playlist Management**: Quick buttons to add or remove videos directly from a playlist card.
*   **Detailed View**: Specific folder view lists displaying video counts, creation timestamps, and individual video rows.

### Creator Workspace
*   **Channel Metrics**: Simple dashboard displaying channel subscribers, total catalog view counts, and total accumulated video likes.
*   **Content Management**: Dedicated studio section allowing creators to view, toggle publication status, or delete their uploaded videos.
*   **Subscribers & Channels**: Subscribe/unsubscribe buttons on video pages, with channels pages showcasing subscribers.

### Navigation & Search
*   **Global Search**: Filter bar in the main layout header to search the database for specific videos or channels.
*   **Responsive Sidebar**: Expandable/collapsible sidebar menu for easy navigation.
*   **Custom Dark/Light Themes**: Global theme selection toggle that persists across page reloads.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, React Router, Zustand, Axios, Tailwind CSS, Lucide Icons, React Hot Toast |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Media Handling** | Cloudinary API, Multer middleware |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |

---

## Folder Structure

```text
VidVerse/
├── backend/
│   ├── public/              # Temporary uploads directory
│   ├── src/
│   │   ├── controllers/     # Route logic handlers
│   │   ├── db/              # Database connection setup
│   │   ├── middlewares/     # Authentication & upload validation
│   │   ├── models/          # Mongoose schema definitions
│   │   ├── routes/          # Express route declarations
│   │   ├── utils/           # Helper scripts (Cloudinary uploader, API classes)
│   │   └── app.js           # Server application configuration
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (VideoCard, Avatar, etc.)
│   │   ├── layouts/         # Layout shells (MainLayout, StudioLayout)
│   │   ├── pages/           # Pages (Home, WatchVideo, PlaylistDetails, etc.)
│   │   ├── services/        # Axios API wrapper functions
│   │   ├── store/           # Zustand state managers
│   │   └── index.css        # Tailwind directives and CSS theme variables
```

---

## Screenshots

![Home Feed](screenshots/home.png)
*Home Feed displaying recommended videos and categories*

![Video Player](screenshots/watch.png)
*Custom HTML5 Video Player and related comments section*

![Creator Workspace](screenshots/studio.png)
*Creator Workspace showing channel analytics*

---

## Installation

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine. You will also need a Cloudinary account to store media assets.

### 1. Clone the repository
```bash
git clone https://github.com/vaidusdp/VidVerse.git
cd VidVerse
```

### 2. Configure Backend
Navigate to the `backend` folder, install dependencies, and create your environment configuration:
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend` directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/vidverse
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=http://localhost:5173
```

### 3. Configure Frontend
Navigate to the `frontend` folder, install dependencies, and setup the local environment:
```bash
cd ../frontend
npm install
```
Create a `.env` file inside the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Run the Project
Start the development servers for both layers:

**Start Backend:**
```bash
cd ../backend
npm run dev
```

**Start Frontend:**
```bash
cd ../frontend
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## API Overview

### Core Routes

| Route | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | POST | Registers a new channel | Public |
| `/api/v1/auth/login` | POST | Logs in a creator | Public |
| `/api/v1/auth/logout` | POST | Clears session cookies | Protected |
| `/api/v1/videos` | GET | Fetches all public videos (with search filter) | Protected |
| `/api/v1/videos/publish-video` | POST | Uploads and publishes a new video | Protected |
| `/api/v1/videos/:videoId` | GET | Retrieves video metadata by ID | Protected |
| `/api/v1/playlists/get-playlist/:playlistId` | GET | Fetches a playlist with populated videos | Protected |
| `/api/v1/dashboard/channel-stats` | GET | Computes subscribers, view counts, and likes | Protected |

---

## What I Learned

*   **Designing REST APIs**: I learned how to model clean endpoints, organize router structures, and manage session cookies safely.
*   **Authentication & Tokens**: Implementing double-token JWT (access and refresh tokens) gave me firsthand experience with secure login systems and automatic session restoration.
*   **MongoDB Aggregation**: Writing complex pipelines for operations like counting subscribers, checking whether a logged-in user has liked a video, and compiling channel-wide view metrics helped me understand database performance tuning.
*   **React State & Routing**: Building the sidebar navigation, layout structures, and watch page taught me how to pass context down standard routes, handle dynamic page resizing, and keep client state in sync using Zustand.
*   **Handling Media Uploads**: Integrating Multer on Node.js to stage files locally, validating uploads, and shipping them over to Cloudinary taught me how to manage large files without blocking execution threads.

---

## Future Improvements

*   **Video Transcoding**: Convert uploaded videos into multiple resolutions (1080p, 720p, 480p) to optimize streaming speed.
*   **Infinite Scrolling**: Replace standard pagination with an infinite scroll component on the Home and search results pages.
*   **WebSockets Integration**: Add live comment updates and real-time subscriber count updates on channel profiles.
*   **User Notifications**: Send dynamic alerts to subscribers when a creator uploads a new video.
*   **Advanced Analytics**: Build charts to track view metrics, subscriber growth, and average watch time trends.

---

## Acknowledgements

*   Inspiration and design choices modeled after the core features of YouTube.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
