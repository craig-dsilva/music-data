import {
  everyDaySong,
  fridayNightSong,
  longestStreak,
  mostListenedToArtist,
  mostListenedToSong,
} from "./common.mjs";
import { getListenEvents, getUserIDs } from "./data.mjs";

const userDropdown = document.querySelector("#user");
const userDataEl = document.querySelector("#user-data");

const populateUserDropdown = () => {
  getUserIDs().forEach((user) => {
    const userOptionEl = document.createElement("option");
    userOptionEl.value = user;
    userOptionEl.innerText = user;
    userDropdown.appendChild(userOptionEl);
  });
};

const renderData = () => {
  const userID = userDropdown.value;
  userDataEl.innerHTML = "";
  const userIDEl = document.createElement("h2");
  userIDEl.innerText = `User ${userID}`;
  userDataEl.appendChild(userIDEl);

  // If user has no data
  if (getListenEvents(userID).length === 0) {
    const noDataEl = document.createElement("p");
    noDataEl.innerText = `User ${userID} didn't listen to any songs`;
    userDataEl.appendChild(noDataEl);
    return;
  }

  // User's most listened to song
  if (mostListenedToSong(userID)) {
    const mostListenedToSongEl = document.createElement("div");
    const songByCountQ = document.createElement("b");
    const songByCountA = document.createElement("p");
    const songByTimeQ = document.createElement("b");
    const songByTimeA = document.createElement("p");
    songByCountQ.innerText = "Most listened to song by count";
    songByCountA.innerText = mostListenedToSong(userID).songByCount;
    songByTimeQ.innerText = "Most listened to song by time";
    songByTimeA.innerText = mostListenedToSong(userID).songByTime;
    mostListenedToSongEl.appendChild(songByCountQ);
    mostListenedToSongEl.appendChild(songByCountA);
    mostListenedToSongEl.appendChild(songByTimeQ);
    mostListenedToSongEl.appendChild(songByTimeA);
    userDataEl.appendChild(mostListenedToSongEl);
  }
};

userDropdown.addEventListener("change", () => renderData());

window.onload = () => {
  populateUserDropdown();
  renderData();
};
