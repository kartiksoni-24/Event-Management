const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const eventRoutes = require("./routes/eventRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    // origin: " http://localhost:5173",
    origin: "https://college-event-hub.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
