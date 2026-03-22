require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const { serve } = require("inngest/express");

const { inngest, functions } = require("./inngest");
const connectDB = require("./configs/db");

const app = express();

const PORT = process.env.PORT || 3000;

//** middlewares */
app.use(express.json());
app.use(cors());

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use(clerkMiddleware());

// Ensure DB is available before handling API requests.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

//**routes */
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
