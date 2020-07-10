const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
const Queue = require("./models/Queue");
const { update } = require("./models/Queue");
require("./config/passport")(passport);

mongoose.set("useFindAndModify", false);

// connecting to db
const db = require("./config/keys").MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
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
  next();
});
//////////////////////////////////////////////////////////

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

match();

//////////////////////////////////////////////////////////

//Matching Algorithm
async function match() {
  let docNum = await Queue.countDocuments({}); //when first executed, get number of documents in queue (irl would probably be 0, right now is 3)
  console.log("queue length: " + docNum);
  while (true) {
    const updateNum = await Queue.countDocuments({});
    if (updateNum != docNum) {
      //see if someone has added themselves to the queue basically
      //execute algorithm --> we just compare anyone with everyone now instead of new user in queue with exisiting users right?
      let foundMatch = false;

      //find the most recent user in queue
      var user = await Queue.find({}).sort({ _id: -1 }).limit(1);

      var matchedUser;

      //console logging to see if everything is working
      console.log("user: " + user[0]);
      console.log("email: " + user[0].email);
      console.log("interests: " + user[0].interests);

      //loop over the users interests
      for (const interestItem of user[0].interests) {
        //log the interest item currently being checked
        console.log("Interest Item: " + interestItem);

        //search the queue for another document containing the current interest item. Limited to 1 document return
        matchedUser = await Queue.find({
          interests: { $all: [interestItem] },
        }).limit(1);

        //NOTE
        //Queue.find typically returns a cursor object which is then iterated over to see each document
        //which was returned. I tried out this a little bit and played with the .limit but couldn't seem
        //to get it to work. Recommend running in debug mode node.js preview so you can see exactly whats
        //going on with the variables

        console.log("matchedUser[0]: " + matchedUser[0]);

        console.log("matched user email: " + matchedUser[0].email);

        if (matchedUser[0] != undefined) {
          console.log("match found");
          console.log(
            "Common Interests: " +
              intersect(matchedUser[0].interests, user[0].interests)
          );

          //store each user's interests in a variable so we can use it to call intersect()
          let matchedOGInterests = matchedUser[0].interests;
          let userOGInterests = user[0].interests;

          //set user and matched user's interests to their common interests which will be sent to chat page
          user[0].interests = intersect(matchedOGInterests, userOGInterests);
          matchedUser[0].interests = user[0].interests;

          //store user[0].interests and matchedUser[0].interests to their document in the Queue collection
          await Queue.findOneAndUpdate(
            { email: matchEmail },
            { interests: matchedUser[0].interests }
          );

          await Queue.findOneAndUpdate(
            { email: user[0].email },
            { interests: [user[0].interests] }
          );

          foundMatch = true;
          break;
        }
      }

      if (foundMatch) {
        const roomID = generateRoomID(16);

        console.log("roomID: " + roomID);

        var matchEmail = matchedUser[0].email;

        await Queue.findOneAndUpdate({ email: matchEmail }, { roomId: roomID });

        await Queue.findOneAndUpdate(
          { email: user[0].email },
          { roomId: roomID }
        );
        console.log("match found!");
        //update roomID for matched pair
      }
      docNum = await Queue.countDocuments({}); //with proper document-count tracking in an algorithm this step can be obviated
    }
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
