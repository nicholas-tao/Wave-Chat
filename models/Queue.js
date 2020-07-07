const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  active:{
    type: Boolean,
    default: false,
  },

  roomId:{
    type: String,
    default: "roomLink",
  },
  email: {
    type: String,
    required: true,
  },

  interests: {
    type: [String],
    default: ["food"],
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

const Queue = mongoose.model("Queue", QueueSchema);

module.exports = Queue;
