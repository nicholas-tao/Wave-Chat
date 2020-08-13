var sslRedirect = require("heroku-ssl-redirect");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
var io = require("socket.io").listen(server);

let stream = require("./ws/stream");
let path = require("path");

let favicon = require("serve-favicon");
var bodyParser = require("body-parser");

const Queue = require("./models/Queue");
const Room = require("./models/Room");
const QueueModule = require("./QueueModule");
const roomDocList = require("./roomModule").roomDocList;

const prompt = require('prompt');
const { uwList, quList } = require("./QueueModule");
const { FORMERR } = require("dns");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(sslRedirect());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

var appDir = path.dirname(require.main.filename);

app.use(favicon(path.join(appDir, "favicon2.png")));
app.use("/assets", express.static(path.join(appDir, "assets"))); //telling it to use the other files in the repo

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
  res.locals.pass_success = req.flash("pass_success");
  next();
});
//////////////////////////////////////////////////////////

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.get("/chat", (req, res) => {
  res.sendFile("index2.html", { root: appDir });
});

io.of("/stream").on("connection", stream);

app.post("/get-info", urlencodedParser, async (req, res) => {
  //////////////////////GET ROOMID/////////////////////////////////////////////////
  console.log("Request :", req.headers.referer);
  const roomURL = req.headers.referer;
  const currRoomId = roomURL.substring(roomURL.indexOf("=") + 1);
  console.log("roomID: ", currRoomId);

  /////////////////////GET ROOM DOCUMENT///////////////////////////////////////////
  currRoomDocIndex = await roomDocList.findIndex(
    (room) => room.roomId == currRoomId
  );
  console.log(currRoomDocIndex);
  currRoomDoc = roomDocList[currRoomDocIndex];

  if (currRoomDoc) {
    //DELETE PROCEDURES
    roomDocList[currRoomDocIndex].count++;
    if (roomDocList[currRoomDocIndex].count >= 2) {
      await roomDocList.splice(currRoomDocIndex, 1);
    }
  } else {
    await Room.findOne({ roomId: currRoomId }, function (err, obj) {
      if (err) console.log(err);
      currRoomDoc = obj;
    });
  }

  res.status(200).json(currRoomDoc);
});

app.post("/delete-room", urlencodedParser, async (req, res) => {
  res.status(200);
});

prompt.start();

prompt.get(['test'], (err, result) => {
  if (err) { return onErr(err); }
  if(result.test == 'startTest') {
    console.log("starting matchmaking test.")
    matchTest();
    console.log("uwList: " + QueueModule.uwList);
    console.log("uoftList: " + QueueModule.uoftList);
    console.log("quList: " + QueueModule.quList);
    console.log("macList: " + QueueModule.macList);
    console.log("uwoList: " + QueueModule.uwoList);
    console.log("oList: " + QueueModule.oList);
  }
})
/*
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
*/

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

function intersect(a, b) {
  return a.filter(Set.prototype.has, new Set(b));
}

//Matchmaking Test Code

function matchTest() {
  //GENERATE RANDOM AMOUNT OF USERS
  uSet = [];
  uSetCardinality = getRandomInt(4, 10);
  console.log("Testing with " + uSetCardinality  + " random users.");

  //GENERATE RANDOM UNIVERSITIES AND USERS
  for(i = 0; i < uSetCardinality; i++) {
    uniNumber = getRandomInt(0, 6);
    uniDetails = getRandomUniversity(uniNumber);
    user = createTestUser(i, uniDetails);
    console.log(user);
  }

  console.log("After adding users, uSet length is: " + uSet.length);

  //ADD THESE USERS AT RANDOM POINTS WITHIN A CERTAIN TIME INTERVAL
  for(i = 0; i < uSetCardinality; i++) {
    tickTock = getRandomInt(40, 1000);
    setTimeout(userAddition, tickTock, uSet[i]);
  };
  //PERFORM SOME DATA LOGGING TO ENSURE THINGS ARE WORKING

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function createTestUser(userNum, [university, uniEmail]) {
  strUserNum = userNum.toString();
  user =  {
    name: "user" + strUserNum,
    email: "user" + strUserNum + "@" + uniEmail,
    password: "testPassword",
    interests: ['anything'],
    university: university,
    faculty: 'testFaculty',
    program: 'testProgram',
    gradYear: 2025,
    date: Date.now(),
    authenticated: true,
    code: 123456,
    status: 'online',
  }
  uSet.push(user);
  return user;
}

function getRandomUniversity(num) {
  switch(num) {
    case 0:
      return ["University of Waterloo", "uwaterloo.ca"];
    case 1:
      return ["University of Toronto", "utoronto.ca"];
    case 2:
      return ["Queen's University", "queensu.ca"];
    case 3:
      return ["McMaster University", "mcmaster.ca"];
    case 4:
      return ["Western University", "uwo.ca"];
    case 5: 
      return ["University of Ottawa", "uottawa.ca"];
    default:
      return ["University of Waterloo", "uwaterloo.ca"];
  }
}

function userAddition(user) {
  console.log("adding user " + user.name + " from " + user.university);
  QueueModule.addUser(user);
}
