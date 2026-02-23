import { getListenEvents, getSong } from "./data.mjs";

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
  const countArr = [];
  for (const song in countObj) {
    countArr.push([song, countObj[song]]);
  }
  //   Sort song and count in descending order
  const sortedCount = countArr.sort((a, b) => {
    return b[1] - a[1];
  });
  //   Return the first element from sortedCount
  return getSong(sortedCount[0][0]);
};
