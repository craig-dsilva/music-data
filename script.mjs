// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs, getListenEvents } from "./data.mjs";

const users = getUserIDs();
const selectUserEl = document.querySelector("#select-user");

users.forEach((user) => {
  const userOption = document.createElement("option");
  userOption.innerText = user;
  selectUserEl.appendChild(userOption);
});

selectUserEl.addEventListener("change", (e) => {
  getListenEvents(e.target.value);
});

window.onload = () => {};
