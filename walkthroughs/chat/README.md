# Lab

Finish off this simple chat client.

Find the `TODO` locations in:

* `app.js`
* `templates/chatroom.html`
* `templates/login.html`

and complete them.

Take poetic license. There are a few ways to solve the problems within the constraints. If it works, you are done.

Potential things to do:

* Login page:
    *If the user types an incorrect password, provide feedback via a template and an ng-show that only shows if the login was invalid.
    *Delete the password if the password was incorrect on an incorrect login attempt (via the the ng-model)

* Chat page.
    *Make the chat history items look prettier.
    *Take a look at the angular date filter and make the date human readable.
    *Remove the user input. Reference the user name via the userModel and use that as the user in the the chat requests.

* Entire
    *Persist the usermodel to localstorage.
    *Onlogin, if the usermodel is still valid in localstorage, redirect from the login page to the chat page automatically.
