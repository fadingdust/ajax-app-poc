# Have I Been Hacked?

Proof of Concept for a full API+App in node/vue. Uses [https://haveibeenpwned.com](https://haveibeenpwned.com) as the data source.

![App Screenshot](docs/beenHackedAppScreenshot.png?raw=true "beenHackedAppScreenshot")

Fully deployed demo available at [https://beenhacked.mwallace.info/](https://beenhacked.mwallace.info/)

### Front-end App Info

[App Readme](./app/README.md)

### Back-end API Info

[API Readme](./api/README.md)

### Architecture

![App Calls](docs/beenhackedApp-calls.png?raw=true "App API Calls")

Since the core data being queried is directly available via one API call, this may seen a tad over-developed.
The goal here was to show how each layer would converse. Thus, it's a "Proof of Concept" more than refactored-for-speed.

### Features

* Search by single email address
* Search summary page: how many sources and total information
* All static resources are cached by a service worker
* Custom 'not connected' error for offline end user

### Unimplemented Ideas
* Using VueX for a local state-store would have been more appropriate if multiple data calls were being made, or any of the following ideas were implemented.
* Option to save email addresses for automated background checks. User would receive a notification if new leaks were found.
* Option to check-off each data-source once you have reset your password for that account.

### Timeline (approximate)

* Core UI Functionality: 2 hours
* Core API Functionality: 2 hours
* API Integration & Refactor: 3 hours
* UI Refactor: around 4 hours (trying various options out)
* Production Deploy: 1 hour

### Credits

* Unlock Icon by [Chanut](https://www.flaticon.com/authors/chanut) via [FlatIcon](https://www.flaticon.com/)
* Loading Padlock GIF by [Justin Mezzell](http://justinmezzell.tumblr.com/post/92423696883)
