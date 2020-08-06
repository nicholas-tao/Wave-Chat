export default {
  generateRandomString() {
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);

    return crypto.getRandomValues(array);
  },

  closeVideo(elemId) {
    if (document.getElementById(elemId)) {
      document.getElementById(elemId).remove();
      this.adjustVideoElemSize();
    }
  },

  pageHasFocus() {
    return !(
      document.hidden ||
      document.onfocusout ||
      window.onpagehide ||
      window.onblur
    );
  },

  getQString(url = "", keyToReturn = "") {
    url = url ? url : location.href;
    let queryStrings = decodeURIComponent(url)
      .split("#", 2)[0]
      .split("?", 2)[1];

    if (queryStrings) {
      let splittedQStrings = queryStrings.split("&");

      if (splittedQStrings.length) {
        let queryStringObj = {};

        splittedQStrings.forEach(function (keyValuePair) {
          let keyValue = keyValuePair.split("=", 2);

          if (keyValue.length) {
            queryStringObj[keyValue[0]] = keyValue[1];
          }
        });

        return keyToReturn
          ? queryStringObj[keyToReturn]
            ? queryStringObj[keyToReturn]
            : null
          : queryStringObj;
      }

      return null;
    }

    return null;
  },

  userMediaAvailable() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
  },

  getUserFullMedia() {
    if (this.userMediaAvailable()) {
      return navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            minWidth: "1280",
            minHeight: "720",
          },
        },

        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } else {
      throw new Error("User media not available");
    }
  },

  getUserAudio() {
    if (this.userMediaAvailable()) {
      return navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } else {
      throw new Error("User media not available");
    }
  },

  getIceServer() {
    return {
      iceServers: [
        {
          urls: [
            "turn:173.194.72.127:19305?transport=udp",
            "turn:[2404:6800:4008:C01::7F]:19305?transport=udp",
            "turn:173.194.72.127:443?transport=tcp",
            "turn:[2404:6800:4008:C01::7F]:443?transport=tcp",
          ],
          username: "CKjCuLwFEgahxNRjuTAYzc/s6OMT",
          credential: "u1SQDR/SQsPQIxXNWQT7czc/G4c=",
        },
        { urls: ["stun:stun.l.google.com:19302"] },
      ],
    };
  },

  addChat(data, senderType) {
    let chatMsgDiv = document.querySelector("#chat-messages");
    let contentAlign = "justify-content-end";
    let senderName = "You";
    let msgBg = "bgd-green";

    if (senderType === "remote") {
      contentAlign = "justify-content-start";
      senderName = data.sender;
      msgBg = "";

      this.toggleChatNotificationBadge();
    }

    let infoDiv = document.createElement("div");
    infoDiv.className = "sender-info";
    //infoDiv.innerHTML = `${senderName} - ${moment().format("h:mm a")}`; //time sent is just the time of day in am or pm
    infoDiv.innerHTML = `${moment().format("h:mm a")}`; //same as line above but don't include senderName

    let colDiv = document.createElement("div");
    colDiv.className = `col-7 card chat-card msg ${msgBg}`;
    colDiv.innerHTML = xssFilters
      .inHTMLData(data.msg)
      .autoLink({ target: "_blank", rel: "nofollow" });

    let rowDiv = document.createElement("div");
    rowDiv.className = `row ${contentAlign} mb-2`;

    colDiv.appendChild(infoDiv);
    rowDiv.appendChild(colDiv);

    chatMsgDiv.appendChild(rowDiv);

    if (this.pageHasFocus) {
      rowDiv.scrollIntoView();
    }
  },

  toggleChatNotificationBadge() {
    if (
      document.querySelector("#chat-pane").classList.contains("chat-opened")
    ) {
      document
        .querySelector("#new-chat-notification")
        .setAttribute("hidden", true);
    } else {
      document
        .querySelector("#new-chat-notification")
        .removeAttribute("hidden");
    }
  },

  replaceTrack(stream, recipientPeer) {
    let sender = recipientPeer.getSenders
      ? recipientPeer
          .getSenders()
          .find((s) => s.track && s.track.kind === stream.kind)
      : false;

    sender ? sender.replaceTrack(stream) : "";
  },

  toggleVideoBtnDisabled(disabled) {
    document.getElementById("toggle-video").disabled = disabled;
  },

  maximiseStream(e) {
    let elem = e.target.parentElement.previousElementSibling;

    elem.requestFullscreen() ||
      elem.mozRequestFullScreen() ||
      elem.webkitRequestFullscreen() ||
      elem.msRequestFullscreen();
  },

  singleStreamToggleMute(e) {
    if (e.target.classList.contains("fa-microphone")) {
      e.target.parentElement.previousElementSibling.muted = true;
      e.target.classList.add("fa-microphone-slash");
      e.target.classList.remove("fa-microphone");
    } else {
      e.target.parentElement.previousElementSibling.muted = false;
      e.target.classList.add("fa-microphone");
      e.target.classList.remove("fa-microphone-slash");
    }
  },

  toggleModal(id, show) {
    let el = document.getElementById(id);

    if (show) {
      el.style.display = "block";
      el.removeAttribute("aria-hidden");
    } else {
      el.style.display = "none";
      el.setAttribute("aria-hidden", true);
    }
  },

  setLocalStream(stream, mirrorMode = true) {
    const localVidElem = document.getElementById("local");

    localVidElem.srcObject = stream;
    mirrorMode
      ? localVidElem.classList.add("mirror-mode")
      : localVidElem.classList.remove("mirror-mode");
  },

  adjustVideoElemSize() {
    let elem = document.getElementsByClassName("card");
    //let totalRemoteVideosDesktop = elem.length;
    let newWidth = "40vw";
    /*
      totalRemoteVideosDesktop <= 2
        ? "50%"
        : totalRemoteVideosDesktop == 3
        ? "33.33%"
        : "25%";

    for (let i = 0; i < totalRemoteVideosDesktop; i++) {
      elem[i].style.width = "50%";
    }
    */
    elem[i].style.width = newWidth;
  },

  createDemoRemotes(str, total = 6) {
    let i = 0;

    let testInterval = setInterval(() => {
      let newVid = document.createElement("video");
      newVid.id = `demo-${i}-video`;
      newVid.srcObject = str;
      newVid.autoplay = true;
      newVid.className = "remote-video";
      /*
      //video controls elements
      let controlDiv = document.createElement("div");
      controlDiv.className = "remote-video-controls";
      controlDiv.innerHTML = `<i class="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
                  <i class="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;
*/
      //create a new div for card
      let cardDiv = document.createElement("div");
      cardDiv.className = "card card-sm";
      cardDiv.id = `demo-${i}`;
      cardDiv.appendChild(newVid);
      cardDiv.appendChild(controlDiv);

      //put div in main-section elem
      document.getElementById("videos").appendChild(cardDiv);

      this.adjustVideoElemSize();

      i++;

      if (i == total) {
        clearInterval(testInterval);
      }
    }, 2000);
  },
};
