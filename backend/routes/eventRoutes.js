const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getRegisteredUsers
} = require("../controllers/eventController");
const Event = require("../models/Event");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
router.post("/register/:id", protect, registerForEvent);
router.post("/unregister/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.registeredUsers = event.registeredUsers.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await event.save();

    req.user.registeredEvents = req.user.registeredEvents.filter(
      (eventId) => eventId.toString() !== req.params.id
    );
    await req.user.save();

    res.json({ message: "Unregistered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id/registered-users", protect, adminOnly, getRegisteredUsers);


module.exports = router;
