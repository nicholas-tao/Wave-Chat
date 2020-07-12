const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();
const Queue = require("./models/Queue");
const { update } = require("./models/Queue");

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
    cookie: { maxAge: 300000 }
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

//var matchedUser;

//////////////////////////////////////////////////////////

//Matching Algorithm
async function match() {

  //get num of docs in the queue
  let docNum = await Queue.countDocuments({})

  console.log("queue length: " + docNum)

  while(true){

    //update number of docs in queue
    const updateNum = await Queue.countDocuments({})

    //if the updated num of docs is different than original
    if(updateNum != docNum){

      console.log("entered if statement")

      //initialize found match to false
      let foundMatch = false

      //get the most recent document in queue as the user
      var user = await Queue.find({}).sort({_id : -1}).limit(1)

      //declare matched user
      var matchedUser

      //loop over user's interests to check if there are matches
      for(const interestItem of user[0].interests){

        console.log("interest item: " + interestItem)

        //find all of the user's in the queue who have a common interest
        queueUsers = await Queue.find({ interests : interestItem })

        //loop over the other users in queue with the shared interest
        for(const queueUser of queueUsers){

          console.log("queue user email: " + queueUser.email)
          console.log("user email: " + user[0].email)

          //get emails of user and matcehd user
          var matchEmail = queueUser.email
          var userEmail = user[0].email

          //check if emails are different so user doesn't match with themselves
          if(matchEmail.localeCompare(userEmail) != 0){
            matchedUser = queueUser
            console.log("user: " + user[0].email)
            console.log("match found: " + matchedUser.email)

            //set found match to true and break out of the loop
            foundMatch = true
            break;
          }

        }

        //if the user found a match, generate room id and update the user and their match
        if(foundMatch == true){
          console.log("found match is true")

          //find the intersection of ALL of the two users interests
          const commonInterests = intersect(matchedUser.interests, user[0].interests)

          //update the users document
          await Queue.findOneAndUpdate(
            { email: user[0].email },
            { $set: { interests: commonInterests } },
            { new: true },
            (err, result) => {
              console.log("finished updating matched user's document");
            }
          );
    
          //update the matches document
          await Queue.findOneAndUpdate(
            { email: matchedUser.email },
            { $set: { interests: commonInterests } },
            { new: true },
            (err, result) => {
              console.log("finished updating matched matched user's document");
            }
          );
    
          //create the room id
          const roomID = generateRoomID(16)
          
          console.log("room id: " + roomID)
    
          //update the matched users document with room id
          await Queue.findOneAndUpdate({email : matchedUser.email}, {roomId : roomID})
    
          //update the users document with room id
          await Queue.findOneAndUpdate({email : user[0].email}, {roomId : roomID})
    
          console.log('match found')

          //break out of interest loop since match already found
          break
        }
      }

    }

    docNum = await Queue.countDocuments({})

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
