var addedtoQueue = false;
var audio = new Audio(
  "https://freesound.org/data/previews/234/234524_4019029-lq.mp3"
);
function startBtnClicked() {
  on();

  $(".page-wrapper").removeClass("toggled");

  document.getElementsByClassName("loader")[0].style.display = "block";

  console.log("Start Chatting clicked");
  //send GET request serverside to put User into Queue

  fetch("/dashboard/start", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.added) {
        ping(); //this starts the pinging process to the server
      } else {
        alert(
          "You're already in queue. Technically, you shouldn't be seeing this alert so if you do please notify us. Leave this page and reopen it to try to match again."
        );
      }
    });

  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  document.getElementById("overlay").addEventListener("click", off);

  function off() {
    document.getElementById("overlay").style.display = "none";
    const rawResponse = fetch("/users/leaveQueue", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => response.json());
  }

  function ping() {
    const periodicPing = setInterval(async () => {
      await fetch("/dashboard/ping", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.roomLink) {
            clearInterval(periodicPing);
            audio.play();
            window.location.replace(
              "https://chat.wave.tech/?room=" + d.roomLink
            );
          }
        });
    }, 1000);
  }

  //I'm not sure if using async/await in that context is best practice ^.
}
