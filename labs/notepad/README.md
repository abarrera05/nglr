# Lab

Step by step lab to build a simple notepad (sort of like a Todo-- list).



## Part 1

* Make a NotepadController.
* Attach the notes to $scope.notes.
* Display each note in the page using ng-repeat in an unordered list.

* NOTE: In a complex app, we'll care for our models and make sure they are not dupes. Here, we're using strings. In your ng-repeat, if seeing errors on dupes bothers you, add the following as a suffix to ng-repeat:

    track by $index

## Part 2

* Inside your NotepadController, try the following code:

    setTimeout(function() {
        $scope.notes.push("Paint the fence.");
    }, 500);

* Why does this not cause a change on the page?
* How could we force a change on the page?



## Part 3

* Inject $timeout in your code and use it instead of setTimeout as applied in Step 2 above.
* Does this work?
* How does angular know how to make $timeout available to your code?



## Part 4

* Add a form with an input text field and a submit button.
* In the input text field, bind with ng-model to noteForm.text.
* Link the form to your code via an ng-submit that calls a newNote function.
* On the $scope inside of the controller, add the newNote callback.
* When the newNote callback is called, add new notes to the list of notes.
* Why don't you need anything special like $timeout or $scope.apply here?
* Why don't you need to initialize noteForm or text on your scope?



## Part 5

* Clean up time.
* Create an angular module and call it app.
* Bind it to your page correctly with ng-app.
* Move the existing controller into your app via an init call to app.controller.



## Part 6

* This is the first example that makes HTTP calls to the server.
* Get rid of the initial setting of $scope.notes.
* Make use of $http and .get() all the notes from the /api endpoint. When you get the data back, attach to $scope.notes.
* Make use of $http and .post() new notes to the server. Update $scope.notes with the response from the server.
* Clear the input in the note form after a successful post.



## Part 7

* When posting, set a posting attribute on $scope.
* Using $timeout, put an artificial delay in the post (1-2 seconds is usually enough).
* Using ng-disabled in the form elements, disable them while the form is posting.
* Using ng-attr-style, hide the ul if there are no notes, and show them if there are.
    * Alternately, use ng-show (which is a bit simpler).



## Part 8

* Add a directive to our application called exampleDecoration (in JS) and example-decoration (in the HTML).
* Inject it into the li element repsonsible for the ng-repeat.
* Bind it only to elements.
* Write the template directly into the JS (for now).
* Handle the building of the DOM in the link function of the directive.
* Add a $scope.decoration in our directive that randomly assigns one of two symbols as a prefix to the directive.
    * Some fun UTF-8 symbols: heart, omega, pile-of-poo
* TODO: Checkout the scope within the directive and outside of it. This is a good place to see how the nested scope is implemented.



## Part 9

* Move the template to templates/exampledecoration.html and make sure it still works.



## Part 10

* Mainly to demonstrate that you can, attach a click listener to the directive.
* When the directive element is clicked, toggle the symbol to the other symbol. Make sure the page updates correctly.
