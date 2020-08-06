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
  macList: [],
  uwoList: [],
  dfList: [],

  ///////////////////ADD AND DEL FUNCTIONS////////////////////

  addUser: function (newUser) {

    switch(newUser.university) {
        case "waterloo":
            uList = this.uwList;
            break;
        case "uoftList":
            uList = this.uoftList;
            break;
        case "mcmaster":
            uList = this.macList;
            break;
        case "western":
            uList = this.uwoList;
            break;
        default: 
            uList = this.dfList;
    }

    if (!uList.includes(newUser)) {

      console.log("adding user!");
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

    switch(user.university) {
        case "waterloo":
            uList = this.uwList;
            break;
        case "uoftList":
            uList = this.uoftList;
            break;
        case "mcmaster":
            uList = this.macList;
            break;
        case "western":
            uList = this.uwoList;
            break;
        default: 
            uList = this.dfList;
    }

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
