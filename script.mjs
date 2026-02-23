import { getUserIDs } from "./data.mjs";

const populateUserDropdown = () => {
  const userDropdown = document.querySelector("#user");
  getUserIDs().forEach((user) => {
    const userOptionEl = document.createElement("option");
    userOptionEl.value = user;
    userOptionEl.innerText = user;
    userDropdown.appendChild(userOptionEl);
  });
};

window.onload = () => {
  populateUserDropdown();
};
