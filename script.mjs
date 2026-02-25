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

  // Users's most listened to artist
  if (mostListenedToArtist(userID)) {
    const mostListenedToArtistEl = document.createElement("div");
    const artistByCountQ = document.createElement("b");
    const artistByCountA = document.createElement("p");
    const artistByTimeQ = document.createElement("b");
    const artistByTimeA = document.createElement("p");
    artistByCountQ.innerText = "Most listened to artist by count";
    artistByCountA.innerText = mostListenedToArtist(userID).artistByCount;
    artistByTimeQ.innerText = "Most listened to artist by time";
    artistByTimeA.innerText = mostListenedToArtist(userID).artistByTime;
    mostListenedToArtistEl.appendChild(artistByCountQ);
    mostListenedToArtistEl.appendChild(artistByCountA);
    mostListenedToArtistEl.appendChild(artistByTimeQ);
    mostListenedToArtistEl.appendChild(artistByTimeA);
    userDataEl.appendChild(mostListenedToArtistEl);
  }
};

userDropdown.addEventListener("change", () => renderData());

window.onload = () => {
  populateUserDropdown();
  renderData();
};
