const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
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

  commonInterests: {
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

const Room = mongoose.model("Room", RoomSchema, "rooms");

module.exports = Room;
