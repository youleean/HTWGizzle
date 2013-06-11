'use strict';


// Declare app level module which depends on filters, and services
angular.module('htwgApp', ['Centralway.lungo-angular-bridge' , 'htwgServices']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/dashboard', {templateUrl: "partials/dashboard.html", controller: "DashboardCtrl"});
    $routeProvider.when('/courses', {templateUrl: "partials/courses.html", controller: "CoursesCtrl"});
    $routeProvider.when('/news', {templateUrl: "partials/news.html", controller: "NewsCtrl"});
    $routeProvider.when('/schedule', {templateUrl: "partials/schedule.html", controller: "ScheduleCtrl"});
    $routeProvider.when('/rooms', {templateUrl: "partials/roomList.html", controller: "RoomListCtrl"});
    $routeProvider.when('/room', {templateUrl: "partials/room.html", controller: "RoomCtrl"});
    $routeProvider.when('/mensa', {templateUrl: "partials/mensa.html", controller: "MensaCtrl"});
    $routeProvider.when('/library', {templateUrl: "partials/library.html", controller: "LibraryCtrl"});
    $routeProvider.when('/persons', {templateUrl: "partials/personList.html", controller: "PersonListCtrl"});
    $routeProvider.when('/moodle', {templateUrl: "partials/moodle.html", controller: "MoodleCtrl"});
    $routeProvider.when('/search', {templateUrl: "partials/search.html", controller: "SearchCtrl"});
    $routeProvider.when('/settings', {templateUrl: "partials/setings.html", controller: "SettingsCtrl"});
    $routeProvider.when('/fetchMessage', {templateUrl: "partials/messages.html", controller: "MessageCtrl"});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(false);
  }]).config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);