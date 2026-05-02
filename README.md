# 🚀 Project Manager Web App

A full-stack project management application where users can create projects, assign tasks, and track progress with role-based access control.

---

## 🌐 Live Demo

* **Frontend:** https://project-management-bkhd3ad4d-akbar1001s-projects.vercel.app
* **Backend API:** https://project-management-production-0360.up.railway.app

---

## 📦 GitHub Repository

https://github.com/your-username/project-manager

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure password hashing (bcrypt)

### 👥 Role-Based Access

* **Admin**

  * Create projects
  * Assign tasks
  * Manage members
* **Member**

  * View assigned tasks
  * Update task status

### 📁 Project Management

* Create and manage projects
* Add team members
* View project list

### ✅ Task Management

* Create and assign tasks
* Update task status (todo / in-progress / done)
* Set due dates

### 📊 Dashboard

* Task statistics overview
* Status distribution
* Overdue task tracking

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* CSS (custom SaaS-style UI)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* **Backend:** Railway
* **Frontend:** Vercel

---

## 📂 Folder Structure

project-manager/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── styles/

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

git clone https://github.com/Akbar1001/project-manager.git
cd project-manager

---

### 2️⃣ Backend Setup

cd backend
npm install

Create a `.env` file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

Run backend:

npm run dev

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

## 🔑 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Projects

* POST `/api/projects` (Admin only)
* GET `/api/projects`
* GET `/api/projects/:id`

### Tasks

* POST `/api/tasks` (Admin only)
* GET `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id` (Admin only)

### Dashboard

* GET `/api/dashboard`

---

## 🔥 Highlights

* Full-stack deployed application
* Role-based access control
* Clean and modern SaaS UI
* RESTful API architecture
* Real-world project workflow

---

## 🚀 Future Improvements

* Kanban board (drag & drop tasks)
* Notifications system
* File attachments
* Comments on tasks
* Charts for analytics

---
