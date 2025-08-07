const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  image: { type: String, required: true },
});

const LocationSchema = new mongoose.Schema({
  venue: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
});

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    type: {
      type: String,
      enum: ["Online Event", "Offline Event", "Online", "Offline"],
      required: true,
    },
    image: { type: String, required: true },
    hostedBy: { type: String, required: true },
    location: { type: LocationSchema, required: true },
    price: { type: Number, required: true },
    dressCode: { type: String, required: true },
    ageRestrictions: { type: String, required: true },
    description: { type: String, required: true },
    speakers: { type: [SpeakerSchema], required: true },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", EventSchema);

module.exports = Events;
