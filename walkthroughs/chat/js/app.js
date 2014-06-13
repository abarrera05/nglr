var app = angular.module('app', ['ngRoute']);

// Setup router.
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/chat", {
        templateUrl: "templates/chatroom.html",
        controller: "chatController"
    })
    .when("/", {
        templateUrl: "templates/login.html",
        controller: "loginController"
    })
    .otherwise({
        redirectTo: "/"
    });
});



app.factory('userModel', function($http) {
    var VALID_PASS = "password";
    var user = {
        profile: {
            name: "",
            password: "",
            session: 0
        },
        isValid: function() {
            // Update localStorage no matter what.
            this.save();
            if (this.profile.password === VALID_PASS) {
                return true;
            }
            else {
                return false;
            }
        },
        save: function() {
            try {
                localStorage.profile = JSON.stringify(this.profile);
            }
            catch(e) {
                console.log("Problem saving to local storage.");
            }
        }
    };
    
    // Check on load.
    if (localStorage.profile) {
        var profile;
        try {
            profile = JSON.parse(localStorage.profile);
            user.profile.name = profile.name;
            user.profile.password = profile.password;
        }
        catch (e) {}
    }

    return user;
});



app.factory('historyModel', function($http, $timeout) {
    console.log("entering historyModel");
    var history = [];
    var historyIndex = {};
    var update = function(messages) {
        var i;
        while (history.pop()) {
            // pass
        }
        for (i = 0; i < messages.length; i++) {
            history.push(messages[i]);
        }
    };
    var requestHistory = function() {
        console.log("requesting history...");
        $http.get('http://bro.jeremyosborne.com/api/messagebro', {
                params: {
                    history: 1
                }
            })
            .success(function(data) {
                console.log("History retrieved:", data);
                update(data.messages);
            })
            .error(function(data) {
                console.log("Oops, something bad", data);
            });
    };
    var repeatRequest = function() {
        requestHistory();
        $timeout(repeatRequest, 5000);
    };
    repeatRequest();
    
    return {
        requestHistory: requestHistory,
        history: history
    };
});



//
//     http://bro.jeremyosborne.com/api/messagebro
//
app.service('chatService', function($http, historyModel) {
    this.send = function(user, message) {
        $http.get("http://bro.jeremyosborne.com/api/messagebro", {
            params: {
                user: user,
                message: message
            }
        })
        .success(function(data) {
            console.log("Chat successfully sent:", data);
        });
    };
});



app.controller("pageController", function($scope) {

});



app.controller("loginController", function($scope, $location, userModel) {
    
    if (userModel.isValid()) {
        $location.path("/chat");
    }

    
    $scope.hasAttemptedLogin = false;
    
    $scope.profile = userModel.profile;
    
    $scope.login = function() {
        $scope.hasAttemptedLogin = true;
        if (userModel.isValid()) {
            $location.path("/chat");
        }
        else {
            $scope.profile.password = "";
        }
    };
    
    $scope.invalidLoginAttempt = function() {
        if ($scope.hasAttemptedLogin && !userModel.isValid()) {
            return true;
        }
        else {
            return false;
        }
    };
});


app.controller("chatController", function ($scope, historyModel, chatService, userModel, $location) {
    //historyModel.requestHistory();
    
    if (!userModel.isValid()) {
        $location.path("/");
    }
    
    $scope.history = historyModel.history;
    
    $scope.profile = userModel.profile;
    
    $scope.chat = function() {
        console.log("Attempting to submit chat...");
        if ($scope.profile.name && $scope.message) {
            chatService.send($scope.profile.name, $scope.message);
        }
    };
});
