const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: req.user._id, 
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.registeredUsers.length >= event.registrationLimit) {
      return res.status(400).json({ message: "Registration limit reached" });
    }

    if (event.registeredUsers.includes(req.user._id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registeredUsers.push(req.user._id);
    await event.save();

    req.user.registeredEvents.push(event._id);
    await req.user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
};
