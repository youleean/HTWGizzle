'use strict';

function BaseCtrl($scope, $http, $location, User, CoreData) {
   if(CoreData.courses == undefined){
       $http({
           method : 'GET',
           url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/coredata'
       }).success(function(data, status, headers, config) {
            CoreData.courses = data.courses;
            CoreData.rooms = data.rooms;
            //CoreData.age =
           })
   }
   if(User.userID==undefined){
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

function LoginCtrl($scope, $http, $location, User){

		$scope.user = {};
		$scope.error = {};

	    $scope.submitLogin = function() {
	        $http({
	            method : 'POST',
	            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/user',
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

function DashboardCtrl($scope, Course, Weather, News) {
   //$scope.courses = Course.queryAll();
   $scope.weatherInfo = Weather.query();
   $scope.news = News.query();
}

function updateCourseCtrl($scope, CoreData, $location, User) {
    console.log(CoreData.courses);
    console.log(User);
   $scope.courses = CoreData.courses;
   $scope.user = User;

   $scope.selectCourse = function(courseID, courseName) {
   	User.updateCourseID=courseID;
    User.updateCourseName=courseName;
   	$location.path("/updateSemester");
   }

}

function updateSemesterCtrl($scope, Course, $location, User) {

   $scope.selectSemester = function(semester) {
   	User.updateSemester=semester;
   	$location.path("/updateProfile");
   }
}

function updateProfileCtrl($scope, Course, $location, User, $http, Schedule) {
	$scope.user = User;
  //  var test = Course.querySingle({courseID: User.updateCourseID, semester: User.updateSemester});
   // console.log(test);

   $scope.updateProfile = function() {
   	var updateData = {
   		user: User.nick,
   		pw: User.hashPw,
   		courseID: User.updateCourseID,
   		semester: User.updateSemester
   	}

   	//console.log(JSON.stringify(updateData));
   	$http({
	            method : 'POST',
	            url : 'http://uc-projects.in.htwg-konstanz.de/htwgapp/user/update',
	            data : JSON.stringify(updateData)
	        }).success(function(data, status, headers, config) {
                    User.userID = data.user.userID;
                    User.courseID = data.user.courseID;
                    User.roleID = data.user.roleID;
                    User.nick = data.user.nick;
                    User.fullName = data.user.fullName;
                    User.hashPw = data.user.hashPw;
                    User.semester = data.user.semester;
                    //var test = Course.querySingle({courseID: User.updateCourseID, semester: User.updateSemester});

                    Schedule.schedule = Course.querySingle({courseID: User.updateCourseID, semester: User.updateSemester});
		    		//$location.path("/dashboard");
		    	
	  		})

	    }
}

function RoomListCtrl($scope, Room, $location) {
    $scope.roomList = Room.queryAllRooms();
    console.log($scope.roomList);

    $scope.showRoom = function(roomID) {

        $location.path("/room/detail/" + roomID);
    }
}

function RoomDetailCtrl($scope, Room, $routeParams) {
       $scope.schedule = Room.queryOneRoom({roomID: $routeParams.id});
}


function ScheduleCtrl($scope, Course, $routeParams, Schedule) {
   // $scope.schedule = Course.querySingle({courseID: $routeParams.courseID, semester: $routeParams.semester});

    $scope.schedule = Schedule.schedule;
}

function LectureCtrl($scope, Course, $routeParams) {
    var Lecture = {
        dozent: "Herr Affenkacke",
        name: "Superfach 500",
        termine: {
            Montag: {
                begin:"8:00"
            },
            Dienstag: {
                begin:"11:00"
            }
        }
    }

    $scope.lecture = Lecture;
}


function MessageCtrl($scope, $http, FetchMessage, Message, $routeParams, User, $location) {

    //User.nick = "jusudend";
    //User.hashPw = "b444ac06613fc8d63795be9ad0beaf55011936ac";
    var timestamp = "2013-01-01 12:12:12";
/*
    $scope.showMessages = FetchMessage.fetchAllMessages({nick:User.nick, hashedpw: User.hashPw, timestamp: timestamp});
    Message.n = $scope.showMessages;
    localStorage.setItem('hallo', 'key');
    console.log(Message.message);
*/

        var data = {userNick:User.nick,hashedPW:User.hashPw,timestamp:"2013-01-01 12:12:12"};
            $http({
                url: 'http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch',
                method: "POST",
                data: data

            }).success(function(data) {
                    $scope.showMessages= data;
                    console.log(data);
                    if(data.error != undefined){
                        $scope.error = data.error;
                    }

                });
    $scope.newMsg = function() {
        $location.path("/message/new");
    }
      // $scope.showMessages = $scope.fetchMessages();
      // console.log($scope.showMessages);

}

function MessageDetailCtrl($scope, $routeParams, $localStorage) {

}
   /* var nachricht = {
        titel: "bla",
        content: "affenkacke",
        absender: "julian Sudendorf",
        ID: "25"
    }
    Message.messageKey = nachricht;
*/



/*
 function CoursesCtrl($scope, Course) {
 $scope.coursesList = Course.query();
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

*/