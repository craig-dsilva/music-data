import { getListenEvents, getSong } from "./data.mjs";
import { objectToArray, sortArrayinDescendingOrder } from "./utils.mjs";

// Returns the users most listened to song
export const mostListenedToSong = (userID) => {
  // Object to track song count
  const countObj = {};
  //   Populate countObj
  getListenEvents(userID).forEach((song) => {
    if (song.song_id in countObj) {
      countObj[song.song_id] += 1;
    } else {
      countObj[song.song_id] = 1;
    }
  });
  //   Convert countObj to array
  const countArr = objectToArray(countObj);
  //   Sort song and count in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  //   Return the first element from sortedCount
  return getSong(sortedCount[0][0]);
};

// Returns the users most listened to artist
export const mostListenedToArtist = (userID) => {
  // Track artists listen count
  const artistsCount = {};
  getListenEvents(userID).forEach((song) => {
    const artist = getSong(song.song_id).artist;
    if (artist in artistsCount) {
      artistsCount[artist] += 1;
    } else {
      artistsCount[artist] = 1;
    }
  });
  //   Convert artistCount object to array
  const countArr = objectToArray(artistsCount);
  //   Sort song and count in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  //   Return the first element from sortedCount
  return sortedCount[0][0];
};
