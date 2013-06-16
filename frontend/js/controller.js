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
   $scope.courses = Course.queryAll();
   $scope.weatherInfo = Weather.query();
   $scope.news = News.query();
}

function updateCourseCtrl($scope, Course, $location, User) {
   $scope.courses = Course.queryAll();
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


function ScheduleCtrl($scope, Course, $routeParams) {
    $scope.schedule = Course.querySingle({courseID: $routeParams.courseID, semester: $routeParams.semester});
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


function MessageCtrl($scope, $http, FetchMessage, Message, $routeParams, User) {

    User.nick = "jusudend";
    User.hashPw = "b444ac06613fc8d63795be9ad0beaf55011936ac";
    var timestamp = "2013-01-01 12:12:12";
/*
    $scope.showMessages = FetchMessage.fetchAllMessages({nick:User.nick, hashedpw: User.hashPw, timestamp: timestamp});
    Message.n = $scope.showMessages;
    localStorage.setItem('hallo', 'key');
    console.log(Message.message);
*/

        var data = {userNick:"jusudend",hashedPW:"b444ac06613fc8d63795be9ad0beaf55011936ac",timestamp:"2013-01-01 12:12:12"};
            $http({
                url: 'http://uc-projects.in.htwg-konstanz.de/htwgapp/message/fetch',
                method: "POST",
                data: data

            }).success(function(data) {
                    //$scope.showMessages = data;
                    //console.log(data);
                    var typeMapKlausur = {};
                    var typeMapSchein = {};
                    var typeMapTutorium = {};
                    var typeMapLabor = {};
                    var typeMapVorlesung = {};
                    var i = null;
                    for (i = 0; data.message.length > i; i += 1) {
                        if(data.message[i].type === "Schein")
                            typeMapSchein[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Klausur")
                            typeMapKlausur[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Tutorium")
                            typeMapTutorium[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Labor")
                            typeMapLabor[data.message[i].type] = data.message[i];
                        else if(data.message[i].type === "Vorlesung")
                            typeMapVorlesung[data.message[i].type] = data.message[i];

                        localStorage.setItem("message " + i, ["msgID: " + data.message[i].msgID, "publisher: " + data.message[i].fullName,
                            "type: " + data.message[i].type,  "eventDate: " + data.message[i].eventDate,
                            "content: " + data.message[i].content,  "lectureID: " + data.message[i].lectureID, "timestamp: " + data.message[i].timestamp + "}"]);

                    }
                    $scope.showKlausur = typeMapKlausur;
                    $scope.showSchein = typeMapSchein;
                    $scope.showTutorium = typeMapTutorium;
                    $scope.showLabor = typeMapLabor;
                    $scope.showVorlesung = typeMapVorlesung;
                    console.log($scope.showKlausur);
                    if(data.error != undefined){
                        $scope.error = data.error;
                    }

                });

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