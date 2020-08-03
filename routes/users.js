const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const { db, getMaxListeners } = require("../models/User");
const Queue = require("../models/Queue");
const QueueModule = require("../QueueModule");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

require("dotenv").config();

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.get("/register", (req, res) => {
  res.render("register");
});

Router.get("/verify", (req, res) => {
  res.render("verify");
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
        "Wave is only available to UWaterloo students at the moment. Please use your uwaterloo.ca email.",
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
                //req.flash("success_msg", "You are now registered");
                res.redirect("/users/verify");
              })
              .catch((err) => console.log(err));
          })
        );
        sendEmail(newUser);
        //sending mail here
      }
    });
  }
});

Router.post("/change-password", (req, res) => {
  //get the passwords from the form submitted

  const oldPass = req.body.password;

  const newPass1 = req.body.newPassword;

  const newPass2 = req.body.confirmNewPassword;

  console.log(oldPass);
  console.log(newPass1);
  console.log(newPass2);

  console.log(req.user.password);

  //check if the old password is correct
  bcrypt.compare(oldPass, req.user.password, function (err, res) {
    if (err) {
      //handle error
    }
    if (res) {
      //response if pass match
      console.log("success");

      if (newPass1.localeCompare(newPass2) === 0) {
        //hash password and update db

        //if old pass is correct and both new passwords match create the new password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newPass1, salt, (err, hash) => {
            if (err) {
              console.log("error hit");
            }

            console.log("new pass: " + hash);

            //update the db with the new password
            User.findOneAndUpdate(
              { email: req.user.email },
              { $set: { password: hash } },
              function (error, response) {
                if (error) {
                  console.log("something went wrong");
                }
              }
            );
          })
        );

        console.log("password updated");
      } else {
        //if there is error output to user
      }
    } else {
      //if the new passwords don't match, add error msg and output to user
    }
  });

  res.redirect("/dashboard/home");
});

//SEND EMAIL FUNCTION
function sendEmail(newUser) {
  let randomnum = 100000 + Math.floor(Math.random() * Math.floor(899999));
  newUser.code = randomnum;

  console.log(newUser);
  
    const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

  const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "wavechat.team@gmail.com", 
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken: process.env.REFRESH_TOKEN,
       accessToken: accessToken
  }
});

  // send mail with defined transport object
    const message = {
    from: '"Wave" <wavechat.team@gmail.com>', // Sender address
    to: newUser.email, //this works
    subject: "Your Unique Verification Code", // Subject line
    html:
      "Hi, <br /> <br />Thanks for signing up with Wave! <br /> Your unique verification code is <strong>" +
      randomnum +
      "</strong> <br /><br /> Best, <br /> Wave Team",
    //style it later
  };
  
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
} //end of send mail method

