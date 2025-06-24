// import mongoose from "mongoose";
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  registrationLimit: Number,
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// export default mongoose.model("Event", eventSchema);
module.exports = mongoose.model("Event", eventSchema);
