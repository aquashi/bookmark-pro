var bookmarkArray = [];

function intialiseArray() {
    if (window.localStorage.storedBookmarks != undefined) {
        bookmarkArray = JSON.parse(localStorage.storedBookmarks);
        populateList();
    }
}

function updateLocalStorage() {
    window.localStorage.storedBookmarks = JSON.stringify(bookmarkArray);
}

function populateList(callback) {
    var bookmarkHeading = '<h3>Protected Bookmarks</h3>';
    var bookmarkList = '';

    if (bookmarkArray.length == 0) {
        bookmarkList = '<p><i>No bookmarks</i></p>';
    } else {
        var bookmarkListArray = bookmarkArray.map(function (bookmark, bookmarkIndex) {
            return '<div id="bookmarkSection' + bookmarkIndex + '"> <div class="title" id="bookmarkTitle'
                + bookmarkIndex + '">' + bookmark.name + '<br /></div><small><a class="link" id="bookmarkLink'
                + bookmarkIndex + '">' + bookmark.url + '</a><br /><a class="edit" id="edit'
                + bookmarkIndex + '">edit&nbsp;|</a><a class="delete" id="delete'
                + bookmarkIndex + '">&nbsp;delete</a></small></div>';
        });
        bookmarkList += bookmarkListArray.join('');
    }
    document.querySelector('#bookmarkHeader').innerHTML = bookmarkHeading;
    document.querySelector('#bookmarkList').innerHTML = bookmarkList;
    if (typeof callback === "function") {
        callback();
    }
}

function checkPassword() {
    var cp = document.querySelector('#password').value;
    if (cp == window.localStorage.storedPassword) {
        return true;
    } else {
        return false;
    }
}

function incorrectPassword() {
    var notice = '<p style="color: red">Incorrect Password. '
        + 'Try again or Reset password in Options</p>';
    document.querySelector('#bookmarkNote').innerHTML = notice;
}

function correctPassword() {
    var notice = '<p style="color: green">Logged In</p>';
    document.querySelector('#bookmarkNote').innerHTML = notice;
}

function unlock() {
    var validate = checkPassword();
    if (window.localStorage.storedPassword == null | undefined) {
        openOptions();
    }
    else if (validate) {
        correctPassword();
        displayAddBox();
        intialiseArray();
    } else {
        incorrectPassword();
    };
}

function displayAddBox() {
    var addMarkup = '<form id="addForm"> <fieldset> <legend>Add New Bookmark:</legend>'
        + ' Name:<br /><input type="text" name="title" id="bookmarkNameInput" value="" /><br />'
        + ' URL:<br /><input type="text" name="url" id="bookmarkUrlInput" value="" /><br /> '
        + '<small>Use URL with HTTP/S prefix (eg. "https://google.com" OR "http://google.com")<br /> '
        + 'Any URL (eg. "google.com") without HTTP/S prefix will NOT work<br></small><br /> '
        + '<a id="addBookmark">Add</a></fieldset></form>';
    document.querySelector('#addBox').innerHTML = addMarkup;
    getCurrentPage();
}

function getCurrentPage() {
    try {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var tab = tabs[0];
            document.querySelector('#bookmarkNameInput').value = tab.title;
            document.querySelector('#bookmarkUrlInput').value = tab.url;
        });
    } catch (error) {
        // console.log(error);
    }
}

function openOptions() {
    chrome.runtime.openOptionsPage(function () {
        // console.log('Options page opened, password must be (re)set');
    });
};

function openURLincognito(url) {
    chrome.windows.create({ "url": url, "incognito": true });
}

function deleteAllBookmarks() {
    bookmarkArray.length = 0;
    updateLocalStorage();
}

function bookmarkAdded() {
    var notice = '<p style="color: green">Added!</p>';
    document.querySelector('#bookmarkNote').innerHTML = notice;
    updateLocalStorage();
}

function bookmarkRemoved() {
    var notice = '<p style="color: green">Removed!</p>';
    document.querySelector('#bookmarkNote').innerHTML = notice;
    updateLocalStorage();
}

function removeBookmark(index) {
    bookmarkArray.splice(index, 1);
    populateList(bookmarkRemoved);
}

function createBookmark() {
    var bookmark = new Object();
    bookmark.name = checkTitle(document.querySelector('#bookmarkNameInput').value);
    bookmark.url = document.querySelector('#bookmarkUrlInput').value;
    bookmarkArray.push(bookmark);
    populateList(bookmarkAdded);
}

function checkTitle(title) {
    var text = '';
    text += title;
    if (text.trim() == '') {
        return 'Untitled Bookmark';
    } else {
        return title;
    }
}

function checkURL(url) {
    var text = '';
    text += url;
    if (text.trim() == '') {
        return 'No URL';
    } else {
        return url;
    }
}

function editBookmark(index) {
    populateList();
    var bookmark = bookmarkArray[index];
    var section = '#bookmarkSection' + index;
    var editMarkup = '<div id="bookmarkEdit' + index
        + '"><form><fieldset><legend>Edit</legend><label>Title:</label><br /> '
        + '<input type="text" name="title" id="title' + index + '" value="'
        + bookmark.name + '"><br />'
        + '<label>URL:</label><br /><input type="text" name="url" id="url'
        + index + '" value="' + bookmark.url + '"><br />' 
        + '<small>Use URL with HTTP/S prefix (eg. "https://google.com" OR "http://google.com")<br /> '
        + 'Any URL (eg. "google.com") without HTTP/S prefix will NOT work<br></small>'
        + '<a class="cancel" id="cancel' + index + '">cancel&nbsp;|</a><a id="modify'
        + index + '">&nbsp;modify</div>';
    document.querySelector(section).innerHTML = editMarkup;

}

function modifyBookmarkArray(index) {
    var inputTitle = '#title' + index;
    var inputURL = '#url' + index;
    bookmarkArray[index].name = checkTitle(document.querySelector(inputTitle).value);
    bookmarkArray[index].url = checkURL(document.querySelector(inputURL).value);
    populateList(updateLocalStorage);
}

function getTagID(evt) {
    var eventTarget = evt.target || evt.srcElement;
    var idString = '';
    idString = eventTarget.id;
    var tagID = idString.split(/(\d+)/);
    clickHandler(tagID);
}

function clickHandler(tagID) {
    var txt = tagID[0];
    var num = parseInt(tagID[1], 10);
    try {
        var url = bookmarkArray[num].url;
    } catch (error) {
        // console.log(error);
    }
    switch (txt) {
        case 'bookmarkLink':
            openURLincognito(url);
            break;
        case 'edit':
            editBookmark(num);
            break;
        case 'delete':
            removeBookmark(num);
            break;
        case 'cancel':
            populateList();
            break;
        case 'modify':
            modifyBookmarkArray(num);
            break;
        case 'submit':
            unlock();
            break;
        case 'addBookmark':
            createBookmark();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', getTagID);
});