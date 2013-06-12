'use strict';


// Declare app level module which depends on filters, and services
var htwgApp = angular.module('htwgApp', ['Centralway.lungo-angular-bridge' , 'htwgServices']);

htwgApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/boot', {templateUrl: "partials/boot.html",controller: "BaseCtrl"});
    $routeProvider.when('/login', {templateUrl: "partials/login.html", controller: "loginCtrl"});
    $routeProvider.when('/dashboard', {templateUrl: "partials/dashboard.html", controller: "DashboardCtrl"});
    $routeProvider.when('/updateCourse', {templateUrl: "partials/updateCourse.html", controller: "updateCourseCtrl"});
    $routeProvider.when('/updateSemester', {templateUrl: "partials/updateSemester.html", controller: "updateSemesterCtrl"});
    $routeProvider.when('/updateProfile', {templateUrl: "partials/updateProfile.html", controller: "updateProfileCtrl"});
   /*$routeProvider.when('/courses', {templateUrl: "partials/courses.html", controller: "CoursesCtrl"});
    $routeProvider.when('/schedule', {templateUrl: "partials/schedule.html", controller: "ScheduleCtrl"});
    $routeProvider.when('/rooms', {templateUrl: "partials/roomList.html", controller: "RoomListCtrl"});
    $routeProvider.when('/mensa', {templateUrl: "partials/mensa.html", controller: "MensaCtrl"});
    $routeProvider.when('/library', {templateUrl: "partials/library.html", controller: "LibraryCtrl"});
    $routeProvider.when('/persons', {templateUrl: "partials/personList.html", controller: "PersonListCtrl"});
    $routeProvider.when('/moodle', {templateUrl: "partials/moodle.html", controller: "MoodleCtrl"});
    $routeProvider.when('/search', {templateUrl: "partials/search.html", controller: "SearchCtrl"});
    $routeProvider.when('/settings', {templateUrl: "partials/setings.html", controller: "SettingsCtrl"});*/
    $routeProvider.otherwise({redirectTo: '/boot'});
    $locationProvider.html5Mode(false);
  }]).config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    delete $httpProvider.defaults.headers.post['Content-type'];
}]);

Lungo.Events.init({
            'tap section li[data-action=chooseSemester]': function() {
             Lungo.Notification.html('<a href="#" data-action="close" class="button anchor large text thin">1. Semester</a><a href="#" data-action="close" class="button anchor large text thin">2. Semester</a><a href="#" data-action="close" class="button anchor large text thin">3. Semester</a><a href="#" data-action="close" class="button anchor large text thin">4. Semester</a><a href="#" data-action="close" class="button anchor large text thin">5. Semester</a><a href="#" data-action="close" class="button anchor large text thin">6. Semester</a><a href="#profileReady" data-router="section" data-action="close" class="button anchor large text thin">7. Semester</a><a href="#" data-action="close" class="button anchor large text thin">8. Semester</a>', false);
        }
    });