import { getListenEvents, getSong, getUserIDs } from "./data.mjs";

export const mostListenedtoSong = (userID) => {
  const countObj = {};
  getListenEvents(userID).forEach((song) => {
    if (song.song_id in countObj) {
      countObj[song.song_id] += 1;
    } else {
      countObj[song.song_id] = 1;
    }
  });
  const countArr = [];
  for (const song in countObj) {
    countArr.push([song, countObj[song]]);
  }
  const sortedCount = countArr.sort((a, b) => {
    return b[1] - a[1];
  });
  return getSong(countArr[0][0]);
};
