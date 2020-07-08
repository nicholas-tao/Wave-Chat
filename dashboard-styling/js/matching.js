function startBtnClicked() {
  /*1.get user info, add them to Queue and update to "active: true"
  2. compare ARRAY (program, interests) of user with 1st person in queue and see if any elements exist in both arrays --> if no match, compare with 2nd, etc.about
  3. once match is found, generate a random string (ie 5b7n2k7a8fb2)
  4. add string to BOTH users' db entries ("link: 5b7n2k7a8fb2" or "room-id: 5b7n2k7a8fb2")
  5. server waits for this to be completed and searches for the room-id (or we have a function that returns the link) that both users should be sent to
  6. server does like "window.location = omeggu.herokuapp.com/?room={room-id}"
  7. also need to send user info - name/matching interests - to the chat room as well
  */

  console.log("Start Chatting clicked");

  var email = document.getElementById("start-chatting").dataset.testValue;

  console.log("User's email: " + email);

  //connect to db, search for user with email

  let roomID = generateRoomID(16);
  console.log("Room ID: " + roomID);
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
