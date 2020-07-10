const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    default: "roomLink",
  },
  email: {
    type: String,
    required: true,
  },

  interests: {
    type: [String],
    default: undefined,
  },

  program: {
    type: String,
    default: "No Program Entered",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Queue = mongoose.model("Queue", QueueSchema, "queue");

module.exports = Queue;
