const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
  university: {
    type: String,
    default: "University of Waterloo",
  },
  faculty: {
    type: String,
    default: "No Faculty Entered",
  },
  program: {
    type: String,
    default: "No Program Entered",
  },
  gradYear: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
  code: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "offline",
  },
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
