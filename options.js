var bookmarkArray = [];

function intialiseArray() {
  if (localStorage.storedBookmarks != undefined) {
    bookmarkArray = JSON.parse(localStorage.storedBookmarks);
  }
}

function updateLocalStorage() {
  window.localStorage.storedBookmarks = JSON.stringify(bookmarkArray);
}

function deleteAllBookmarks() {
  bookmarkArray.length = 0;
  updateLocalStorage();
}

function checkMatch() {
  var p0 = document.querySelector('#newPassword').value;
  var p1 = document.querySelector('#confirmPassword').value;
  if (p0 == p1) {
    return true;
  }
  else {
    return false;
  }
}

function checkPassword() {
  var cp = document.querySelector('#currentPassword').value;
  if (cp == window.localStorage.storedPassword) {
    return true;
  } else {
    return false;
  }
}

function setPassword() {
  var newPassword = document.querySelector('#newPassword').value;
  window.localStorage.storedPassword = newPassword;
}

function displayMatchError() {
  document.querySelector('#messageText').innerHTML = '<p style="color:red;"><small>Check you\'ve entered matching new passwords</small></p>';
}


function displayPasswordError() {
  document.querySelector('#messageText').innerHTML = '<p style="color:red;"><small>Success!Check you\'ve entered current password correctly</small></p>';
}

function resetErrors() {
  document.querySelector('#messageText').innerHTML = "";
}

function success() {
  document.querySelector('#messageText').innerHTML = '<p style="color:green;"><small>Success!</small></p>';
}

function changeClicked() {
  if (checkPassword) {
    if (checkMatch) {
      resetErrors();
      setPassword();
      success();
    } else {
      displayMatchError();
    }
  } else {
    displayPasswordError();
  }
}

function resetClicked() {
  if (checkMatch) {
    resetErrors();
    setPassword();
    deleteAllBookmarks();
    success();
  } else {
    displayMatchError();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  intialiseArray();
  document.querySelector('#changeButton').addEventListener('click', changeClicked);
  document.querySelector('#resetButton').addEventListener('click', resetClicked);
});
