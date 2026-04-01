<div align="center">

# BookNWatch

**Full-stack movie ticket booking platform for Hindi & Marathi cinema**

[![Live Demo](https://img.shields.io/badge/Live-Demo-e91e63?style=flat-square)](https://book-n-watch-mu.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square)](https://booknwatch-backend-8r27.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat-square&logo=github)](https://github.com/sahilnikalje/BookNWatch)

</div>

---

## What is BookNWatch?

BookNWatch is a complete MERN stack movie ticket booking app. Users can explore movies, watch trailers, choose show timings, pick seats, pay securely — and get an email confirmation. There's also a full admin panel to manage movies, shows, and bookings.

> ⚠️ **Note:** Backend is hosted on Render's free tier. First request after inactivity may take ~30 seconds to wake up.

---

## Features

- **Authentication** — Clerk-powered login with protected routes
- **Movie Listings** — Browse movies with posters, trailers, and show timings via TMDB
- **Seat Selection** — Interactive real-time seat map per show
- **Stripe Payments** — Secure checkout with webhook-based booking confirmation
- **Email Notifications** — Booking confirmations, show reminders, and new show alerts
- **Booking History** — Users can view and manage their bookings
- **Admin Panel** — Role-gated dashboard to manage movies, shows, and bookings
- **Background Jobs** — Inngest handles seat auto-release on payment failure and show reminders

---

## Tech Stack

### Frontend
| Package | Purpose |
|---------|---------|
| React 19 + Vite 6 | UI framework & build tool |
| Tailwind CSS 4 | Styling |
| React Router DOM | Client-side routing |
| Clerk | Authentication |
| Axios | HTTP requests |
| React Player | Trailer playback |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Package | Purpose |
|---------|---------|
| Node.js + Express 5 | Server |
| MongoDB + Mongoose | Database |
| Clerk Express | Auth middleware |
| Stripe | Payments & webhooks |
| Inngest | Background job workflows |
| Nodemailer | Transactional email |
| Cloudinary | Media uploads |

---

## Project Structure

```
BookNWatch/
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/              # AdminNavbar, AdminSidebar, Title
│   │   │   └── ...                 # Navbar, MovieCard, DateSelect, etc.
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── lib/                    # dateFormat, timeFormat, kConverter etc.
│   │   ├── pages/
│   │   │   ├── admin/              # Dashboard, AddShows, ListShows, ListBookings
│   │   │   └── ...                 # Home, Movies, MovieDetails, SeatLayout, MyBookings
│   │   └── App.jsx
│   └── public/
│
└── Backend/
    ├── configs/                    # DB, Nodemailer, email templates
    ├── controllers/                # route logic
    ├── inngest/                    # background job functions
    ├── middlewares/                # auth guard
    ├── models/                     # Mongoose schemas
    ├── routes/
    └── server.js
```

---

## Local Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Clerk, Stripe, Inngest accounts
- SMTP credentials (Gmail app password works)
- TMDB API key

### 1. Clone

```bash
git clone https://github.com/sahilnikalje/BookNWatch.git
cd BookNWatch
```

### 2. Backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
# Clerk
CLERK_SECRET_KEY=

# MongoDB
MONGODB_URI=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# SMTP
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# TMDB
TMDB_API_KEY=

# App
FRONTEND_URL=http://localhost:5173
```

```bash
node server.js
# http://localhost:3000
```

### 3. Frontend

```bash
cd ../Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BACKEND_URL=http://localhost:3000
```

```bash
npm run dev
# http://localhost:5173
```

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://book-n-watch-mu.vercel.app |
| Backend | Render | https://booknwatch-backend-8r27.onrender.com |

Both `Frontend/vercel.json` and `Backend/vercel.json` are already configured.

> Make sure `FRONTEND_URL` in backend `.env` matches the deployed frontend URL — used for CORS and email links.

---

## API Routes Overview

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/show/upcoming` | Get upcoming shows | Public |
| GET | `/api/show/:id` | Show details | Public |
| POST | `/api/booking/create` | Create booking | User |
| GET | `/api/booking/user` | User's bookings | User |
| POST | `/api/admin/show` | Add a show | Admin |
| GET | `/api/admin/bookings` | All bookings | Admin |
| POST | `/api/stripe/webhook` | Stripe webhook handler | Stripe |

---

<div align="center">
Built by <a href="https://github.com/sahilnikalje">Sahil Nikalje</a>
</div>
