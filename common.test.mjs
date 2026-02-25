import assert from "node:assert";
import { describe, it } from "node:test";
import { mostListenedToSong } from "./common.mjs";

// Test for the most listened to song function
describe("mostListenedToSong", () => {
  it("should return the correct most listened to song for user 1", () => {
    const data = mostListenedToSong(1);
    assert.equal(
      data.songByCount,
      "The Swell Season - When Your Mind's Made Up",
    );
    assert.equal(data.songByTime, "Faithless - Insomnia");
  });

  it("should return only one genre for user 2", () => {
    const data = mostListenedToSong(2);
    assert.equal(data.genres.length, 1);
  });
});
