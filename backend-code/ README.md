# Backend Server Setup

This is the backend server for the project. It includes configurations for Cloudinary, MongoDB, and email services.

## 📁 Project Structure

/backend-code
├── /controllers
├── /models
├── /routes
├── /utils
├── .env
├── server.js (or index.js)
└── package.json


---

## 🧾 Requirements

- Node.js (v14+ recommended)
- npm 
- MongoDB Atlas
- Cloudinary account
- Gmail account (for email service)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MONGODB_URI=
PORT=

EMAIL_USER=
EMAIL_PASS=

cd backend-code
npm i 
npm start