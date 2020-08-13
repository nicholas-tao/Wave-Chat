const Room = require("./models/Room");
const roomDocList = require("./roomModule").roomDocList;

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



var Queue = (module.exports = {

  /////////////////////QUEUE LISTS/////////////////////////////

  uwList: [],
  uoftList: [],
  quList: [],
  macList: [],
  uwoList: [],
  oList: [],
  dfList: [],

  ///////////////////ADD AND DEL FUNCTIONS////////////////////

  getUniversityQueue: function (university) {
    switch(university) {
      case "University of Waterloo":
          //console.log("uList is Waterloo");
          return this.uwList;
      case "University of Toronto":
          //console.log("uList is Toronto");
          return this.uoftList;
      case "Queen's University":
          //console.log("uList is Queen's");
          return this.quList;
      case "McMaster University":
          //console.log("uList is McMaster");
          return this.macList;
      case "Western University":
          //console.log("uList is Western");
          return this.uwoList;
      case "University of Ottawa":
          //console.log("uList is Ottawa");
          return this.oList;
      default: 
          //console.log("uList is Waterloo");
          return this.uwList;
          
    }
  },
  
  addUser: function (newUser) {
    uList = this.getUniversityQueue(newUser.university);
    

    if (!uList.includes(newUser)) {
      uList.push(newUser);
      if (uList.length > 1) { //matching algorithm
        const matchedUser = uList[0];
        uList.splice(0, 1); 
        const i = uList.indexOf(newUser);
        uList.splice(i, 1);
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
        console.log("creating room for two users: " + newUser.name + " " + matchedUser.name);
        console.log("roomID is: " + roomID);
        roomDocList.push(newRoom)
        //append newRoom to room collection
        newRoom.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      return true;
    }
    else {
      return false;
    }
  },

  delUser: function (user) {
    uList = this.getUniversityQueue(user.university);
    let index = uList.findIndex((s) => s.email == user.email); //find user from uList
    if (index >= 0) {
      uList.splice(index, 1);
      return true;
    }
    else {
      return false;
    }
  },
});
