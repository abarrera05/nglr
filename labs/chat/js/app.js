var app = angular.module('app', ['ngRoute']);

// Setup router.
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl : '/templates/login.html',
        controller: "loginController"
    });
    $routeProvider.when('/chat', {
        templateUrl : '/templates/chatroom.html',
        controller: "chatController"
    });
    // Where to go when we get something else.
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    // Web session API. Breaks older browsers.
    $locationProvider.html5Mode(true);
});



app.factory('userModel', function($http) {
    // Practice only.
    var VALID_PASS = "password";
    var user = {
        profile: {
            name: "",
            password: "",
            // Fake it with a time in the future.
            session: 0
        },
        isValid: function() {
            // Checking validity always wipes the password.
            if (this.isValidSession() || this.isValidLogin()) {
                return true;
            }
            else {
                return false;
            }
        },
        isValidLogin: function() {
            var password = this.profile.password;
            this.profile.password = "";
            if (this.profile.name && password == VALID_PASS) {
                // Set session to one hour from now.
                this.profile.session = Date.now() + (1000*60*60);
                // Here is the only place we save.
                this.save();
                return true;
            }
            return false;
        },
        isValidSession: function() {
            if (Date.now() < this.profile.session) {
                return true;
            }
            else {
                return false;
            }
        },
        save: function() {
            try {
                localStorage.profile = JSON.stringify(user.profile);
            }
            catch(e) {
                console.error("Could not save user profile.");
            }
        }
    };

    // Init to previously logged in user if possible.
    if (localStorage.profile) {
        try {
            user.profile = JSON.parse(localStorage.profile);
        }
        catch(e) {
            console.error("Could not parse existing user profile");
        }
    }

    return user;
});



app.factory('historyModel', function($http, $timeout) {
    console.log("entering historyModel");

    // List of messages in iterable format, and index of messages by id.
    var history = [];
    var historyIndex = {};

    var formatMessage = function(message) {
        message.date = moment(message.date).fromNow();
        return message;
    };

    var refreshHistory = function(messages) {
        var i;
        for (i = 0; i < history.length; i++) {
            history.pop();
        }
        for (i = 0; i < messages.length; i++) {
            history[i] = formatMessage(messages[i]);
        }
    };
    var updateHistory = function(messages) {
        // Assuming reverse chronology.
        var latestId;
        if (history[0]) {
            latestId = history[0].id;
            while (messages.length && messages[0].id > latestId) {
                history.unshift(messages.shift());
            }
        }
    };
    var update = function(messages) {
        var i, recentId;
        if (!history.length && messages.length) {
            refreshHistory(messages);
        }
        else {
            updateHistory(messages);
        }
    };

    // Repeatedly ping the server for messages.
    var requestHistory = function() {
        console.log("requesting history...");
        $http.get('http://bro.jeremyosborne.com/api/messagebro', {
                params: {
                    history: 1
                }
            })
            .success(function(data, status, headers, config) {
                console.log("History retrieved:", data);
                update(data.messages);
            })
            .error(function(data, status, headers, config) {
                console.log("Something bad happened:", data);
            });
    };
    // Begin the requests.
    var repeatRequest = function() {
        requestHistory();
        // Repeat. There is no $interval, only $timeout.
        $timeout(repeatRequest, 5000);
    };
    repeatRequest();

    // Expose the data. Model manages itself, whenever it updates, page
    // updates.
    return {
        history: history,
        requestHistory: requestHistory,
        update: update
    };
});



// TODO: setup chat service that allows sending of messages
// to:
//
//     http://bro.jeremyosborne.com/api/messagebro
//
app.service('chatService', function($http, historyModel) {
    this.send = function(user, message) {

    };
});



app.controller("pageController", function($scope) {
    console.log("entering pageController");
});



// TODO:
// Inject the following dependencies: $scope, $location, userModel
// setup loginController to handle the faux login against
// the usermodel.
// Redirect to the "/chat" path if user is valid.
// Map the userModel `profile` to the `$scope`.
// Map the `attemptLogin` to the `$scope.login`.
app.controller("loginController", function( /* TODO... */ ) {
    console.log("entering loginController");

    var attemptLogin = function() {
        // TODO......
    };

    // Attempt to login when we get here.
    attemptLogin();

    // TODO.......
});


// TODO:
// Inject the following services: $scope, $location, userModel, historyModel, chatService
// Build a `validateSession` function that checks if the user
// is in a valid session and sends the user back to root path
// if not. Returns a boolean.
// Complete `$scope.chat` so that it checks to see if the
// user is still valid via validateSession. If the user
// is valid, allow the message to be submitted via the exposed
// chatService send method.
app.controller("chatController", function ( /* TODO... */) {
    console.log("entering chatController");

    var validateSession = function() {
        /* TODO */
    };

    $scope.profile = userModel.profile;
    $scope.history = historyModel.history;
    $scope.message = "";

    // $handle form submissions
    $scope.chat = function() {
        console.log("Attempting to submit chat...");
        // TODO....
    };
});
