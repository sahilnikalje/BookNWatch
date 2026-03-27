require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const { serve } = require("inngest/express");

const connectDB = require("./configs/db");
const { inngest, functions } = require("./inngest");

const stripeWebhooks=require('./controllers/stripeWebhooks')

const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

//**Stripe webhooks route */
app.use('/api/stripe', express.raw({type:'application/json'}), stripeWebhooks)

//** middlewares */
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

//**routes */
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

startServer();
