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
  //   Get the first element from sortedCount
  const song = getSong(sortedCount[0][0]);
  //   Formats the string to return artist and song title
  return `${song.artist} - ${song.title}`;
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

// Returns song most listened to on Friday night
// Also returns if the song is listened on Saturday before 4am
export const fridayNightSong = (userID) => {
  const friday = 5;
  const saturday = 6;
  const fridayNightSongs = getListenEvents(userID).filter((song) => {
    const time = new Date(song.timestamp);
    return time.getDay() === friday && time.getHours() >= 17;
  });
  const saturdayMorningSongs = getListenEvents(userID).filter((song) => {
    const time = new Date(song.timestamp);
    return time.getDay() === saturday && time.getHours() < 4;
  });
  //   Tracks the most listened to song
  const countObj = {};
  //   Merges the friday night and saturday morning (before 4am) songs
  const songs = [...fridayNightSongs, ...saturdayMorningSongs];
  songs.forEach((song) => {
    if (song.song_id in countObj) {
      countObj[song.song_id] += 1;
    } else {
      countObj[song.song_id] = 1;
    }
  });
  //   Converts object to array
  const countArr = objectToArray(countObj);
  //   Sorts the array in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  //   Get the first element from sortedCount
  const song = getSong(sortedCount[0][0]);
  //   Formats the string to return artist and song title if it exists
  return sortedCount.length > 0
    ? `${song.artist} - ${song.title}`
    : "No songs found";
};
