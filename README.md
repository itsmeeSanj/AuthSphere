# AuthSphere 🔐

A full-stack authentication system built with the MERN stack and TypeScript, featuring JWT authentication via HTTP-only cookies, OTP-based password reset, and a role-based admin dashboard.

> 🔗 [GitHub Repository](https://github.com/itsmeeSanj/AuthSphere)

## ✨ Features
- JWT auth with HTTP-only cookies (XSS protected)
- Register, Login, Logout
- Forgot password with 6-digit OTP via email
- Role-based protected routes
- Admin dashboard with real-time user stats
- Auth state persists on page refresh
---

## 🛠️ Tech Stack
**Frontend** — React, TypeScript, Vite, Ant Design, Tailwind CSS, React Router, Context API
**Backend** — Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Nodemailer, cookie-parser
---

## 🚀 Getting Started
**Clone**
```bash
git clone https://github.com/itsmeeSanj/AuthSphere.git
```

**Server**
```bash
cd server
npm install
cp .env.example .env
npm run dev        # starts with nodemon on localhost:4000
```
> Nodemon is included as a dev dependency — `npm install` handles it automatically.


**Client**
```bash
cd client
npm install
nodemon start       # localhost:5173
```

---

## ⚙️ Environment Variables
Create `server/.env` using `.env.example`:
```env
MONGODB_URI=
JWT_SECRET=
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SMTP_USER=
SMTP_PASSWORD=
SENDER_EMAIL=
```
> ⚠️ Never commit your real `.env` — it is already in `.gitignore`

---

## 🔑 API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/send-reset-otp` | Send OTP to email |
| POST | `/api/auth/verify-reset-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/user/stats` | Get user stats (admin) |

---

## 👤 Author
**Sanjay Rawal** · [GitHub](https://github.com/itsmeeSanj) · [LinkedIn](https://www.linkedin.com/in/sanjay-rawal-311846184/)

---

## 📄 License
MIT