//ROUTER POST REQUEST FOR VERIFY
Router.post("/verify", (req, res) => {
  const { email, pin } = req.body;
  console.log(email);
  console.log(pin); //gets email and poin

  //RESEND VERIFICATOIN VODE
  if (pin == null) {
    //if they entered in the resend email box
    User.find({ email: email }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result[0] == null) {
          console.log("here");
          req.flash(
            //error message
            "error_msg",
            "Your email has not yet been registered. Please Register"
          );
          res.redirect("/users/register");
        } else if (result[0].authenticated == true) {
          console.log("already verified");
          req.flash(
            //error message
            "error_msg",
            "Your email has already been verified! Please Login"
          );
          res.redirect("/users/login");
        } else {
          req.flash("success_msg", "Email Sent!");
          let randomnum2 =
            100000 + Math.floor(Math.random() * Math.floor(899999));

          User.findOneAndUpdate(
            { email: result[0].email },
            {
              $set: {
                code: randomnum2,
              },
            },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                //  console.log("THE CODE IN THE DB IS " + result.code); //the previous code? idk
                
                const oauth2Client = new OAuth2(
                  process.env.CLIENT_ID, // ClientID
                  process.env.CLIENT_SECRET, // Client Secret
                   "https://developers.google.com/oauthplayground" // Redirect URL
              );
              
              
              oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN
              });
              
              const accessToken = oauth2Client.getAccessToken()
                const transport2 = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                       type: "OAuth2",
                       user: "wavechat.team@gmail.com", 
                       clientId: process.env.CLIENT_ID,
                       clientSecret: process.env.CLIENT_SECRET,
                       refreshToken: process.env.REFRESH_TOKEN,
                       accessToken: accessToken
                  }
                });

                // send mail with defined transport object
                const message2 = {
                  from: '"Wave" <wavechat.team@gmail.com>', // Sender address
                  to: result[0].email, //this works
                  subject: "Your Unique Verification Code", // Subject line
                  html:
                    "Hi, <br /> <br />Thanks for signing up with Wave! <br /> Your unique verification code is <strong>" +
                    randomnum2 +
                    "</strong> <br /><br /> Best, <br /> Wave Team",
                  //style it later
                };
                transport2.sendMail(message2, function (err, info) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(info);
                  }
                });
              
                res.redirect("/users/verify");
              }
            }
          );
        }
      }
    });
  }

  //ATTEMPT TO VERIFY
  else {
    let userCode;
    User.find({ email: email }, function (err, result) {
      //find user based on the email entered
      if (err) {
        console.log(err);
      } else if (result[0] == null) {
        //if there email is not yet regiestered, redirect them back to the register page
        req.flash(
          "error_msg",
          "Your email has not yet been registered. Please Register"
        );
        res.redirect("/users/register");
      } else {
        userCode = result[0].code; //stores the code
        if (pin == userCode) {
          //if it matches,
          console.log("same!");
          User.findOneAndUpdate(
            { email: email },
            {
              //Updating db
              $set: {
                authenticated: true,
              },
            },
            function (err, result) {
              //if successful verification, send them back to login page to relogin
              if (err) {
                console.log(err);
              } else {
                req.flash(
                  "success_msg",
                  "You are now registered. Please login again to continue"
                );
                res.redirect("/users/login");
              }
            }
          );
        } else {
          //invalid pin/email
          req.flash("error_msg", "Invalid email or PIN. Please try again.");
          res.redirect("/users/verify");
          console.log("fail");
        }
      }
    });
  }
});

//account made, correct verify, authenticated = true --> login
//account made, incorrect verify --> err message; verify again
//account made, try to login --> says need to verify
//try to verify, no account --> register
//reverify, no account --> register
//reverify, correct email -->  works
//try to verify, already verified --> tells to login

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

Router.get("/leaveQueue", (req, res) => {
  /*
  Queue.deleteOne({ email: req.user.email }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
    }
  });
  */
  //console.log("req.user: ", req.user);

  QueueModule.delUser(req.user);
  console.log("made it here");
  res.sendStatus(200);
});

Router.get("/closeTab", (req, res) => {
  /*
  Queue.deleteOne({ email: req.user.email }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
    }
  });
  */
  QueueModule.delUser(req.user);

  User.findOneAndUpdate(
    { email: req.user.email },
    {
      $set: {
        status: "offline",
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  res.sendStatus(200);
});

Router.get("/logout", (req, res) => {
  try {
    //console.log(req.user.email);\
    /*
    Queue.deleteOne({ email: req.user.email }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        //console.log(result);
      }
    });
     do this for queue too
  Queue.findOneAndUpdate(
    { email: req.user.email },
    {
      $set: {
        status: 'offline',
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
*/

    QueueModule.delUser(req.user);

    User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          status: "offline",
        },
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      }
    );
    console.log("logging out: ", req.user.email); //this did not print when i was on chat page and clicked "Leave" (but the leave btn brought be back to the dashboard and i was logged out)
    req.logout();
  } catch (err) {
    console.log(err);
  }

  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

Router.post("/dashboard", (req) => {
  const { interest } = req.body;
  //console.log(interest);
  //console.log(req.user.email);
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
