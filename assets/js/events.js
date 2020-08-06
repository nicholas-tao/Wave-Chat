import helpers from "./helpers.js";

window.addEventListener("load", () => {
  const currentURL = window.location.href;
  //console.log(window.location.href); //this works, prints in browser console
  //make request to /get-info which makes request to DB (room collection) here i think
  fetch("/get-info", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: currentURL }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(JSON.stringify(data)); //this is all the relevant data for the given room, printed in browser console
      document.getElementById("program1").innerHTML = data.program1;
      document.getElementById("program2").innerHTML = data.program2;

      document.getElementById("name1").innerHTML = data.name1;
      document.getElementById("name2").innerHTML = data.name2;

      let commonInterests = intersect(data.interests1, data.interests2);

      /*
      if (data.commonInterests[0])
        document.getElementById("interest1").innerHTML =
          data.commonInterests[0];
      if (data.commonInterests[1])
        document.getElementById("interest2").innerHTML =
          data.commonInterests[1];
      if (data.commonInterests[2])
        document.getElementById("interest3").innerHTML =
          data.commonInterests[2];
      if (data.commonInterests[3])
        document.getElementById("interest4").innerHTML =
          data.commonInterests[3];
      if (data.commonInterests[4])
        document.getElementById("interest5").innerHTML =
          data.commonInterests[4];
          */

      if (commonInterests[0])
        document.getElementById("interest1").innerHTML = commonInterests[0];
      if (commonInterests[1])
        document.getElementById("interest2").innerHTML = commonInterests[1];
      if (commonInterests[2])
        document.getElementById("interest3").innerHTML = commonInterests[2];
      if (commonInterests[3])
        document.getElementById("interest4").innerHTML = commonInterests[3];
      if (commonInterests[4])
        document.getElementById("interest5").innerHTML = commonInterests[4];
    });

  document.querySelector("#leave-chat").addEventListener("click", (e) => {
    const currentURL = window.location.href;

    fetch("/delete-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: currentURL }),
    });
  });

  //When the chat icon is clicked
  document.querySelector("#toggle-chat-pane").addEventListener("click", (e) => {
    let chatElem = document.querySelector("#chat-pane");
    let mainSecElem = document.querySelector("#main-section");

    if (chatElem.classList.contains("chat-opened")) {
      chatElem.setAttribute("hidden", true);
      mainSecElem.classList.remove("col-md-9");
      mainSecElem.classList.add("col-md-12");
      chatElem.classList.remove("chat-opened");
    } else {
      chatElem.attributes.removeNamedItem("hidden");
      mainSecElem.classList.remove("col-md-12");
      mainSecElem.classList.add("col-md-9");
      chatElem.classList.add("chat-opened");
    }

    //remove the 'New' badge on chat icon (if any) once chat is opened.
    setTimeout(() => {
      if (
        document.querySelector("#chat-pane").classList.contains("chat-opened")
      ) {
        helpers.toggleChatNotificationBadge();
      }
    }, 300);
  });

  function intersect(a, b) {
    return a.filter(Set.prototype.has, new Set(b));
  }

  /*
  //When the video frame is clicked. This will enable picture-in-picture
  document.getElementById("local").addEventListener("click", () => {
    if (!document.pictureInPictureElement) {
      document
        .getElementById("local")
        .requestPictureInPicture()
        .catch((error) => {
          // Video failed to enter Picture-in-Picture mode.
          console.error(error);
        });
    } else {
      document.exitPictureInPicture().catch((error) => {
        // Video failed to leave Picture-in-Picture mode.
        console.error(error);
      });
    }
  });
  */
  /*
  //When the 'Create room" is button is clicked
  document.getElementById("create-room").addEventListener("click", (e) => {
    e.preventDefault();
    //save the user's name in sessionStorage
    //.setItem("username", "myNameGoesHere");

    //create room link
    let roomName = "d4a-7g4-v2m1"; //change this

    let roomLink = `${location.origin}?room=${roomName}`;
    //show message with link to room
    //console.log("success");

    window.location.replace(`${roomLink}`);
  });
  */
  /*
  //When the 'Enter room' button is clicked.
  document.getElementById("enter-room").addEventListener("click", (e) => {
    e.preventDefault();

    let name = document.querySelector("#username").value;

    if (name) {
      //remove error message, if any
      document.querySelector("#err-msg-username").innerHTML = "";

      //save the user's name in sessionStorage
      sessionStorage.setItem("username", name);

      //reload room
      location.reload();
    } else {
      document.querySelector("#err-msg-username").innerHTML =
        "Please input your name";
    }
  });
  */

  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("expand-remote-video")) {
      helpers.maximiseStream(e);
    } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
      helpers.singleStreamToggleMute(e);
    }
  });
});
