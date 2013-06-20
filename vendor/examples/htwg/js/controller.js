'use strict';

function DashboardCtrl($scope, Course) {
   $scope.courses = Course.query();
}

function CoursesCtrl($scope, Course) {
   $scope.coursesList = Course.query();
}


function ScheduleCtrl($scope, Course) {
  $scope.schedule = Course.testabc();
}

function RoomListCtrl($scope) {
  
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

