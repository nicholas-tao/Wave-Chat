const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.get("/register", (req, res) => {
  res.render("register");
});

Router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  //old version whitelist, updated to include only waterloo
  // var whiteList = ["uwaterloo.ca","yorku.ca","utoronto.ca","mcmaster.ca","ryerson.ca","queensu.ca","uwo.ca","uottawa.ca","carleton.ca","wlu.ca"]

  var whiteList = ["uwaterloo.ca"];
  var emailExt = email.split("@")[1];
  var temp = true;
  whiteList.forEach((ext) => {
    if (ext == emailExt) temp = false;
  });

  if (temp) {
    // old error message, updated for waterloo email specific
    // errors.push({msg: 'Email not affiliated with a post secondary institution'})

    errors.push({
      msg:
        "OmegU is only available to UWaterloo students at the moment. Please use your uwaterloo.ca email.",
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You are now registered");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

Router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

Router.post("/dashboard", (req) => {
  const { interest } = req.body;
  console.log(interest);
  console.log(req.user.email);
  User.findOneAndUpdate(
    { email: req.user.email },
    { $push: { interests: interest } },
    { new: true },
    (err, result) => {
      console.log("finished updating db");
    }
  );
});

module.exports = Router;
