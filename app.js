var sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
const Queue = require("./models/Queue");
const Room = require("./models/Room");
const { update } = require("./models/Queue");
const QueueModule = require("./QueueModule");
const roomModule = require("./roomModule");

app.use(sslRedirect());

//If you ever want to delete all the rooms or users:
//Room.deleteMany({}, function (err) {});

require("dotenv").config();
require("./config/passport")(passport);

mongoose.set("useFindAndModify", false);

// connecting to db
const MongoURI = process.env.MONGO_URI;
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// allows us to use ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// allows us to parse data with req.body. ...
app.use(express.urlencoded({ extended: false }));

app.use(express.static("dashboard-styling"));

//////////////////////////////////////////////////////////
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },

  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.contentCode = req.flash("contentCode");
  // res.locals.pass_errors = req.flash("pass_errors")
  res.locals.pass_success = req.flash("pass_success")
  next();
});
//////////////////////////////////////////////////////////

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

matchFunction = function (newUser) {
  if (this.uList.length > 1) {
    const matchedUser = this.uList[0];
    this.uList.splice(0, 1); //simultaneously remove matchedUser from the array and store matchedUser in matchedUser.
    const i = this.uList.indexOf(newUser);
    this.uList.splice(i, 1);
    /*
    //intersect interest arrays
    const commonInterests = intersect(
    newUser.interests,
    matchedUser.interests
    );
  */

    //generate roomid and room
    const roomID = generateRoomID(16);
    const newRoom = new Room({
      name1: newUser.name,
      name2: matchedUser.name,
      email1: newUser.email,
      email2: matchedUser.email,
      program1: newUser.program,
      program2: matchedUser.program,
      interests1: newUser.interests,
      interests2: matchedUser.interests,
      //commonInterests: commonInterests,
      roomId: roomID,
    });
    const roomDoc = new roomModule.roomDoc(newRoom);

    //append newRoom to room collection
    newRoom.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

QueueModule.registerOnAdd(matchFunction);

//////////////////////////////////////////////////////////

//Matching Algorithm (simple)

//Matching Algorithm (the sophisticated one)
async function match() {
  //get num of docs in the queue
  let docNum = await Queue.countDocuments({});

  console.log("queue length: " + docNum);

  while (true) {
    //update number of docs in queue
    const updateNum = await Queue.countDocuments({});

    //if the updated num of docs is different than original
    if (updateNum != docNum) {
      console.log("entered if statement");

      //initialize found match to false
      let foundMatch = false;

      //get the most recent document in queue as the user
      var user = await Queue.find({}).sort({ _id: -1 }).limit(1);

      //declare matched user
      var matchedUser;

      //loop over user's interests to check if there are matches
      for (const interestItem of user[0].interests) {
        console.log("interest item: " + interestItem);

        //find all of the user's in the queue who have a common interest
        queueUsers = await Queue.find({ interests: interestItem });

        //loop over the other users in queue with the shared interest
        for (const queueUser of queueUsers) {
          console.log("queue user email: " + queueUser.email);
          console.log("user email: " + user[0].email);

          //get emails of user and matcehd user
          var matchEmail = queueUser.email;
          var userEmail = user[0].email;

          //check if emails are different so user doesn't match with themselves
          if (matchEmail.localeCompare(userEmail) != 0) {
            matchedUser = queueUser;
            console.log("user: " + user[0].email);
            console.log("match found: " + matchedUser.email);

            //set found match to true and break out of the loop
            foundMatch = true;
            break;
          }
        }

        //if the user found a match, generate room id and update the user and their match
        if (foundMatch == true) {
          console.log("found match is true");

          //once match found, remove user from queue
          await Queue.findOneAndDelete({ email: user[0].email }, function (
            err
          ) {
            if (err) console.log(err);
            console.log("Deleted user from Queue");
          });

          //once match found, remove matched user from queue
          await Queue.findOneAndDelete({ email: matchedUser.email }, function (
            err
          ) {
            if (err) console.log(err);
            console.log("Deleted matched user from Queue");
          });

          //find the intersection of ALL of the two users interests
          const commonInterests = intersect(
            matchedUser.interests,
            user[0].interests
          );

          //create the room id
          const roomID = generateRoomID(16);

          console.log("room id: " + roomID);

          //store user and matched user's info to Room collection
          var newRoom = new Room({
            name1: user[0].name,
            name2: matchedUser.name,
            email1: user[0].email,
            email2: matchedUser.email,
            program1: user[0].program,
            program2: matchedUser.program,
            commonInterests: commonInterests,
            roomId: roomID,
          });

          //wait for room to save
          await newRoom.save((err) => {
            if (err) return handleError(err);
          });

          console.log("match found");

          //break out of interest loop since match already found
          break;
        }
      }

      //if not match is found based on interests, try to match by program
      if (!foundMatch) {
        console.log("trying to match based on program");

        //get all users from the queue
        var queueUsers = await Queue.find({});

        console.log("queueUsers: " + queueUsers);

        //loop over all users in queue
        for (const queueUser of queueUsers) {
          console.log("");
          console.log("");
          console.log("");
          console.log("");
          console.log("");

          console.log("queue user's program: " + queueUser.program);
          console.log("user's program: " + user[0].program);

          //if the current user's program is the same as the current queue user
          if (user[0].program.localeCompare(queueUser.program) == 0) {
            console.log("passed first if statement");

            console.log("queue user's email: " + queueUser.email);
            console.log("user's email: " + user[0].email);

            //if the current user's email is different than the current queue user
            //(don't ask why these if statements are separate LOL they didn't work when i put them together i probably missed something)
            if (user[0].email.localeCompare(queueUser.email) != 0) {
              //set matched user to the current queue user
              matchedUser = queueUser;

              console.log("passed second if statement");

              //generate the room id for the pair
              const roomID = generateRoomID(16);

              console.log("room id: " + roomID);

              // await Queue.findOneAndUpdate( {email : user[0].email}, {roomId : roomID})

              //remove the user from the queue
              await Queue.findOneAndDelete({ email: user[0].email }, function (
                err
              ) {
                if (err) console.log(err);
                console.log("Deleted matched user from Queue");
              });

              // await Queue.findOneAndUpdate( {email : queueUser.email}, {roomId : roomID})

              //remove the match from the queue
              await Queue.findOneAndDelete(
                { email: queueUser.email },
                function (err) {
                  if (err) console.log(err);
                  console.log("Deleted matched user from Queue");
                }
              );

              //create a new room, common interests set to none
              var newRoom = new Room({
                name1: user[0].name,
                name2: matchedUser.name,
                email1: user[0].email,
                email2: matchedUser.email,
                program1: user[0].program,
                program2: matchedUser.program,
                commonInterests: ["None"],
                roomId: roomID,
              });

              //wait for new room to save
              await newRoom.save((err) => {
                if (err) return handleError(err);
              });

              console.log("match found, queue documents have been updated ");

              console.log("");
              console.log("");
              console.log("");
              console.log("");
              console.log("");

              //break out of the loop which goes over the queue users
              break;
            }
          }
        }
      }
    }

    docNum = await Queue.countDocuments({});
  }
}

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

function intersect(a, b) {
  return a.filter(Set.prototype.has, new Set(b));
}
