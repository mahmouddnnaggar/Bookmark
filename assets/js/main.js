// ^ get all the elements
const siteNameInput = document.getElementById("siteNameInput");
const siteUrlInput = document.getElementById("siteUrlInput");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");
const bookmarksContainer = document.getElementById("bookmarksContainer");
const visitBtn = document.getElementById("visitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const layer = document.querySelector(".layer");
const hintCard = document.querySelector(".hint-card");
const hintCardCloseBtn = document.querySelector(".hint-card .icon-close");
const outerTable = document.querySelector(".outer-table");
const thead = document.getElementById("thead");
// ^ variables
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
// ^ regex
const siteNameRegex = /^[a-zA-Z0-9 ]{3,}$/;
const siteUrlRegex =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

// ^ functions
function hideOrDisplayThead() {
  if (bookmarks.length > 0) {
    thead.style.display = "table-header-group";
    outerTable.style.border = "1px solid #ccc";

  } else {
    thead.style.display = "none";
    outerTable.style.border = "none";
  }
}
function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("ok", "error");
  siteUrlInput.classList.remove("ok", "error");
  siteNameInput.nextElementSibling.style.display = "none";
  siteUrlInput.nextElementSibling.style.display = "none";
  siteNameInput.nextElementSibling.nextElementSibling.style.display = "none";
  siteUrlInput.nextElementSibling.nextElementSibling.style.display = "none";
}
function validateInputs() {
  validateInput(siteNameInput, siteNameRegex);
  validateInput(siteUrlInput, siteUrlRegex);
  if (validateInput(siteNameInput, siteNameRegex) && validateInput(siteUrlInput, siteUrlRegex)) {
    return true;
  } else {
    return false;
  }
}
function validateInput(input, regex) {
  if (regex.test(input.value)) {
    input.classList.add("ok");
    input.classList.remove("error");
    input.nextElementSibling.style.display = "block";
    input.nextElementSibling.nextElementSibling.style.display = "none";
    return true;
  } else {
    input.classList.add("error");
    input.classList.remove("ok");
    input.nextElementSibling.style.display = "none";
    input.nextElementSibling.nextElementSibling.style.display = "block";
    return false;
  }
}
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
  hideOrDisplayThead();
}
function hideOrDisplayDeleteAllBtn() {
  if (bookmarks.length >= 2) {
    deleteAllBtn.style.display = "block";
  } else {
    deleteAllBtn.style.display = "none";
  }
}
function deleteAllBookmarks() {
  bookmarks = [];
  localStorage.removeItem("bookmarks");
  bookmarksContainer.innerHTML = "";
  deleteAllBtn.style.display = "none";
  hideOrDisplayThead();
}
function displayBookmarks() {
  bookmarksContainer.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    displayBookmark(index);
  });
  hideOrDisplayDeleteAllBtn();
  hideOrDisplayThead();
}
function displayBookmark(index) {
  hideOrDisplayDeleteAllBtn();
  bookmarksContainer.innerHTML += `
  <tr>
    <td>${index + 1}</td>
    <td>${bookmarks[index].name}</td>
    <td>
      <a href="${bookmarks[index].url}" target="_blank">Visit</a>
    </td>
    <td>
      <button class="btn" id="deleteBookmarkBtn" type="button" onclick="deleteBookmark(${index})">
        Delete
      </button>
    </td>
  </tr>`;
  clearInputs();
}
function addBookmark() {
  if (validateInputs()) {
    bookmarks.push({
      name: siteNameInput.value,
      url: siteUrlInput.value,
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
    clearInputs();
  } else {
    hintCard.style.display = "block";
    layer.style.display = "block";
  }
}
displayBookmarks();
// ^ event listeners
addBookmarkBtn.addEventListener("click", addBookmark);
deleteAllBtn.addEventListener("click", deleteAllBookmarks);
siteNameInput.addEventListener("input", () => {
  validateInput(siteNameInput, siteNameRegex);
});
siteUrlInput.addEventListener("input", () => {
  validateInput(siteUrlInput, siteUrlRegex);
});
hintCardCloseBtn.addEventListener("click", () => {
  hintCard.style.display = "none";
  layer.style.display = "none";
});