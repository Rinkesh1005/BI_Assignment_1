const express = require("express");
const app = express();
const cors = require("cors");
const { initialiseDatabase } = require("./db/db.connect");
const Events = require("./models/event.models");
const corsOrigin = {
  origin: "*",
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOrigin));

initialiseDatabase();

const addNewEventData = async (eventData) => {
  try {
    const event = new Events(eventData);
    await event.save();
    return event;
  } catch (error) {
    console.error("Error inserting event:", error.message);
    throw error;
  }
};

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await addNewEventData(req.body);
    res.status(201).json({
      message: "Event added successfully",
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

const getAllEvents = async () => {
  try {
    const events = await Events.find();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents();
    if (events.length !== 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

const getEventById = async (eventId) => {
  try {
    const event = await Events.findById(eventId);
    return event;
  } catch (error) {
    console.error("Error fetching event by ID:", error.message);
    throw error;
  }
};

app.get("/events/:id", async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event by ID." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
