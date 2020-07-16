const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
    required: true,
  },
  email1: {
    type: String,
    required: true,
  },
  email2: {
    type: String,
    required: true,
  },
  program1: {
    type: String,
    required: true,
  },
  program2: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    default: "roomLink",
  },
  /*
  commonInterests: {
    type: [String],
    default: undefined,
  },
  */
  interests1: {
    type: [String],
    default: undefined,
  },
  interests2: {
    type: [String],
    default: undefined,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", RoomSchema, "rooms");

module.exports = Room;
