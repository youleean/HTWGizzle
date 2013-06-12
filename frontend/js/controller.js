'use strict';

function BaseCtrl($scope, $http, $location) {
   if(localStorage.getItem("user")===null){
		$location.path("/login");
	}else{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user.courseID == "0" && user.role != "2"){
			$location.path("/updateCourse");
		}else{
			$location.path("/dashboard");
		}
	}
}

function loginCtrl($scope, $http, $location, User){

		$scope.user = {};
		$scope.error = {};

	    $scope.submitLogin = function() {
	        $http({
	            method : 'POST',
	            url : 'http://localhost/slimexperiment/user',
	            data : $scope.user
	        }).success(function(data, status, headers, config) {
		    	$scope.dbResponse = data;
		    	//console.log(JSON.stringify(data));
		    	if(data.error != undefined){
		    		$scope.error = data.error;
		    	}
		    	if(data.user != null){
		    		User.userID = data.user.userID;
				    User.courseID = data.user.courseID;
				    User.roleID = data.user.roleID;
				    User.nick = data.user.nick;
				    User.fullName = data.user.fullName;
				    User.hashPw = data.user.hashPw;
				    User.semester = data.user.semester;

		    		$location.path("/updateCourse");
		    	}
	  		})
	    }
}

function DashboardCtrl($scope, Course, Weather) {
   $scope.courses = Course.query();
   $scope.weatherInfo = Weather.query();
}

function updateCourseCtrl($scope, Course, $location, User) {
   $scope.courses = Course.query();
   $scope.user = User;

   $scope.selectCourse = function(courseID) {
   	User.updateCourse=courseID;
   	$location.path("/updateSemester");
   }

}

function updateSemesterCtrl($scope, Course, $location, User) {

   $scope.selectSemester = function(semester) {
   	User.updateSemester=semester;
   	$location.path("/updateProfile");
   }
}

function updateProfileCtrl($scope, Course, $location, User, $http) {
	$scope.user = User;

   $scope.updateProfile = function() {
   	var updateData = {
   		user: User.nick,
   		pw: User.hashPw,
   		courseID: User.updateCourse,
   		semester: User.updateSemester
   	}
   	console.log(JSON.stringify(updateData));
   	$http({
	            method : 'POST',
	            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/user/update',
	            data : JSON.stringify(updateData)
	        }).success(function(data, status, headers, config) {
		    		$location.path("/dashboard");
		    	
	  		})
	    }
}


/*
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

*/