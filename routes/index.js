const express = require("express");
const Router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Queue = require("../models/Queue");
const Room = require("../models/Room")
var opn = require("opn");

Router.get("/", (req, res) => {
  res.render("welcome");
});

Router.get(
  "/dashboard",
  ensureAuthenticated,
  (req, res, next) => {
    //   console.log(req.user)

    // console.log(req.session);
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          status: "online",
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

    var count = 0;
    User.find({ status: "online" }, function (err, result) {
      if (err) {
        console.log(err);
      }

      //console.log(result)
      count = Object.keys(result).length;
      console.log(count);

      res.render("dashboard", {
        name: req.user.name,
        email: req.user.email,
        onlineCount: count,
      });
    });
    next();
  },
  function (req, res) {
    var x = setTimeout(function () {
      //console.log("hello world");
      opn("http://omegu.tech/users/logout");
    }, 720000); //log user out after 720000ms = 2 hrs
  }
);

Router.get("/dashboard/profile", ensureAuthenticated, (req, res) => {
  req.flash("contentCode", "profile");
  res.redirect("/dashboard");
});

Router.get("/dashboard/home", ensureAuthenticated, (req, res) => {
  req.flash("contentCode", "home");
  res.redirect("/dashboard");
});

Router.use(express.json()); //FOR PARSING POST REQUESTS

///////////////////////////////////////

//CHANGE PROFILE QUALITIES
Router.post("/dashboard/profile", ensureAuthenticated, (req, res) => {
  const { fac, prog, year } = req.body; //Collect necessary profile qualities from POST request
  if (fac == "none") {
    //avoid overwriting existing db qualities if user just wants to change graduating year
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        //Update database with said qualities
        $set: {
          gradYear: year,
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
  } else {
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        //Update database with said qualities
        $set: {
          faculty: fac,
          program: prog,
          gradYear: year,
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
  }
  res.sendStatus(200); //Return successful response code to browser
});

//ADD INTEREST FUNCTION
Router.post("/dashboard/append", ensureAuthenticated, (req, res) => {
  const { append } = req.body; //Collect interest to be appended to array
  User.findOneAndUpdate(
    { email: req.user.email }, //push interest to interests array
    { $push: { interests: append } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  res.sendStatus(200); //send relevant response code
});

//DELETE INTEREST FUNCTION
Router.post("/dashboard/delete", ensureAuthenticated, (req, res) => {
  const { del } = req.body; //Collect interest to be appended to array
  User.findOneAndUpdate(
    { email: req.user.email }, //push interest to interests array
    { $pull: { interests: del } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
  res.sendStatus(200); //send relevant response code
});

//LOAD INTERESTS FROM DB
Router.get("/dashboard/load", ensureAuthenticated, (req, res) => {
  res.send(JSON.stringify(req.user.interests));
});

//LOAD PROFILE DATA FROM DB
Router.get("/dashboard/load/profile", ensureAuthenticated, (req, res) => {
  var data = {
    faculty: req.user.faculty,
    program: req.user.program,
    year: req.user.gradYear,
  };

  res.send(JSON.stringify(data));
});

//START CHATTING
Router.get("/dashboard/start", ensureAuthenticated, (req, res) => {
  //ADD USER TO QUEUE
  Queue.findOne({ email: req.user.email }) //check if user is in queue
    .then(async (queueUser) => {
      if (!queueUser) {
        //if not, make document for user in queue

        bool = false; //set inQueue to false

        var newQueue = new Queue({
          name: req.user.name,
          email: req.user.email,
          interests: req.user.interests,
          program: req.user.program,
        });

        newQueue.save((err) => {
          if (err) return handleError(err);
        });

        //WAIT FOR NEW ROOM DOCUMENT TO BE CREATED WITH USER'S EMAIL
        var watcher = Room.watch([], {fullDocument: "updateLookup"})
        .on('change', (data) => {
          console.log(data)
          if(data.fullDocument.email1 == req.user.email || data.fullDocument.email2 == req.user.email) {
            //REDIRECT GOES HERE
            watcher.close()
          }
        })

        console.log("added to queue");
      } else {
        bool = true; //set inQueue to true
        console.log("in queue already");
      }

      res.status(200).json({ inQueue: bool }); //send if in queue to browser
    });
});



function generateRoomID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = Router;
