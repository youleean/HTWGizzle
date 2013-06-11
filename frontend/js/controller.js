'use strict';

function loginController($scope, $http){
	$scope.user = {};
    $scope.submitLogin = function() {
        $http({
            method : 'POST',
            url : 'http://localhost/slimexperiment/user',
            data : $scope.user
        }).success(function(data, status, headers, config) {
    	$scope.dbResponse = data;
    	console.log(data);
    	localStorage.setItem(data);
  })
    }
}

function DashboardCtrl($scope, Course, Weather) {
   $scope.courses = Course.query();
   $scope.weatherInfo = Weather.query();
}

function CoursesCtrl($scope, Course) {
   $scope.coursesList = Course.query();
}

function NewsCtrl($scope, News) {
    $scope.news = News.query();
}


function ScheduleCtrl($scope, Course) {
  $scope.schedule = Course.testabc();
}

function RoomListCtrl($scope, Room) {
    $scope.roomList = Room.queryAllRooms();
}

function RoomCtrl($scope, Room) {
    $scope.room = Room.queryOneRoom();
}

function MensaCtrl($scope) {
  
}

function LibraryCtrl($scope) {
  
}

function PersonListCtrl($scope) {
  
}

function MoodleCtrl($scope) {
  
}

function SearchCtrl($scope) {
  
}

function SettingsCtrl($scope) {
  
}

function MessageCtrl($scope, $fetchMessage) {
    $scope.messageList = $fetchMessage.fetch();
}

