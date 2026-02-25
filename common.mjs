import { getListenEvents, getSong } from "./data.mjs";
import { objectToArray, sortArrayinDescendingOrder } from "./utils.mjs";

// Returns the users most listened to song and genre
export const mostListenedToSong = (userID) => {
  if (getListenEvents(userID).length === 0) return null;
  // Object to track song count
  const countObj = {};
  // Object to track song by time
  const timeObj = {};
  //   Populate countObj
  getListenEvents(userID).forEach((song) => {
    if (song.song_id in countObj) {
      countObj[song.song_id] += 1;
    } else {
      countObj[song.song_id] = 1;
    }
    const songWithDuration = getSong(song.song_id).duration_seconds;
    if (song.song_id in timeObj) {
      timeObj[song.song_id] += songWithDuration;
    } else {
      timeObj[song.song_id] = songWithDuration;
    }
  });
  //   Convert countObj to array
  const countArr = objectToArray(countObj);
  //   Sort song and count in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  // Convert timeObj to array
  const timeArr = objectToArray(timeObj);
  // Sort song by time in descending order
  const sortedTime = timeArr.sort(sortArrayinDescendingOrder);
  // Tracks the song's genres
  const genre = [];
  sortedCount.forEach((song) => {
    // Add the genre if it doesn't exist
    if (!genre.includes(getSong(song[0]).genre))
      genre.push(getSong(song[0]).genre);
  });
  //   Get the first element from sortedCount and sortedTime
  const songByCount = getSong(sortedCount[0][0]);
  const songByTime = getSong(sortedTime[0][0]);
  //   Returns an object with the song (artist and title) by count and time and the top 3 genres of the user
  return {
    songByCount: `${songByCount.artist} - ${songByCount.title}`,
    songByTime: `${songByTime.artist} - ${songByTime.title}`,
    genres: [...genre.slice(0, 3)],
  };
};

// Returns the users most listened to artist
export const mostListenedToArtist = (userID) => {
  if (getListenEvents(userID).length === 0) return null;
  // Track artists listen count
  const artistsCount = {};
  // Track artists listen time
  const artistTime = {};
  getListenEvents(userID).forEach((song) => {
    const artist = getSong(song.song_id).artist;
    if (artist in artistsCount) {
      artistsCount[artist] += 1;
    } else {
      artistsCount[artist] = 1;
    }
    const songWithDuration = getSong(song.song_id).duration_seconds;
    if (artist in artistTime) {
      artistTime[artist] += songWithDuration;
    } else {
      artistTime[artist] = songWithDuration;
    }
  });
  //   Convert artistCount object to array
  const countArr = objectToArray(artistsCount);
  //   Convert artistTime object to array
  const timeArr = objectToArray(artistTime);
  //   Sort song and count in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  //   Sort song and time in descending order
  const sortedTime = timeArr.sort(sortArrayinDescendingOrder);
  //   Return the first element from sortedCount
  return { artistByCount: sortedCount[0][0], artistByTime: sortedTime[0][0] };
};

// Returns song most listened to on Friday night
// Also returns if the song is listened on Saturday morning before 4am
export const fridayNightSong = (userID) => {
  if (getListenEvents(userID).length === 0) return null;
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
  // Object to track song by time
  const timeObj = {};
  //   Merges the friday night and saturday morning (before 4am) songs
  const songs = [...fridayNightSongs, ...saturdayMorningSongs];
  songs.forEach((song) => {
    if (song.song_id in countObj) {
      countObj[song.song_id] += 1;
    } else {
      countObj[song.song_id] = 1;
    }
    const songWithDuration = getSong(song.song_id).duration_seconds;
    if (song.song_id in timeObj) {
      timeObj[song.song_id] += songWithDuration;
    } else {
      timeObj[song.song_id] = songWithDuration;
    }
  });
  //   Converts object to array
  const countArr = objectToArray(countObj);
  //   Sorts the array in descending order
  const sortedCount = countArr.sort(sortArrayinDescendingOrder);
  // Convert timeObj to array
  const timeArr = objectToArray(timeObj);
  // Sort song by time in descending order
  const sortedTime = timeArr.sort(sortArrayinDescendingOrder);
  //   Get the first element from sortedCount
  const song = sortedCount.length > 0 && getSong(sortedCount[0][0]);
  //   Get the first element from sortedCount and sortedTime
  const songByCount = sortedCount.length > 0 && getSong(sortedCount[0][0]);
  const songByTime = sortedTime.length > 0 && getSong(sortedTime[0][0]);
  //   Formats the string to return artist and song title if it exists by count and time
  return {
    songByCount: songByCount
      ? `${songByCount.artist} - ${songByCount.title}`
      : null,
    songByTime: songByTime
      ? `${songByTime.artist} - ${songByTime.title}`
      : null,
  };
};

// Returns the song with the longest continous streak
export const longestStreak = (userID) => {
  if (getListenEvents(userID).length === 0) return null;
  // Temporarily stores the song name
  let songName;
  // Tracks the song streak
  let streak;
  // Empty array to track the song name and it's streak
  const arr = [];
  getListenEvents(userID).forEach((song) => {
    // Increment streak if the song id is equal to songName
    if (song.song_id === songName) {
      streak++;
    } else {
      // Push the song name and the streak to arr if the songName is true
      songName && arr.push([songName, streak]);
      // Update songName variable with new song id
      songName = song.song_id;
      // Set the default steak to 1
      streak = 1;
    }
  });
  // Sort arr with the highest streak count
  const sorted = arr.sort((a, b) => b[1] - a[1]);
  // Get the details of the longest streak song
  const longestStreakSong = getSong(sorted[0][0]);
  // Get the longest streak count of that song
  const longestStreakCount = sorted[0][1];
  // Returns a formatted string
  return `${longestStreakSong.artist} - ${longestStreakSong.title} (Length: ${longestStreakCount})`;
};

// Returns the song which was played every day
export const everyDaySong = (userID) => {
  if (getListenEvents(userID).length === 0) return null;
  // Mock date to avoid error
  let date = "1970-01-01";
  // Track how many days the song was listened to
  const songDaysCountObj = {};
  getListenEvents(userID).forEach((song) => {
    // This ensures the song is counted once per day
    if (
      song.song_id in songDaysCountObj &&
      date !== song.timestamp.split("T")[0]
    ) {
      songDaysCountObj[song.song_id] += 1;
    } else if (date !== song.timestamp.split("T")[0]) {
      songDaysCountObj[song.song_id] = 1;
    }
    date = song.timestamp.split("T")[0];
  });
  // Convert songDaysCountObj to array
  const songDaysCountArr = objectToArray(songDaysCountObj);
  // Sort that array by the highest count in descending order
  const sortSongDaysCounter = songDaysCountArr.sort(sortArrayinDescendingOrder);
  // Get the first element of the sorted array
  const highestSong = sortSongDaysCounter[0];
  // Get the song details of the song with the highest count
  const song = getSong(highestSong[0]);
  // It will return the song if it's count is more than 5
  return highestSong[1] > 5 ? `${song.artist} - ${song.title}` : null;
};
