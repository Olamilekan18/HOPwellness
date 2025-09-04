# 🌿 HopWellness

[![Live Demo](https://img.shields.io/badge/demo-online-green)](https://hopwellness.vercel.app/)

HopWellness is a wellness and lifestyle platform designed to empower healthier living through **daily challenges**, **community support**, and **personal growth tools**.  
It combines fitness, mindfulness, and healthy habits in a simple, engaging way.

---

## ✨ Features
- ✅ **Daily Challenges** (hydration, mindfulness, posture checks, etc.)
- 👥 **Community Support** — join groups, share progress, and connect with others
- 📊 **Stats & Tracking** — monitor your habits and growth
- 🎯 **Gamified Wellness** — earn XP points for completing tasks
- 🌗 **Dark/Light Mode** friendly UI

---

## 🖼️ Screenshots
*(Optional: add images of your app once ready — `public/screenshots/`)*  

---

## 🚀 Deployment
The app is deployed on **Vercel**:  
👉 [https://hopwellness.vercel.app/](https://hopwellness.vercel.app/)

Backend is deployed separately on **Render**.

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Deployment:** Vercel (frontend), Render (backend)
- **Auth:** JWT (JSON Web Tokens)

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- Node.js >= 18
- npm or yarn
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hopwellness.git
   cd hopwellness

npm install

Create a .env file in both frontend/ and backend/ with:

# Frontend
VITE_BACKEND_URL=https://your-backend-url.onrender.com

# Backend
MONGO_URI=your-mongodb-connection
JWT_SECRET=your-secret
PORT=5000

cd frontend
npm run dev

cd backend
npm start
