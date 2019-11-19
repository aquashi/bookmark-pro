![Logo](icon_128.png)

# Protected Bookmarks
> A Google Chrome extension to password protect your bookmarks



## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Initial Setup](#initial-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About
![HTML](https://img.shields.io/badge/-html-red)
![CSS](https://img.shields.io/badge/-css-blueviolet)
![JavaScript](https://img.shields.io/badge/-javascript-yellow)
![GitHub issues](https://img.shields.io/github/issues/aquashi/bookmark-pro)
![GitHub repo size](https://img.shields.io/github/repo-size/aquashi/bookmark-pro)
[![GitHub](https://img.shields.io/github/license/aquashi/bookmark-pro)](LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/aquashi/bookmark-pro)

Protected Bookmarks is a Google Chrome extension that allows users who value privacy to create a list of password protected bookmarks. The bookmarks are accessed in incognito windows by default. This extension was built using HTML, CSS, and JavaScript of the vanilla variety, i.e. without the use of external libraries, frameworks, or dependencies to allow for better extensibility.

---

## Getting Started
### Installation

1. Clone the repo

```sh
git clone https://github.com/aquashi/bookmark-pro.git
```
2. Open Google Chrome and go to the Extension Management Page 
    - Enter `chrome://extensions` into the URL bar
    - OR open the Chrome menu, go to **More Tools**, then click **Extensions**
3. Enable developer mode by clicking the toggle on the top-right of the page
4. Click **Load Unpacked** and select the extension directory

> **Note:** installation instructions 2-4 are also available at https://developer.chrome.com/extensions/getstarted

### Initial Setup

1. Go to Protected Bookmarks' Extension Management
    - On the Extension Management Page, click on the **Details** button under the Protected Bookmarks Extension
    - OR right-click the logo ![Lock](icon_16.png) and select **Manage extensions**
2. Make sure the on/off toggle is selected to ON
3. Make sure the **Allow in incognito** toggle is set to ON (optional)

> <img src="demo/demo-a.jpg" height="350" width="611" title="Allow in incognito mode">

4. Click on the logo ![Lock](icon_16.png) to open the extension. You should automatically be taken to the options page, if not, right-click the logo ![Lock](icon_16.png) and select **Options**
5. Enter a new password in the *New Password* and *Confirm Password* fields, then click **Reset** and you should see a success message

> <img src="demo/demo-b.jpg" height="350" width="611" title="(Re)set Password">
 
6. Close all extension management and options windows and you're ready to go!

---

## Usage

When you log in, you should see your protected bookmark list along with the option to add a new bookmark. This will obviously be empty upon first login.

> <img src="demo/demo-c.jpg" height="350" width="482" title="Post-login">


Editing bookmarks is very simple and just a matter of clicking the links below the relevant bookmark. You can then edit the URL and/or the title. Google Chrome doesn't allow extensions to open URLs without the the `http://` or `https://` prefix. Please make sure you use this approved URL format by including the prefix or you will encounter an error. ([See video](demo/demo-d.mp4))

The extension is pretty intuitive. For any further questions, feel free to [contact](#contact) me.

---

## Contributing

1. Fork the project
2. Create a feature branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -am 'Added new features'`
4. Push your changes: `git push origin feature-branch`
5. Create a pull request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Developer:** Aaron Quashie - aaronquashie@gmail.com

Repository Link: [https://github.com/aquashi/bookmark-pro](https://github.com/aquashi/bookmark-pro)
