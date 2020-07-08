const express = require("express");
const Router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Queue = require("../models/Queue");

Router.get("/", (req, res) => {
  res.render("welcome");
});

Router.get("/dashboard", ensureAuthenticated, (req, res) => {
  //   console.log(req.user)
  var count = Math.floor(Math.random() * 10000) + 1;

  res.render("dashboard", {
    name: req.user.name,
    email: req.user.email,
    onlineCount: count,
    //static count rn, should discuss
  });
});

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
  // var data = {
  //     "Profile-Info":{
  //         "faculty": req.user.faculty,
  //         "program": req.user.program,
  //         "year": req.user.gradYear
  //     }
  // }

  // var faculty = req.user.faculty
  // var program = req.user.program
  // var gradYear = req.user.gradYear

  // var data = [faculty, program, gradYear]

  var data = {
    faculty: req.user.faculty,
    program: req.user.program,
    year: req.user.gradYear,
  };

  // res.send(req.user.faculty, req.user.program, req.user.gradYear)
  // console.log(res)
  // res.send(JSON.stringify(data))

  res.send(JSON.stringify(data));
});

//START CHATTING
Router.get("/dashboard/start", ensureAuthenticated, (req, res) => {
  //ADD USER TO QUEUE
  Queue.findOne({ email: req.user.email }) //check if user is in queue
    .then((queueUser) => {
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

        console.log(newQueue);
      } else {
        bool = true; //set inQueue to true
        console.log("in queue already");
      }

      res.status(200).json({ inQueue: bool }); //send if in queue to browser
    });
});

Router.get("/find-match", ensureAuthenticated, (req, res) => {
  //load the current user's interests into local array
  var userInterests = req.user.interests;

  //variable to hold the matched user
  var matchedUser = null;

  var foundMatch = false;

  //loop through each item in the interests
  for (var interestItem in userInterests) {
    //find user in queue whose interest array contains the interest item
    matchedUser = Queue.findOne({ interests: { $all: [interestItem] } });

    //if there is a matched user
    if (matchedUser != null) {
      foundMatch = true;
      break;
    }
  }

  if (foundMatch) {
    //send the room id to the queue objects of both users
    //return user found
    console.log("matched user's interests: " + matchedUser.interests);
    console.log("this user's interests: " + userInterests);
    let roomID = generateRoomID(16); //once match is found, generate room-id
  } else {
    //no match for u very sad
    console.log("no match found");
  }

  //somwhere here need to fetch room-id from the DB and send user there
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
