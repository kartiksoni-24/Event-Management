const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const eventRoutes = require("./routes/eventRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
// const userRoutes = require("./routes/userRoutes.js");
// import authRoutes from "./routes/authRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
