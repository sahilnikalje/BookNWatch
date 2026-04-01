# BookNWatch

BookNWatch is a full-stack movie ticket booking platform where users can browse movies, watch trailers, choose show timings, select seats, and manage bookings.

## Live Links

- Backend: https://book-n-watch-mu.vercel.app
- Frontend: https://book-n-watch-mu.vercel.app

## What I Used

### Frontend

- React 19
- Vite 6
- Tailwind CSS 4
- React Router DOM
- Axios
- Clerk (authentication)
- React Hot Toast
- React Player
- Lucide React

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- Clerk Express middleware (auth)
- Stripe (payments and webhooks)
- Inngest (background/event workflows)
- Nodemailer (email support)
- Cloudinary
- Axios
- CORS
- Dotenv

## Key Features

- User authentication and protected routes
- Browse and explore movie listings
- Show and seat booking flow
- Booking management for users
- Admin panel for shows and bookings
- Payment integration using Stripe
- Event-driven workflows with Inngest

## Project Structure

- Frontend app: Frontend
- Backend API: Backend

## Run Locally

### 1. Clone the repository

git clone <your-repo-url>
cd BookNWatch

### 2. Setup Backend

cd Backend
npm install
node server.js

### 3. Setup Frontend

cd ../Frontend
npm install
npm run dev

## Environment Variables

Create a .env file inside Backend with the required values for:

- Clerk keys
- MongoDB URI
- Stripe keys and webhook secret
- Inngest keys
- SMTP credentials
- TMDB key
- Frontend URL