# Blocksy - Full Stack Crypto Blog Platform

## 1. Project Overview
**Blocksy** is a modern full-stack web application that allows users to explore, post, and discuss the latest trends in cryptocurrency. It combines real-time crypto news, user-generated blogs, and an interactive comment system. Designed for both readers and creators, Blocksy provides a seamless experience powered by a secure JWT-based authentication system.

**Tagline:** *Your gateway to the crypto world — built for traders and enthusiasts.*

---

## 2. Tech Stack

### **Frontend:**
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) Authentication
- Cookie Parser
- CORS

### **Other Tools & Services:**
- Vercel (Frontend Deployment)
- Render (Backend Hosting)
- News API (for fetching crypto news)

---

## 3. Core Features

### **Authentication**
- Secure login/signup using JWT.
- Refresh and access tokens stored in cookies.
- Persistent authentication using Redux Persist.
- Protected routes on both frontend and backend.

### **User Posts (Blogs)**
- Create, read, update, and delete blog posts.
- Each post includes title, content, author, and timestamp.
- Only the post author can delete or edit their post.

### **Comments System**
- Users can add comments on any blog post.
- Authors can delete any comment under their post.
- Comments update dynamically without reload.

### **Crypto News**
- Integrated with a third-party News API to display the latest crypto news.
- Dynamic news feed updated in real-time.

### **Responsive UI**
- Fully responsive design built with Tailwind CSS.
- Optimized for mobile, tablet, and desktop devices.

---

## 4. Setup Instructions

### **Frontend Setup**
```bash
# Clone the repository
git clone https://github.com/zararafridi/blocksy-client.git
cd blocksy-client

# Install dependencies
npm install

# Create a .env file
VITE_API_URL=http://localhost:5000

# Run the development server
npm run dev
```

### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/zararafridi/blocksy-server.git
cd blocksy-server

# Install dependencies
npm install

# Create a .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:3000

# Run the server
npm start
```

---

## 5. API Endpoints

### **Auth Routes**
| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user and clear cookies |

### **Post Routes**
| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/api/posts` | Fetch all posts |
| GET | `/api/posts/:id` | Fetch single post by ID |
| POST | `/api/posts` | Create new post (auth required) |
| PUT | `/api/posts/:id` | Update post (author only) |
| DELETE | `/api/posts/:id` | Delete post (author only) |

### **Comment Routes**
| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | `/api/comments/:postId` | Add comment to a post |
| DELETE | `/api/comments/:commentId` | Delete comment (author only) |

### **News Routes**
| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/api/news` | Fetch crypto news from News API |

---

## 6. Folder Structure

### **Frontend (React)**
```
blocksy-client/
├─ src/
│   ├─ app/
│   │   └─ store.js
│   ├─ features/
│   │   ├─ auth/
│   │   ├─ posts/
│   │   └─ comments/
│   ├─ components/
│   ├─ pages/
│   ├─ services/
│   └─ App.jsx
└─ tailwind.config.js
```

### **Backend (Node.js)**
```
blocksy-server/
├─ config/
├─ controllers/
├─ database/
├─ dto/
├─ middleware/
├─ models/
├─ routes/
├─ services/
└─ server.js
```

---

## 7. Future Improvements
- Implement user profile pages with profile pictures.
- Add like/dislike functionality for posts.
- Integrate WebSockets for live comment updates.
- Add support for image uploads in posts.
- Dark/light theme toggle.

---

## 8. Credits
- **Developer:** Muhammad Zarar Afridi  
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express + MongoDB  
- **Hosting:** Vercel & Render  
- **API Source:** NewsAPI.org  

---

**Blocksy** — *A modern crypto blog platform for creators, investors, and readers alike.*

