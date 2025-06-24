const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  branch: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
