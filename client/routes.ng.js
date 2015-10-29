angular.module("fcc-voting").run( function ($rootScope, $state) {
    $rootScope.$on("stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
       if (error === "AUTH_REQUIRED") {
           $state.go("pollsList");
       } 
    });
});


angular.module("fcc-voting").config(
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
        .state("pollsList", {
            url: "/polls",
            templateUrl: "client/polls/views/polls-list.ng.html",
            controller: "PollsListCtrl"
        })
        .state("newPoll", {
            url: "/newpoll",
            templateUrl: "client/polls/views/new-poll.ng.html",
            controller: "NewPollCtrl",
            resolve: {
                currentUser: function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state("pollDetails", {
            url: "/polls/:pollId",
            templateUrl: "client/polls/views/poll-details.ng.html",
            controller: "PollDetailsCtrl"
        });
        
    $urlRouterProvider.otherwise("/polls");
    
});