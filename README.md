# 🎉 EventHub (Event Management System) — MERN Stack Project

A full-stack event management platform where users can register for events and admins can manage event listings. Built using the MERN stack with modern UI (Tailwind + DaisyUI), JWT authentication, MongoDB Atlas, and smooth animations.

---

## 🚀 Tech Stack

**Frontend**

- React.js (Vite)
- Tailwind CSS + DaisyUI
- Axios for API calls
- React Router DOM

**Backend**

- Node.js + Express.js
- MongoDB (hosted on MongoDB Atlas)
- JWT Authentication
- Mongoose (MongoDB ODM)

**Deployment**

- Frontend: [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)

---

## 🧩 Features

### 🔐 Authentication

- JWT-based login/register
- Admin login (hardcoded credentials)
- Role-based navigation

### 🎫 Event Management

- Users can register/unregister for events
- Admin can create, edit, delete events
- Dynamic event count & seat tracking

### 🖼️ UI/UX

- Stylish, responsive design
- Card layout, animation, and transitions
- Toast notifications on actions

### 🧑‍🎓 User Profile

- "Profile" page shows registered events
- "Admin Profile" shows created events

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/my-event-app.git
cd my-event-app
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=8080
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node index.js
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## 🌱 Future Enhancements

- 🖼️ Image upload for events (Cloudinary)
- 🔍 Event filter option
- 🗃️ Paginated event listing
- 📧 Forget password & email OTP flow
- 📄 PDF ticket generation for events
- 🔔 Email notifications on registration

---
